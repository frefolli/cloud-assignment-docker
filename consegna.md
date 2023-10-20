# Assignment 1

||||
| ---- | ---- | ---- |
| Academic | Year: 2022/23 |
| Course | Processo e Sviluppo del Software (Dipartimento di Informatica U14) |
| Professors | Prof. Mariani e Prof. Tundo |

## Members

- [Qazim Toska 847361](https://github.com/qazimtoska)
- [Francesco Refolli 865955](https://github.com/frefolli)
- [Alessandro Preziosa 866142](https://github.com/AAAlessandroP)

## The Target Application

We decided to re-use a project we developed for Ingegneria del Software course. The project itself is a Full Stack Web App that enable the user to track it's data about recipes and beers for the sake of a home brewery. The App can be used via a Browser (tested for Firefox and Chromium) from both desktop and mobile devices, since the pages are themselves responsive.

The Backend side comprises an API Server written in Java using Spring Boot, and a Database which we can query from Java via JPA Repository framework (still part of Spring project). While the Web UI is written entirely in JS with the React frontend framework.

## The Pipeline

Our application consists basically in a Layered System. The business logic is restricted to `Controllers` layer, which communicates with the `DB` to provide and maintain the state of service, and the `API` Interface, which exposes those services. On the other side, the React `Presentation` layer ensure the user is able to achieve his goals, and a layer of `Managers` provides access to the API of Backend Server.

[ARCH.png]

The pipeline should embrace this architecture and allow for the two major sides of the structure to be tested separately, increasing both atomicity and speed of the pipeline.

[PIPELINE.png]

### The Base System

The image used for this CI/CD Action should contain a JDK 17 (used by brew-day) and maven as well. We chose a Debian Bookwork containing the AmazonCorretto redistribution of JDK 17. Having to rely on Debian instead of, for example, Ubuntu enable us to have update yet stable toolkits.

It's really important to notice how we don't need to impose dependency on NodeJS but only against Maven. This because our setup allow the `frontend/pom.xml` to download a distribution of node by it self.

### The Cache

We define one cache that is used by all jobs. We are allowed to define root-relative paths for targets and so on, because `mvn` cli accepts a parameter `-pl` which takes as input the project name. As you can notice, in the root pom.xml two subprojects are defined:
- 1) frontend
- 2) backend

Running `mvn compile -pl backend` will trigger the compilation of only backend, which is great as it applies to the specified lifecycle (es: test, verify, package ...).

### The Policy

We also enact a quality policy which allows job failures if-and-only-if such job is a verify job. `Verify` is allowed to fail for two reasons:
- it's not really a critical phase for our pipeline, because most of it it's just verifing style and/or common pitfalls.
  - in the original project we already addressed that specific requirement by using SonarQube, but in this project it won't be used (more on that later)
- using GitLab CI/CD semanthics we can let individual jobs upload some deliverables with artifacts mechanics
  - if a job in this phase fails, it uploads the failure report
  - we aspire also to cache some reports to deliver them in the base site (more on that later)

Finally, `Clean`, `Build`, `UTs`, `ITs`, `Package`, `Release` and `Docs` stages MUSTN'T FAIL.

### The phases

The main structure pipeline follows the stages described in the example `my-dummy-pipeline` project, just with a few changes. Every stage is explained in detail in further sections.

| stage | description |
| ---  | --- |
| clean | we clean build directories to ensure that the pipeline compiles the whole application as fresh |
| build | we compile both FE and BE |
| verify | various lints are run against our application |
| unit test | unit tests are run |
| integration test | integration tests are run |
| package | the final jar is forged |
| release | a Docker container is build with that jar |
| docs | documentation is produced or published in GitLab Pages |

Every job FOR NOW has a `when: manual` trigger, this because there's no real need of executing the whole pipeline when testing a single aspect of the pipeline. Only the few jobs that matter get executed by manually running them.

### Clean

We added a CLEAN stage to ensure that cache is ready for the workflow. For example, we set up a check in frontend/pom.xml to ensure that `npm run build` is run only once.

### Build

Frontend and Backend can be built using two concurrent jobs, since they are in fact two distinct maven subprojects.

### Verify

#### Backend
 
As backend linters we run

- 1) SpotBugs     https://spotbugs.github.io/
- 2) CheckStyle   https://checkstyle.sourceforge.io/
- 3) PMD          https://pmd.github.io/

Since JDK 17 is only officially supported starting with FindSec-Plugin 1.12.0, and that this specific version lacks of fixes to generic type parsing introduced with issue #680, we decided to run SpotBugs without it.

We also decided to run CheckStyle on the backend part using the default Sun stylechecks provided by the framework for simplicity.

Finally instead of running Valgrind, which could be useful if running native application, although it was suggested in the Assignment 1 paper, we run additional checks with PMD, another source code analyzer, which "finds common programming flaws like unused variables, empty catch blocks, unnecessary object creation, and so forth".

The original project ran SonarQube against both Frontend and Backend thanks to the SonarCloud   account provided by Ingegneria del Software course. In order to avoid abouse of this priviledge and useless bloats on that account, we decided to skip the usage of this tool.

Every verification job allows mvn to fail as a trigger for upload of checking frameworks reports. We don't feel the need for a distinct cache space for these jobs, so we kept the main one.

#### Frontend

As frontend linters we run:
- 1) ESLint
- 2) Flow

As previous said, we skip the SonarQube analysis that was configured by us in the original trunk. Every verification job allows mvn to fail as a trigger for upload of checking frameworks reports. We don't feel the need for a distinct cache space for these jobs, so we kept the main one.

In this part we call the `process-classes` lifecycle of Maven because is after compilation and before actual tests. This way we can have Maven to install needed dependencies and let it run after that phase the linter configured. Talking about linters, we configured ESLint and Flow as suggested by the Assignment 1 paper.

We set up a weird trigger for these two frameworks: instead of enabling them with a flag, the Maven plugin we use to interact with NPM allow us only to disable some executions. So we established a flag semathics where `-Dskip.{goal}` skips the goal `goal`. For consistency, the rule enforced by Maven profiles that caches the previous NPM build during the stages is called `-Dskip.build`, but it's activation trigger is the presence of the `frontend/build` directory in the master cache. That's why we set up a clean job at the start of the Pipeline.

### Unit Test

#### Frontend

The main concern of Frontend UTs is providing a good quality UI, and proving that the pages and components works provided the API interaction works, React UI $\Leftright$ Managers. Thus inductivly, after having proven that Managers work correctly, when can state a general statement of correctness of the macro system with more accuracy.

### Integration Test

#### Backend

These tests run against endpoints in order to test both Spring API interface and Controller Bl. They tests half of the tech stack: Spring REST $\Leftrightarrow$ SQLite DB.

#### Frontend

Our FE ITs require a copy of our to be running in background. They ensure API request and handling is done correctly. These tests are designed to test the src/utils/\*Manager.js we created to abstract and centralize the API access. As such, they actually end up testing quasi the whole tech stack: JS Managers <-> Spring REST <-> SQLite DB.

The instance of BE is started as a GitLab CI/CD Action service, and uses the `spring-boot:run` goal, thus we don't have to manually package the Spring Boot project, which would break our Pipeline semanthics.

### Package

### Release

### Docs

# Footer

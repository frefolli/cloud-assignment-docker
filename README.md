# Assignment 1

||||
| ---- | ---- | ---- |
| Academic Year | 2022/23 |
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

Our application consists basically in a Layered System. The business logic is restricted to `Controllers` layer, which interacts with the DB (`SQLite`) to provide and maintain the state of service, and the API Interface (`Endpoints`), which exposes those services. On the other side, the React Presentation layer (`React UI`) ensure the user is able to achieve his goals, and a layer of `Managers` provides access to the API of Backend Server.

![Software Architecture](Arch.png)

The pipeline should embrace this architecture and allow for the two major sides of the structure to be tested separately, increasing both modularity and speed of the pipeline.

# The Structure

![Pipeline Structure](Pipeline.png)

## The Base System

The image used for this CI/CD Action should contain a JDK 17 (used by brew-day) and maven as well. We chose a Debian Bookwork containing the AmazonCorretto redistribution of JDK 17. Having to rely on Debian instead of, for example, Ubuntu enable us to have updated yet stable tool kits.

It's really important to notice how we don't need to impose dependency on NodeJS but only against Maven. This because our setup allow the `frontend/pom.xml` to download a distribution of node by itself.

## The Cache

We define one cache that is used by all jobs. We are allowed to define root-relative paths for targets and so on, because `mvn` cli accepts a parameter `-pl` which takes as input the project name. As you can notice, in the root pom.xml two subprojects are defined:

- frontend
- backend

Running `mvn compile -pl backend` will trigger the compilation of only backend, which is great as it applies to the specified lifecycle (es: test, verify, package ...).

## The Policy

We also enact a quality policy which allows job failures if-and-only-if such job is a verify job. `Verify` is allowed to fail for two reasons:
- it's not really a critical phase for our pipeline, because most of it it's just verifying style and/or common pitfalls.
    - in the original project we already addressed that specific requirement by using SonarQube, but in this project it won't be used (more on that later)
- using GitLab CI/CD semantics we can let individual jobs upload some deliverables with artifacts mechanics
    - if a job in this phase fails, it uploads the failure report
    - we aspire also to cache some reports to deliver them in the base site (more on that later)

Finally, `Clean`, `Build`, `UTs`, `ITs`, `Package`, `Release` and `Docs` stages MUSTN'T FAIL.

## Index of Abbreviations and Terminology

|||
| --- | --- |
| FE | Frontend |
| BE | Frontend |
| UTs | Unit Tests |
| ITs | Integration Tests |
| PR | Pull Request |

# The Stages

The main structure of the pipeline follows the stages described in the example `my-dummy-pipeline` project, just with a few changes. Every stage is explained in detail in further sections.

|||
| --- | --- |
| Stage | Description |
| clean | we clean build directories to ensure that |
| | the pipeline compiles the whole application as fresh |
| build | we compile both FE and BE |
| verify | various lints are run against our application |
| unit test | unit tests are run |
| integration test | integration tests are run |
| package | the final jar is forged |
| release | a Docker container is built with that jar |
| docs | documentation is produced or published in GitLab Pages |

During the development phase, every job ran with a `when: manual` trigger, because there was no real need of executing the whole pipeline when testing a single aspect of it. Only the few jobs that matter got executed by manually running them. This is better enforced with dependencies between jobs.

## Clean

We added a CLEAN stage to ensure that cache is ready for the workflow. For example, we set up a check in frontend/pom.xml to ensure that `npm run build` is run only once.

## Build

Frontend and Backend can be built using two concurrent jobs, since they are in fact two distinct maven subprojects.

## Verify

The original project ran SonarQube against both Frontend and Backend thanks to the SonarCloud account provided by Ingegneria del Software course. In order to avoid abuse of this privilege and useless bloats on that account, we decided to skip the usage of this tool.
Every verification job allows mvn to fail as a trigger to upload of checking frameworks reports. We don't feel the need for a distinct cache space for these jobs, so we kept the main one.

### Backend
 
As backend linters we run

|||
| --- | --- |
| SpotBugs | [https://spotbugs.github.io/](https://spotbugs.github.io/) |
| CheckStyle | [https://checkstyle.sourceforge.io/](https://checkstyle.sourceforge.io/) |
| PMD | [https://pmd.github.io/](https://pmd.github.io/) |

Since JDK 17 is only officially supported starting with FindSec-Plugin 1.12.0, and that this specific version lacks of fixes to generic type parsing introduced with issue \#680, we decided to run SpotBugs without it.

We also decided to run CheckStyle on the backend part using the default Sun stylechecks provided by the framework for simplicity.

Finally instead of running Valgrind, which could be useful if running native application, although it was suggested in the Assignment 1 paper, we run additional checks with PMD, another source code analyzer, which "finds common programming flaws like unused variables, empty catch blocks, unnecessary object creation, and so forth".

### Frontend

As frontend linters we run:

|||
| --- | --- |
| ESLint | [https://eslint.org/](https://eslint.org/) |
| Flow | [https://flow.org/](https://flow.org/) |

In this part we call the `process-classes` lifecycle of Maven because is after compilation and before actual tests. This way we can have Maven to install needed dependencies and let it run after that phase the linter configured. Talking about linters, we configured ESLint and Flow as suggested by the Assignment 1 paper.

We set up a weird trigger for these two frameworks: instead of enabling them with a flag, the Maven plugin we use to interact with NPM allow us only to disable some executions. So we established a flag semantics where `-Dskip.{goal}` skips the goal `goal`. For consistency, the rule enforced by Maven profiles that caches the previous NPM build during the stages is called `-Dskip.build`, but it's activation trigger is the presence of the `frontend/build` directory in the master cache. That's why we set up a clean job at the start of the Pipeline.

## Unit Test

### Frontend

The main concern of Frontend UTs is providing a good quality UI experience, and proving that the pages and components works provided that API interaction works; in other words we test the relationship React UI $\Leftrightarrow$ Managers. Thus inductively, after having proven that Managers work correctly, when can state a general statement of correctness of the macro system with more accuracy.

## Integration Test

If these jobs succeed, a coverage report is produced as summary of both UTs and ITs, and it's uploaded as artifact in order to be used within `docs` stage.

### Backend

These tests run against endpoints in order to test both Spring API interface and Controller Bl. They tests half of the tech stack: Spring REST $\Leftrightarrow$ Controllers $\Leftrightarrow$ SQLite DB.

### Frontend

Our FE ITs require a copy of our to be running in background. They ensure API request and handling is done correctly. These tests are designed to test the $src/utils/*Manager.js$ we created to abstract and centralize the API access. As such, they actually end up testing almost the whole tech stack: JS Managers $\Leftrightarrow$ Spring REST $\Leftrightarrow$ SQLite DB.

The instance of BE is started as a standard linux job instead of a proper GitLab CI/CD Action service because otherwise it couldn't expose the needed port. It uses the `spring-boot:run` goal, thus we don't have to manually package the Spring Boot project, which would break our Pipeline semantics.

## Package

This stage produces as artifact the actual .jar file. When this stage fails, no artifact is produced.
To do this `mvn package` command is used. The command takes advantage of the already-compiled files located in the cache and skip all the tests(re-running them would be redundant).

## Release

The idea is to use the Dockerfile to build a container which has javajdk and sqlite on it, alongside the .jar file itself, then push the container to the GitLab registry. The .jar file is the artifact produced by the previous stage, so it's required to run this stage in advance.

## Docs

We set up three different jobs to achieve this stage. First of all we need to build the rest of documentation that wasn't already built: Javadoc for Backend and JSDoc for Frontend. When these two jobs end we collect their artifacts and some more which were produced within `backend-pmd`, `backend-integration-test` and `frontend-integration-test` jobs:

- PMD report
- BE coverage report
- FE coverage report

The $public$ directory of the GitLab Pages is templated by our skel $docs-site$, all resources are moved inside of it and the artifact is uploaded. GitLab automatically load this artifact to GitLab Pages.

# Advancement

The pipeline is complete, all stages are performed correctly and a full execution on master as example is provided.

## Major Issues

### The Frontend is built with Node JS and NPM

Since there isn't a community docker image with both Maven and NPM (especially with JDK17), we use a plugin for Maven which downloads automatically a distribution of Node (typically v19.6). This is actually a bottleneck because once in a while, when the pipeline runs for the first time on a branch or such, Maven fails to download it by either getting an error 525 (SSL Handshake Failed) or directly going in timeout. Eventually it succeeds in downloading it and everything goes well. Locally we don't have problems at all in downloading this way node, we don't have a clue of the reason for which this happen.

### Gitlab-Runner

As said previously, developing the pipeline we set up some triggers to ensure that only the precise jobs where executed (typically in a PR). This wasn't enough, though. In order to have a better usage of our limited cloud computing time we installed on our machines `gitlab-runner`, which is the same piece of software used by GitLab to execute a pipeline, then both "hosting" an executor and temporally excluding Cloud runners from execution. This allowed us to fear-less make changes and experiments about the pipeline. Once in a while we enabled back the cloud runners to ensure that GitLab's runners was able to execute the pipeline without problems. All the pipeline executions were made on GitLab platform, and they're visible under "Pipelines" section. Finally, the example pipeline run on Master branch was ran with Cloud runners as requested by paper.

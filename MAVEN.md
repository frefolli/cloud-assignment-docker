# Maven bindings

This file lists the command lines for executing correctly the stages of the pipeline. The `MVN_OPTS` must be added manually to pipeline calls.

| stage | cmd | desc |
| ----- | ---- | ---- |
| clean | `mvn clean` | clean the target & build cache |
| build | `mvn -pl backend compile` | Build backend Java code |
| build | `mvn -pl frontend compile` | Build frontend React code |
| verify | `mvn -pl backend spotbugs:check` | Run SpotBugs against backend (requires a previous `compile`) |
| verify | `mvn -pl backend checkstyle:check` | Run CheckStyke against backend |
| verify | `mvn -pl backend pmd:check` | Run PMD against backend |
| verify | `mvn -pl frontend process-classes -Dskip.flow` | Run ESLint |
| verify | `mvn -pl frontend process-classes -Dskip.eslint` | Run Flow |
| test | `mvn test -Dskip.UTs` | Runs only Integration Tests |
| test | `mvn test -Dskip.ITs` | Runs only Unit Tests  |
<!-- |  |  |  | -->
<!-- |  |  |  | -->

## Variables

Generally we implemented something like `skip.{some}`, where `some` can be either a phase or an action. For example, while `skip.lint` skips all linters, `skip.eslint` skips only ESLint.

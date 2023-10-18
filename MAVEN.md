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
| test | `mvn ... -Dskip.UTs` | skips Unit Tests |
| test | `mvn ... -Dskip.ITs` | skips Integration Tests |
| test | `mvn ... -Dskip.tests` | skips Tests |
<!-- |  |  |  | -->
<!-- |  |  |  | -->

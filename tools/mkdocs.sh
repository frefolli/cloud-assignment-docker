# Simulate `Docs` stage

function do_clean() {
    echo -e "Execute::Clean"
    mvn clean
    rm -rf ./public
}

function do_backend_pmd() {
    echo -e "Execute::Verify::PMD"
    mvn -pl backend pmd:check
}

function do_backend_uts() {
    echo -e "Execute::UT::BE"
    mvn -pl backend test -Dskip.lint
}

function do_backend_its() {
    echo -e "Execute::IT::BE"
    mvn -pl backend verify -Dskip.lint -Dskip.UTs
}

function do_frontend_uts() {
    echo -e "Execute::UT::FE"
    mvn -pl frontend test -Dskip.lint
}

function do_frontend_its() {
    echo -e "Execute::IT::FE"
    mvn -pl backend spring-boot:run &
    mvn -pl frontend verify -Dskip.lint -Dskip.UTs
    kill $(jobs -p)
}

function do_frontend_jsdoc() {
    echo -e "Execute::Docs::JSDoc"
    mvn -pl frontend site
}

function do_backend_javadoc() {
    echo -e "Execute::Docs::Javadoc"
    mvn -pl backend javadoc:javadoc
}

function do_pages() {
    echo -e "Execute::Docs::Pages"

    echo -e "[LOG] :: Creating ./public"
    cp -r docs-site public

    echo -e "[LOG] :: Integrating ./public/jsdoc"
    mv frontend/docs public/jsdoc
    
    echo -e "[LOG] :: Integrating ./public/javadoc"
    mv backend/target/site/apidocs public/javadoc
    
    echo -e "[LOG] :: Integrating ./public/be-coverage"
    mv backend/target/site/coverage public/be-coverage
    
    echo -e "[LOG] :: Integrating ./public/fe-coverage"
    mv frontend/reports/lcov-report public/fe-coverage
    
    echo -e "[LOG] :: Integrating ./public/pmd"
    mkdir -p public/pmd
    mv backend/target/site/css public/pmd/css
    mv backend/target/site/images public/pmd/images
    mv backend/target/site/pmd.html public/pmd/index.html
}

function do_pipeline() {
    do_clean
    do_backend_pmd
    do_backend_uts
    do_backend_its
    do_frontend_uts
    do_frontend_its
    do_frontend_jsdoc
    do_backend_javadoc
    do_pages
}

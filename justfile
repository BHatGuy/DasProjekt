export FLASK_APP := "server"
export FLASK_ENV := "development"

all: 
    just backend & 
    just watch

build: check-types
    browserify client/index.ts -p [ tsify --noImplicitAny ] -o server/static/bundle.js
    -rm server/static/*tmp*

check-types:
    tsc --noEmit


backend: 
    flask run

watch: 
    watchexec --on-busy-update restart -i server -e ts,html,css,json just build

clean:
    rm -rf server/static/bundle.js



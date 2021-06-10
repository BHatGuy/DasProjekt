all: 
    just backend & 
    just watch

build: check-types
    browserify client/index.ts -p [ tsify --noImplicitAny ] -o build/bundle.js 
    cp client/static/* build/
    -rm build/*tmp*

check-types:
    tsc --noEmit

serve: 
    python -m http.server --directory build/

backend: 
    python server/server.py

watch: 
    just serve &
    watchexec --on-busy-update restart -i build -e ts,html,css,json just build

clean:
    rm -rf build/

# this does not deploy the backend currently
deploy: clean build
    scp  -r build/* root@dasprojekt.ddnss.de:/var/www/html
#TODO deploy backend here

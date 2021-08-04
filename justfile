all: 
    just backend & 
    just watch

@build: check-types
    browserify client/index.ts -p [ tsify --noImplicitAny ] -o build/bundle.js 
    cp -r client/static/* build/
    -rm build/*tmp* 2> /dev/null
    echo "build ready"

@check-types:
    tsc --noEmit

serve: 
    python -m http.server --directory build/ &> /dev/null

backend: 
    python server/server.py

watch: 
    just serve &
    watchexec --on-busy-update restart -i build -e ts,html,css,json just build

clean:
    rm -rf build/

# this does not deploy the backend currently
deploy: clean build
    rsync  -avz build/* root@dasprojekt.ddnss.de:/var/www/html
#TODO deploy backend here

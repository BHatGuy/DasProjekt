all: 
    just backend & 
    just watch

build: check-types
    browserify client/index.ts -p [ tsify --noImplicitAny ] -o build/bundle.js 
    cp client/static/* build/

check-types:
    tsc --noEmit

serve: 
    python -m http.server --directory build/

backend: 
    python server/server.py

watch: 
    just serve &
    watchexec --on-busy-update restart -i build -e ts,html,css just build

clean:
    rm -rf build/
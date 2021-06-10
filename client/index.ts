import { GameObject } from "./GameObject"
import { DiningHall } from "./DiningHall/DiningHall";
import { Game } from "./Game";


let lastFrame: number;
let game: Game;
let canvas: HTMLCanvasElement;
let socket: WebSocket;

// Set listeners for window
window.onload = init;

function init() {
    loadConfig(handleConfigAndStart);
    canvas = document.getElementById('canvas') as HTMLCanvasElement;
    canvas.height = window.innerHeight - 100;
    canvas.width = (window.innerHeight - 100) * (4 / 3);


    socket = new WebSocket("ws://localhost:6789");
}



function mainLoop(timeStamp: number) {
    let delta = timeStamp - lastFrame;
    lastFrame = timeStamp;
    game.gameLoop(delta);
    window.requestAnimationFrame(mainLoop);
}

function handleConfigAndStart(config: string) {
    let json = JSON.parse(config);
    game = new Game(canvas, socket, json);
    // Start the first frame request
    lastFrame = performance.now();
    window.requestAnimationFrame(mainLoop);
}

function loadConfig(callback: (s: string) => void) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'config.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == 200) {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);

}


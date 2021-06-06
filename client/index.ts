import { GameObject } from "./GameObject"
import { DiningHall } from "./DiningHall/DiningHall";
import { Game } from "./Game";

let lastFrame: number;
let game: Game;

// Set listeners for window
window.onload = init;

function init() {
    let canvas = document.getElementById('canvas') as HTMLCanvasElement;
    canvas.height = window.innerHeight - 100;
    canvas.width = (window.innerHeight - 100) * (4/3);


    let socket = new WebSocket("ws://localhost:6789");
    game = new Game(canvas, socket);

    // Start the first frame request
    lastFrame = performance.now();
    window.requestAnimationFrame(mainLoop);
}



function mainLoop(timeStamp: number) {
    let delta = timeStamp - lastFrame;
    lastFrame = timeStamp;
    game.gameLoop(delta);
    window.requestAnimationFrame(mainLoop);
}




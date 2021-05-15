import { GameObject } from "./GameObject"
import { Room1 } from "./Room1";
import { FPS } from "./FPS"

let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;
let socket: WebSocket;
let gameObjects: GameObject[] = [];
let messageQueue: MessageEvent<any>[] = [];
let lastFrame: number;

// Set listeners for window
window.onload = init;
window.onresize = onresize;

function init() {
    canvas = document.getElementById('canvas') as HTMLCanvasElement;
    context = canvas.getContext('2d') as CanvasRenderingContext2D;

    onresize();

    socket = new WebSocket("ws://localhost:6789");
    socket.onmessage = receive;

    gameObjects.push(new Room1());
    gameObjects.push(new FPS());

    // Start the first frame request
    lastFrame = performance.now();
    window.requestAnimationFrame(gameLoop);
}

function receive(msg: MessageEvent<any>) {
    console.log(msg.data);
    messageQueue.push(msg);
}

function gameLoop(timeStamp: number) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    let delta = timeStamp - lastFrame;
    lastFrame = timeStamp;

    // receive:
    while (messageQueue.length > 0) {
        let msg = messageQueue.shift() as MessageEvent<any>;
        for (const go of gameObjects) {
            go.receive(msg)
        }
    }

    // update: 
    for (const go of gameObjects) {
        go.update(delta);
    }

    // draw:

    for (const go of gameObjects) {
        go.draw(context, canvas);
    }

    // Keep requesting new frames
    window.requestAnimationFrame(gameLoop);
}

function onresize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}



import { Point } from "./point.js"

let canvas: any;
let context: any;
let point = new Point(25, 20);
let vel = new Point(1, 1);
let color = "#ff8080"
let socket: any;
window.onload = init;

function init() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    socket = new WebSocket("ws://localhost:6789");
    socket.onmessage = onmessage;

    // Start the first frame request
    window.requestAnimationFrame(gameLoop);
}

function onmessage(event: any) {
    color = event.data;
}

function gameLoop(timeStamp: number) {
    update();
    draw();

    // Keep requesting new frames
    window.requestAnimationFrame(gameLoop);
}

function update() {
    point.x += vel.x;
    point.y += vel.y;
    if (point.x > canvas.width - 10 || point.x < 0) {
        vel.x = -vel.x;
        socket.send("donk");
    }
    if (point.y > canvas.height - 10 || point.y < 0) {
        vel.y = -vel.y;
        socket.send("donk");
    }
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = color;
    context.fillRect(point.x, point.y, 10, 10);
}

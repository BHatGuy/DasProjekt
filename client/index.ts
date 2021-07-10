import { Game } from "./Game";
import * as PIXI from 'pixi.js'

let lastFrame: number;
let game: Game;
let canvas: HTMLCanvasElement;
let backgroundCvs: HTMLCanvasElement;
let socket: WebSocket;

// Set listeners for window
window.onload = init;

function init() {
    socket = new WebSocket("ws://localhost:6789");

    let height = window.innerHeight - 100;
    let width = (window.innerHeight - 100) * (4 / 3);
    let app = new PIXI.Application({height: height, width: width, antialias: true});
    let config: any;
    document.body.appendChild(app.view);
    app.view.id = "main";
    app.loader.add('config', 'config.json').load((loader, resources) => {
        config = resources.config.data;
        game = new Game(app, socket, config);
    });
}



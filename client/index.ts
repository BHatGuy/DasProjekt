import { Game } from "./Game";
import * as PIXI from 'pixi.js'



// Set listeners for window
window.onload = init;

function init() {
    let socket = new WebSocket("ws://localhost:6789");

    let height = window.innerHeight - 100;
    let width = (window.innerHeight - 100) * (4 / 3);
    let app = new PIXI.Application({height: height, width: width, antialias: true});
    let background = new PIXI.Application({resizeTo: window});
    let config: any;
    document.body.appendChild(app.view);
    document.body.appendChild(background.view);
    background.view.id = "background";
    app.view.id = "main";
    app.loader.add('config', 'config.json').load((loader, resources) => {
        config = resources.config.data;
        let game = new Game(app, socket, config, background);
    });
}



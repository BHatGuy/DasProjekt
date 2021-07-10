import { Game } from "../Game";
import { Room, RoomAlias } from "../Room";
import * as PIXI from 'pixi.js';

export class LowerHallway extends Room {

    doorCockpit: PIXI.Graphics;
    door1: PIXI.Graphics;
    door2: PIXI.Graphics;
    doorUpperHallway: PIXI.Graphics;

    constructor(game: Game) {
        super(game, game.config.lowerHallway.img);

        this.door1 = new PIXI.Graphics();
        this.door1.hitArea = new PIXI.Polygon(game.config.lowerHallway.door1);
        this.door1.interactive = true;
        this.door1.buttonMode = true;
        this.stage.addChild(this.door1);

        this.doorCockpit = new PIXI.Graphics();
        this.doorCockpit.hitArea = new PIXI.Polygon(game.config.lowerHallway.doorCockpit);
        this.doorCockpit.interactive = true;
        this.doorCockpit.buttonMode = true;
        this.stage.addChild(this.doorCockpit);

        this.door2 = new PIXI.Graphics();
        this.door2.hitArea = new PIXI.Polygon(game.config.lowerHallway.door2);
        this.door2.interactive = true;
        this.door2.buttonMode = true;
        this.stage.addChild(this.door2);

        this.doorUpperHallway = new PIXI.Graphics();
        this.doorUpperHallway.hitArea = new PIXI.Polygon(game.config.lowerHallway.doorUpperHallway);
        this.doorUpperHallway.interactive = true;
        this.doorUpperHallway.buttonMode = true;
        this.stage.addChild(this.doorUpperHallway);

        this.door1.on("click", this.onclick);
        this.door2.on("click", this.onclick);
        this.doorCockpit.on("click", this.onclick);
        this.doorUpperHallway.on("click", this.onclick);

        this.loadResources();
    }



    onclick = (data: PIXI.InteractionData) => {
        if (data.target === this.doorCockpit) {
            this.game.nextRoom(RoomAlias.Cockpit);
        }
        if (data.target === this.doorUpperHallway) {
            this.game.nextRoom(RoomAlias.UpperHallway);
        }
        if (data.target === this.door1) {
        }
        if (data.target === this.door2) {
        }
    };



}
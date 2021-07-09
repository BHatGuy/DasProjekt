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

        this.doorCockpit = new PIXI.Graphics();
        this.doorCockpit.hitArea = new PIXI.Polygon(game.config.lowerHallway.doorCockpit);
        this.doorCockpit.interactive = true;

        this.door2 = new PIXI.Graphics();
        this.door2.hitArea = new PIXI.Polygon(game.config.lowerHallway.door2);
        this.door2.interactive = true;

        this.doorUpperHallway = new PIXI.Graphics();
        this.doorUpperHallway.hitArea = new PIXI.Polygon(game.config.lowerHallway.doorUpperHallway);
        this.doorUpperHallway.interactive = true;

        this.loadResources();
    }

    saveResources(resources: any) {
        console.log("hello form child");
        super.saveResources(resources);
    }

    activate() {
        super.activate();
        this.door1.on("click", this.onclick);
        this.door2.on("click", this.onclick);
        this.doorCockpit.on("click", this.onclick);
        this.doorUpperHallway.on("click", this.onclick);
    }

    deactivate() {
        super.deactivate();
        this.door1.off("click", this.onclick);
        this.door2.off("click", this.onclick);
        this.doorCockpit.off("click", this.onclick);
        this.doorUpperHallway.off("click", this.onclick);
    }

    onclick = (data: PIXI.InteractionData) => {
        console.log(data);
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
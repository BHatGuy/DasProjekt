import { Game } from "../Game";
import { Room, RoomAlias } from "../Room";
import * as PIXI from 'pixi.js';

export class LowerHallway extends Room {

    trapdoorBounding: PIXI.Graphics;
    trapdoorOpen = new PIXI.Sprite();
    trapdoorClosed = new PIXI.Sprite();
    door1: PIXI.Graphics;
    door2: PIXI.Graphics;
    doorUpperHallway: PIXI.Graphics;
    lock: PIXI.Graphics;

    constructor(game: Game) {
        super(game, game.config.lowerHallway.img);

        game.app.loader.add("trapdoorOpen", game.config.lowerHallway.trapdoor.open)
        game.app.loader.add("trapdoorClosed", game.config.lowerHallway.trapdoor.closed)

        this.door1 = new PIXI.Graphics();
        this.door1.hitArea = new PIXI.Polygon(game.config.lowerHallway.door1);
        this.door1.interactive = true;
        this.door1.buttonMode = true;
        this.stage.addChild(this.door1);

        this.trapdoorBounding = new PIXI.Graphics();
        this.trapdoorBounding.hitArea = new PIXI.Polygon(game.config.lowerHallway.trapdoor.poly);
        this.trapdoorBounding.interactive = false;
        this.trapdoorBounding.buttonMode = true;
        this.stage.addChild(this.trapdoorBounding);

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

        this.lock = new PIXI.Graphics();
        this.lock.hitArea = new PIXI.Polygon(game.config.lowerHallway.trapdoor.lock);
        this.lock.interactive = true;
        this.lock.buttonMode = true;
        this.stage.addChild(this.lock);

        this.lock.on("click", this.onclick)
        this.door1.on("click", this.onclick);
        this.door2.on("click", this.onclick);
        this.trapdoorBounding.on("click", this.onclick);
        this.doorUpperHallway.on("click", this.onclick);
    }

    saveResources(resources: any) {
        super.saveResources(resources);
        this.trapdoorOpen = new PIXI.Sprite(resources.trapdoorOpen.texture);
        this.trapdoorClosed = new PIXI.Sprite(resources.trapdoorClosed.texture);
        this.stage.addChild(this.trapdoorClosed);

    }


    onclick = (data: PIXI.InteractionData) => {
        if (data.target === this.trapdoorBounding) {
            this.game.nextRoom(RoomAlias.Cockpit);
        }
        if (data.target === this.doorUpperHallway) {
            this.game.nextRoom(RoomAlias.UpperHallway);
        }
        if (data.target === this.door1) {
            this.game.nextRoom(RoomAlias.MachineRoom);
        }
        if (data.target === this.door2) {
        }
        if (data.target === this.lock) {
            // TODO Ask for code here
            this.game.socket.send(JSON.stringify({ action: "trapdoor" }))

        }
    };

    setDoor(closed: boolean) {
        this.lock.interactive = closed;
        this.trapdoorBounding.interactive = !closed;
        if (!closed) {
            this.stage.removeChild(this.trapdoorClosed);
            this.stage.addChild(this.trapdoorOpen);
        } else {
            this.stage.addChild(this.trapdoorClosed);
            this.stage.removeChild(this.trapdoorOpen);
        }
    }


}
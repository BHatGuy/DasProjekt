import { Game } from "../Game";
import { Room, RoomAlias } from "../Room";
import * as PIXI from 'pixi.js';



export class UpperHallway extends Room {

    doorKitchen: PIXI.Graphics;
    doorDiningHall: PIXI.Graphics;
    door2: PIXI.Graphics;
    doorLowerHallway: PIXI.Graphics;



    constructor(game: Game) {
        super(game, game.config.upperHallway.img);

        this.doorDiningHall = new PIXI.Graphics();
        this.doorDiningHall.hitArea = new PIXI.Polygon(game.config.upperHallway.doorDiningHall);
        this.doorDiningHall.interactive = true;
        this.doorDiningHall.buttonMode = true;

        this.doorKitchen = new PIXI.Graphics();
        this.doorKitchen.hitArea = new PIXI.Polygon(game.config.upperHallway.doorMachineRoom);
        this.doorKitchen.interactive = true;
        this.doorKitchen.buttonMode = true;

        this.door2 = new PIXI.Graphics();
        this.door2.hitArea = new PIXI.Polygon(game.config.upperHallway.door2);
        this.door2.interactive = true;
        this.door2.buttonMode = true;

        this.doorLowerHallway = new PIXI.Graphics();
        this.doorLowerHallway.hitArea = new PIXI.Polygon(game.config.upperHallway.doorLowerHallway);
        this.doorLowerHallway.interactive = true;
        this.doorLowerHallway.buttonMode = true;

        this.stage.addChild(this.doorDiningHall, this.doorKitchen, this.door2, this.doorLowerHallway);

        this.loadResources();
    }

    activate() {
        super.activate();
        this.doorDiningHall.on("click", this.onclickCallback);
        this.doorKitchen.on("click", this.onclickCallback);
        this.door2.on("click", this.onclickCallback);
        this.doorLowerHallway.on("click", this.onclickCallback);
    }

    deactivate() {
        super.deactivate();
        this.doorDiningHall.off("click", this.onclickCallback);
        this.doorKitchen.off("click", this.onclickCallback);
        this.door2.off("click", this.onclickCallback);
        this.doorLowerHallway.off("click", this.onclickCallback);
    }

    onclickCallback = (data: PIXI.InteractionData) => {
        if (data.target === this.doorKitchen) {
            this.game.nextRoom(RoomAlias.Kitchen);
        }
        if (data.target === this.doorDiningHall) {
            this.game.nextRoom(RoomAlias.DiningHall);
        }
        if (data.target === this.door2) {
        }
        if (data.target === this.doorLowerHallway) {
            this.game.nextRoom(RoomAlias.LowerHallway);
        }
    };


}
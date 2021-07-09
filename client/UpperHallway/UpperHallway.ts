import { Game } from "../Game";
import { Room, RoomAlias } from "../Room";
import * as PIXI from 'pixi.js';



export class UpperHallway extends Room {

    doorMachineRoom: PIXI.Graphics;
    doorDiningHall: PIXI.Graphics;
    door2: PIXI.Graphics;
    doorLowerHallway: PIXI.Graphics;



    constructor(game: Game) {
        super(game, game.config.upperHallway.img);

        this.doorDiningHall = new PIXI.Graphics();
        this.doorDiningHall.hitArea = new PIXI.Polygon(game.config.upperHallway.doorDiningHall);
        this.doorDiningHall.interactive = true;

        this.doorMachineRoom = new PIXI.Graphics();
        this.doorMachineRoom.hitArea = new PIXI.Polygon(game.config.upperHallway.doorMachineRoom);
        this.doorMachineRoom.interactive = true;

        this.door2 = new PIXI.Graphics();
        this.door2.hitArea = new PIXI.Polygon(game.config.upperHallway.door2);
        this.door2.interactive = true;

        this.doorLowerHallway = new PIXI.Graphics();
        this.doorLowerHallway.hitArea = new PIXI.Polygon(game.config.upperHallway.doorLowerHallway);
        this.doorLowerHallway.interactive = true;

        this.stage.addChild(this.doorDiningHall, this.doorMachineRoom, this.door2, this.doorLowerHallway);

        this.loadResources();
    }

    saveResources(resources: any) {
        console.log("hello form child");
        super.saveResources(resources);

    }

    activate() {
        super.activate();
        this.doorDiningHall.on("click", this.onclickCallback);
        this.doorMachineRoom.on("click", this.onclickCallback);
        this.door2.on("click", this.onclickCallback);
        this.doorLowerHallway.on("click", this.onclickCallback);
    }

    deactivate() {
        super.deactivate();
        this.doorDiningHall.off("click", this.onclickCallback);
        this.doorMachineRoom.off("click", this.onclickCallback);
        this.door2.off("click", this.onclickCallback);
        this.doorLowerHallway.off("click", this.onclickCallback);
    }

    onclickCallback = (data: PIXI.InteractionData) => {
        console.log(data);
        if (data.target === this.doorMachineRoom) {
            this.game.nextRoom(RoomAlias.MachineRoom);
        }
        if (data.target === this.doorDiningHall) {
            // this.game.nextRoom(RoomAlias.DiningHall);
        }
        if (data.target === this.door2) {
        }
        if (data.target === this.doorLowerHallway) {
            this.game.nextRoom(RoomAlias.LowerHallway);
        }
    };

    // onmove(ev: MouseEvent) {
    //     super.onmove(ev);
    //     let point = this.scale(ev.offsetX, ev.offsetY);
    //     // TODO Refactor those kind of things
    //     if (this.doorMachineRoom.contains(point)
    //         || this.doorDiningHall.contains(point)
    //         || this.door2.contains(point)
    //         || this.doorLowerHallway.contains(point)) {
    //         this.canvas.style.cursor = "pointer";
    //     } else {
    //         this.canvas.style.cursor = "initial";
    //     }
    // }


}
import { Game } from "../Game";
import { Room, RoomAlias } from "../Room";
import Flatten from "@flatten-js/core";



export class UpperHallway extends Room {

    doorMachineRoom: Flatten.Polygon;
    doorDiningHall: Flatten.Polygon;
    door2: Flatten.Polygon;
    doorLowerHallway: Flatten.Polygon;


    constructor(game: Game, canvas: HTMLCanvasElement, config: any) {
        super(game, canvas, config.upperHallway.img);
        this.doorDiningHall = new Flatten.Polygon(config.upperHallway.doorDiningHall);
        this.doorMachineRoom = new Flatten.Polygon(config.upperHallway.doorMachineRoom);
        this.door2 = new Flatten.Polygon(config.upperHallway.door2);
        this.doorLowerHallway = new Flatten.Polygon(config.upperHallway.doorLowerHallway);
    }

    onclick(ev: MouseEvent) {
        let point = this.scale(ev.offsetX, ev.offsetY);

        if (this.doorMachineRoom.contains(point)) {
            this.game.nextRoom(RoomAlias.MachineRoom);
        }
        if (this.doorDiningHall.contains(point)) {
            this.game.nextRoom(RoomAlias.DiningHall);
        }
        if (this.door2.contains(point)) {
        }
        if (this.doorLowerHallway.contains(point)) {
            this.game.nextRoom(RoomAlias.LowerHallway);
        }
        
    }

    onmove(ev: MouseEvent) {
        super.onmove(ev);
        let point = this.scale(ev.offsetX, ev.offsetY);
        // TODO Refactor those kind of things
        if (this.doorMachineRoom.contains(point) 
            || this.doorDiningHall.contains(point) 
            || this.door2.contains(point)
            || this.doorLowerHallway.contains(point)) {
            this.canvas.style.cursor = "pointer";
        } else {
            this.canvas.style.cursor = "initial";
        }
    }


}
import { Game } from "../Game";
import { Room, RoomAlias } from "../Room";
import Flatten from "@flatten-js/core";

export class LowerHallway extends Room {

    doorCockpit: Flatten.Polygon;
    door1: Flatten.Polygon;
    door2: Flatten.Polygon;
    doorUpperHallway: Flatten.Polygon;


    constructor(game: Game, canvas: HTMLCanvasElement, config: any) {
        super(game, canvas, config.lowerHallway.img);
        this.door1 = new Flatten.Polygon(config.lowerHallway.door1);
        this.doorCockpit = new Flatten.Polygon(config.lowerHallway.doorCockpit);
        this.door2 = new Flatten.Polygon(config.lowerHallway.door2);
        this.doorUpperHallway = new Flatten.Polygon(config.lowerHallway.doorUpperHallway);
    }

    onclick(ev: MouseEvent) {
        let point = this.scale(ev.offsetX, ev.offsetY);

        if (this.doorCockpit.contains(point)) {
            this.game.nextRoom(RoomAlias.Cockpit);
        }
        if (this.door1.contains(point)) {
        }
        if (this.door2.contains(point)) {
        }
        if (this.doorUpperHallway.contains(point)) {
            this.game.nextRoom(RoomAlias.UpperHallway);
        }
        
    }

    onmove(ev: MouseEvent) {
        super.onmove(ev);
        let point = this.scale(ev.offsetX, ev.offsetY);
        // TODO Refactor those kind of things
        if (this.doorCockpit.contains(point) 
            || this.door1.contains(point) 
            || this.door2.contains(point)
            || this.doorUpperHallway.contains(point)) {
            this.canvas.style.cursor = "pointer";
        } else {
            this.canvas.style.cursor = "initial";
        }
    }


}
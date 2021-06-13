import { Game } from "../Game";
import { Room, RoomAlias } from "../Room";
import Flatten from "@flatten-js/core";


export class MachineRoom extends Room {
    

    constructor(game: Game, canvas: HTMLCanvasElement, config: any) {
        super(game, canvas, config.machineRoom.img);

    }

    draw(canvas: HTMLCanvasElement): void {
        super.draw(canvas);

    }


    onmove(ev: MouseEvent) {
        super.onmove(ev);
        let point = this.scale(ev.offsetX, ev.offsetY);

        // if (this.ladderBounding.contains(point)) {
        //     this.canvas.style.cursor = "pointer";
        // } else {
        //     this.canvas.style.cursor = "initial";
        // }
    }


    onclick(ev: MouseEvent) {
        let point = this.scale(ev.offsetX, ev.offsetY);

        // if (this.ladderBounding.contains(point)) {
        //     this.game.nextRoom(RoomAlias.DiningHall);
        // }
    }
}
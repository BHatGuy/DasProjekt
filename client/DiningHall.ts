import { Game } from "./Game";
import { GameObject } from "./GameObject";
import { Room, RoomAlias } from "./Room";


export class DiningHall extends Room {

    constructor(game: Game, canvas: HTMLCanvasElement) {
        super(game, canvas, "diningHall.png");
    }

    onclick(ev: MouseEvent) {
        let realx = ev.offsetX / this.xfactor;
        let realy = ev.offsetY / this.yfactor;

        if (realx > 1740 && realx < 2070 && realy > 160 && realy < 820) {
            this.game.nextRoom(RoomAlias.Cockpit);
        }
    }
}
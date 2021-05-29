import { Game } from "./Game";
import { GameObject } from "./GameObject";
import { Room, RoomAlias } from "./Room";


export class DiningHall extends Room {

    constructor(game: Game, canvas: HTMLCanvasElement) {
        super(game, canvas, "diningHall.png");
    }

    onclick(ev: MouseEvent) {
        console.log(ev.x + " " + ev.y);
        if (ev.x > 580 && ev.x < 700 && ev.y > 50 && ev.y < 275) {
            this.game.nextRoom(RoomAlias.Cockpit);
        }
    }
}
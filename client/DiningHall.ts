import { Game } from "./Game";
import { GameObject } from "./GameObject";
import { Room, RoomAlias } from "./Room";


export class DiningHall extends Room {


    constructor(game: Game, canvas: HTMLCanvasElement) {
        super(game, canvas, "diningHall.png");
    }

    activate() {
        super.activate();
        this.overlay.innerHTML = "<img src=\"Cockpit_nurLampe.png\"></img>";
        this.overlay.onclick = (e: MouseEvent) => { this.overlay.style.display = "none"; };
    }

    deactivate() {
        this.overlay.innerHTML = "";
        this.overlay.onclick = null;
    }

    onclick(ev: MouseEvent) {
        let realx = ev.offsetX / this.xfactor;
        let realy = ev.offsetY / this.yfactor;

        if (realx > 1740 && realx < 2070 && realy > 160 && realy < 820) {
            this.game.nextRoom(RoomAlias.Cockpit);
        }
        if (realx > 2150 && realx < 2330 && realy > 155 && realy < 420) {
            console.log("save!");
            this.overlay.style.display = "block";
        }
    }
}
import { Game } from "../Game";
import { GameObject } from "../GameObject";
import { Room, RoomAlias } from "../Room";
import {Safe} from "./Safe";


export class DiningHall extends Room {
    
    popup: HTMLCanvasElement | null = null;
    safe: Safe;
    

    constructor(game: Game, canvas: HTMLCanvasElement) {
        super(game, canvas, "diningHall.png");
        this.safe = new Safe(this);
    }

    activate() {
        super.activate();

        this.popup = document.createElement("canvas");
        this.popup.height = window.innerHeight * 0.8;
        this.popup.width = (window.innerHeight * 0.8) * (4 / 3);

        //this.popup.src = "Safe.png";
        this.popup.style.display = "block";
        //this.popup.style.height = "80%";
        this.popup.style.margin = "4vh auto";
        this.popup.style.border = "3px solid black";
        this.overlay.appendChild(this.popup);

        this.overlay.addEventListener("click", (e) => { this.hidePopup() });

        window.addEventListener("keypress", (e) => { this.onkeypress(e) });
    }

    deactivate() {
        super.deactivate();
        this.overlay.innerHTML = "";
        this.overlay.removeEventListener("click", (e) => { this.hidePopup() });
        window.removeEventListener("keypress", (e) => { this.onkeypress(e) });
    }

    update(delta: number){
        super.update(delta);
        this.safe.update(delta);
    }

    draw(canvas: HTMLCanvasElement) {
        super.draw(canvas);
        if (this.popup) {
            this.safe.draw(this.popup);
        }
    }

    onclick(ev: MouseEvent) {
        let realx = ev.offsetX / this.xfactor;
        let realy = ev.offsetY / this.yfactor;

        if (realx > 1740 && realx < 2070 && realy > 160 && realy < 820) {
            this.game.nextRoom(RoomAlias.Cockpit);
        }
        if (realx > 2150 && realx < 2330 && realy > 155 && realy < 420) {
            this.overlay.style.display = "block";
        }
    }

    onkeypress(ev: KeyboardEvent) {
        this.safe.onkeypress(ev);
    }

    hidePopup() {
        this.overlay.style.display = "none";
    }

    
}
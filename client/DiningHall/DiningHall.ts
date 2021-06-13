import { Game } from "../Game";
import { GameObject } from "../GameObject";
import { Room, RoomAlias } from "../Room";
import { Safe } from "./Safe";
import Flatten from "@flatten-js/core";



export class DiningHall extends Room {

    popup: HTMLCanvasElement | null = null;
    safe: Safe;
    doorBounding: Flatten.Polygon;
    safeBounding: Flatten.Polygon;

    constructor(game: Game, canvas: HTMLCanvasElement, config: any) {
        super(game, canvas, config.diningHall.img);
        this.safe = new Safe(this);
        this.doorBounding = new Flatten.Polygon(config.diningHall.door);
        this.safeBounding = new Flatten.Polygon(config.diningHall.safe);
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
        // TODO fix Tresor Bug
    }

    update(delta: number) {
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
        let point = this.scale(ev.offsetX, ev.offsetY);

        if (this.doorBounding.contains(point)) {
            this.game.nextRoom(RoomAlias.Cockpit);
        }
        if (this.safeBounding.contains(point)) {
            this.overlay.style.display = "block";
        }
    }

    onkeypress(ev: KeyboardEvent) {
        this.safe.onkeypress(ev);
    }

    onmove(ev: MouseEvent){
        super.onmove(ev);
        let point = this.scale(ev.offsetX, ev.offsetY);
        if (this.doorBounding.contains(point) || this.safeBounding.contains(point)) {
            this.canvas.style.cursor = "pointer";
        } else {
            this.canvas.style.cursor = "initial";
        }
    }

    hidePopup() {
        this.overlay.style.display = "none";
    }


}
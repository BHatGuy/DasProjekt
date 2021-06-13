import { Game } from "./Game";
import Flatten from "@flatten-js/core";

export enum RoomAlias {
    DiningHall,
    Cockpit,
    MachineRoom,
}

export class Room {
    protected imgBckgrnd: CanvasImageSource;
    protected game: Game;
    protected canvas: HTMLCanvasElement;
    overlay: HTMLDivElement;


    protected xfactor: number;
    protected yfactor: number;

    constructor(game: Game, canvas: HTMLCanvasElement, background: string) {
        let img = document.createElement("img");
        img.setAttribute("src", background);
        this.imgBckgrnd = img as CanvasImageSource;

        this.game = game;
        this.canvas = canvas;
        this.overlay = document.getElementById("overlay") as HTMLDivElement;

        this.xfactor = canvas.width / (this.imgBckgrnd.width as number);
        this.yfactor = canvas.height / (this.imgBckgrnd.height as number);
    }

    activate() { }

    deactivate() {
        this.canvas.style.cursor = "initial";

    }

    draw(canvas: HTMLCanvasElement): void {
        let ctx = canvas.getContext("2d");
        ctx?.drawImage(this.imgBckgrnd, 0, 0, this.imgBckgrnd.width as number * this.xfactor, this.imgBckgrnd.height as number * this.yfactor);
    }

    update(delta: number): void {

    }

    receive(msg: MessageEvent<any>): void {

    }

    onclick(ev: MouseEvent) {

    }

    onmove(ev: MouseEvent) {

    }

    scale(x: number, y: number): Flatten.Point {
        let realx = x / this.xfactor;
        let realy = y / this.yfactor;
        return new Flatten.Point(realx, realy);
    }
}
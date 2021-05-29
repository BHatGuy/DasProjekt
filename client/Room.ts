import { Game } from "./Game";
import { GameObject } from "./GameObject";

export enum RoomAlias {
    DiningHall,
    Cockpit,
}

export class Room implements GameObject {
    protected imgBckgrnd: CanvasImageSource;
    protected game: Game;

    protected xfactor: number;
    protected yfactor: number;

    constructor(game: Game, canvas: HTMLCanvasElement, background: string) {
        let img = document.createElement("img");
        img.setAttribute("src", background);
        this.imgBckgrnd = img as CanvasImageSource;

        this.game = game;

        this.xfactor = canvas.width / (this.imgBckgrnd.width as number);
        this.yfactor = canvas.height / (this.imgBckgrnd.height as number);

    }
    draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
        ctx.drawImage(this.imgBckgrnd, 0, 0, this.imgBckgrnd.width as number * this.xfactor, this.imgBckgrnd.height as number * this.yfactor);
    }

    update(delta: number): void {

    }

    receive(msg: MessageEvent<any>): void {

    }

    onclick(ev: MouseEvent) {

    }
}
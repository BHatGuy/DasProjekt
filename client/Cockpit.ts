import { Game, Room } from "./Game";
import { GameObject } from "./GameObject";

export class Cockpit implements GameObject {
    imgBckgrnd: CanvasImageSource;
    imgLamp: CanvasImageSource;
    game: Game;
    lampCycle = 0;
    lamp = false;

    constructor(canvas: HTMLCanvasElement, game: Game) {
        var img = document.createElement("img");
        img.setAttribute("src", "Cockpit.png");
        this.imgBckgrnd = img as CanvasImageSource;

        var img2 = document.createElement("img");
        img2.setAttribute("src", "Cockpit_nurLampe.png");
        this.imgLamp = img2 as CanvasImageSource;

        this.game = game;

    }
    draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
        ctx.drawImage(this.imgBckgrnd, 0, 0, canvas.width, canvas.height);
        if (this.lamp) {
            ctx.drawImage(this.imgLamp, 0, 0, canvas.width, canvas.height);
        }
    }

    update(delta: number): void {
        this.lampCycle += delta;
        if (this.lampCycle > 1000) {
            this.lamp = !this.lamp;
            this.lampCycle = 0;
        }
    }

    receive(msg: MessageEvent<any>): void {

    }

    onclick(ev: MouseEvent) {
        console.log(ev.x + " " + ev.y);
        if (ev.x < 80) {
            this.game.nextRoom(Room.DiningHall);
        }
    }
}
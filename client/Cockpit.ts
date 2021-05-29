import { Game } from "./Game";
import { Room, RoomAlias } from "./Room";


export class Cockpit extends Room {
    imgLamp: CanvasImageSource;
    lampCycle = 0;
    lamp = false;

    constructor(game: Game, canvas: HTMLCanvasElement) {
        super(game, canvas, "Cockpit.png");
        let img2 = document.createElement("img");
        img2.setAttribute("src", "Cockpit_nurLampe.png");
        this.imgLamp = img2 as CanvasImageSource;
    }

    draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
        super.draw(ctx, canvas);
        if (this.lamp) {
            ctx.drawImage(this.imgLamp, 190 * this.xfactor, 0, this.imgLamp.width as number * this.xfactor, this.imgLamp.height as number * this.yfactor);
        }
    }

    update(delta: number): void {
        this.lampCycle += delta;
        if (this.lampCycle > 750) {
            this.lamp = !this.lamp;
            this.lampCycle = 0;
        }
    }


    onclick(ev: MouseEvent) {
        let realx = ev.offsetX / this.xfactor;
        let realy = ev.offsetY / this.yfactor;

        if (realx < 260) {
            this.game.nextRoom(RoomAlias.DiningHall);
        }
    }
}
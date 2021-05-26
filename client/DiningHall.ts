import { Game, Room } from "./Game";
import { GameObject } from "./GameObject";

export class DiningHall implements GameObject {
    image: CanvasImageSource;
    game: Game;

    constructor(canvas: HTMLCanvasElement, game: Game) {
        var img = document.createElement("img");
        img.setAttribute("src", "diningHall.png");
        this.image = img as CanvasImageSource;
        this.game = game;
    }
    draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
        ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height);
    }
    update(delta: number): void {

    }
    receive(msg: MessageEvent<any>): void {

    }

    onclick(ev: MouseEvent) {
        console.log(ev.x + " " + ev.y);
        if (ev.x > 580 && ev.x < 700 && ev.y > 50 && ev.y < 275) {
            this.game.nextRoom(Room.Cockpit);
        }
    }
}
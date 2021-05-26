import { Game, Room } from "./Game";
import { GameObject } from "./GameObject";

export class Cockpit implements GameObject {
    image: CanvasImageSource;
    game: Game;

    constructor(canvas: HTMLCanvasElement, game: Game) {
        var img = document.createElement("img");
        img.setAttribute("src", "cockpit.jpg");
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
        if (ev.x < 80) {
            this.game.nextRoom(Room.DiningHall);
        }
    }
}
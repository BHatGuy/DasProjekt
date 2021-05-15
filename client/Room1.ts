import { GameObject } from "./GameObject";

export class Room1 implements GameObject {
    image: CanvasImageSource;
    constructor() {
        this.image = document.getElementById('room_img') as CanvasImageSource;
    }
    draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
        ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height);
    }
    update(delta: number): void {
        
    }
    receive(msg: MessageEvent<any>): void {
        
    }

}
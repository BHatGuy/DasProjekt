import { GameObject } from "./GameObject";

export class FPS implements GameObject {
    private fps = 0;
    private frames: number[] = [];

    draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
        ctx.font = '20px serif';
        ctx.fillText(`${Math.round(this.fps)} fps`, 5, 20);
    }

    update(delta: number): void {
        this.frames.push(delta);
        if (this.frames.length > 200) {
            this.frames.shift();
        }
        this.fps = 1000 / (this.frames.reduce((acc, x) => acc + x, 0) / this.frames.length);
    }

    receive(msg: MessageEvent<any>): void {

    }

}
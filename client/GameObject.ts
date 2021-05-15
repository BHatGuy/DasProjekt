export interface GameObject {
    draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void;
    update(delta: number): void;
    receive(msg: MessageEvent<any>): void;
}
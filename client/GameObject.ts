export interface GameObject {
    draw(ctx: CanvasRenderingContext2D): void;
    update(delta: number): void;
    receive(msg: MessageEvent<any>): void;
}
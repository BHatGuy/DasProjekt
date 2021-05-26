export interface GameObject {
    draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void;
    update(delta: number): void;
    onclick(ev: MouseEvent): void;
}
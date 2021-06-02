export interface GameObject {
    draw(canvas: HTMLCanvasElement): void;
    update(delta: number): void;
    onclick(ev: MouseEvent): void;
}
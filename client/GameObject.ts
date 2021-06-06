export interface GameObject {
    draw(canvas: HTMLCanvasElement): void; // TODO Maybe we dont need the canvas here
    update(delta: number): void;
    onclick(ev: MouseEvent): void;
}
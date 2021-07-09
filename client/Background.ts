import { Game } from "./Game";

export class Background {
    protected imgSea: CanvasImageSource;
    protected imgClouds: CanvasImageSource;
    protected game: Game;
    protected canvas: HTMLCanvasElement;
    overlay: HTMLDivElement;

    protected xfactor: number;
    protected yfactor: number;
    private offset = 0;
    private speed = 0.03;

    constructor(game: Game, canvas: HTMLCanvasElement, config: any) {
        let img = document.createElement("img");
        img.setAttribute("src", config.background.sea);
        this.imgSea = img as CanvasImageSource;

        img = document.createElement("img");
        img.setAttribute("src", config.background.clouds);
        this.imgClouds = img as CanvasImageSource;

        this.game = game;
        this.canvas = canvas;
        this.overlay = document.getElementById("overlay") as HTMLDivElement;

        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;

        this.yfactor = canvas.height / (this.imgSea.height as number);
        this.xfactor = this.yfactor;

    }

    draw(): void {
        let ctx = this.canvas.getContext("2d");
        ctx?.drawImage(this.imgSea, 0, 0, this.imgSea.width as number * this.xfactor, this.imgSea.height as number * this.yfactor);
        ctx?.drawImage(this.imgClouds, this.offset, 0, this.imgClouds.width as number * this.xfactor, this.imgClouds.height as number * this.yfactor);
        ctx?.drawImage(this.imgClouds, this.offset - (this.imgClouds.width as number * this.xfactor), 0, this.imgClouds.width as number * this.xfactor, this.imgClouds.height as number * this.yfactor);


    }

    update(delta: number): void {
        this.offset += this.speed * delta;
        if (this.offset >= (this.imgClouds.width as number * this.xfactor)) {
            this.offset = 0;
        }
    }

}
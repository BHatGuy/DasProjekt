import { Game } from "../Game";
import { Room, RoomAlias } from "../Room";
import Flatten from "@flatten-js/core";


export class Cockpit extends Room {
    imgLamp: CanvasImageSource;
    lampCycle = 0;
    lamp = false;
    ladderBounding: Flatten.Polygon;
    lampBounding: Flatten.Box;
    pipeBoundig: Flatten.Polygon;

    constructor(game: Game, canvas: HTMLCanvasElement, config: any) {
        super(game, canvas, config.cockpit.img);
        let img2 = document.createElement("img");
        img2.setAttribute("src", config.cockpit.lamp.img);
        this.imgLamp = img2 as CanvasImageSource;
        this.ladderBounding = new Flatten.Polygon(config.cockpit.ladder.poly);
        this.lampBounding = new Flatten.Box(...config.cockpit.lamp.box);
        this.pipeBoundig = new Flatten.Polygon(config.cockpit.pipe);
    }

    deactivate() {
        super.activate();
        this.canvas.style.cursor = "initial";
    }

    draw(canvas: HTMLCanvasElement): void {
        super.draw(canvas);
        let ctx = canvas.getContext("2d");
        if (this.lamp) {
            //this.ladderBounding.
            let width = (this.lampBounding.xmax - this.lampBounding.xmin) * this.xfactor;
            let height = (this.lampBounding.ymax - this.lampBounding.ymin) * this.yfactor;
            ctx?.drawImage(this.imgLamp, this.lampBounding.xmin * this.xfactor, this.lampBounding.ymin, width, height);
        }
    }

    update(delta: number): void {
        this.lampCycle += delta;
        if (this.lampCycle > 750) {
            this.lamp = !this.lamp;
            this.lampCycle = 0;
        }
    }

    onmove(ev: MouseEvent) {
        super.onmove(ev);
        let point = this.scale(ev.offsetX, ev.offsetY);

        if (this.ladderBounding.contains(point) || this.pipeBoundig.contains(point)) {
            this.canvas.style.cursor = "pointer";
        } else {
            this.canvas.style.cursor = "initial";
        }
    }


    onclick(ev: MouseEvent) {
        let point = this.scale(ev.offsetX, ev.offsetY);

        if (this.ladderBounding.contains(point)) {
            this.game.nextRoom(RoomAlias.DiningHall);
        }
        if (this.pipeBoundig.contains(point)) {
            this.game.nextRoom(RoomAlias.MachineRoom);
        }
    }
}
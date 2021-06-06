import { GameObject } from "../GameObject";
import { DiningHall } from "./DiningHall";

export class Safe implements GameObject {
    imgSafe: CanvasImageSource;
    imgDisk1: CanvasImageSource;
    imgDisk2: CanvasImageSource;
    imgDisk3: CanvasImageSource;
    imgThingy: CanvasImageSource;
    angles = [this.digitToAngle(0), this.digitToAngle(0), this.digitToAngle(0)];
    goals = [this.digitToAngle(0), this.digitToAngle(0), this.digitToAngle(0)];
    combi = [0, 0, 0];
    index = 0;
    rate = 0.001;

    parent: DiningHall;

    constructor(parent: DiningHall) {
        this.parent = parent;
        let safe = document.createElement("img");
        safe.src = "Safe.png";
        this.imgSafe = safe;

        let d1 = document.createElement("img");
        d1.src = "Scheibe1.png";
        this.imgDisk1 = d1;

        let d2 = document.createElement("img");
        d2.src = "Scheibe2.png";
        this.imgDisk2 = d2;

        let d3 = document.createElement("img");
        d3.src = "Scheibe3.png";
        this.imgDisk3 = d3;

        let t = document.createElement("img");
        t.src = "Anzeige.png";
        this.imgThingy = t;
    }

    draw(canvas: HTMLCanvasElement): void {
        let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        let pxfactor = canvas.width / (this.imgSafe.width as number);
        let pyfactor = canvas.height / (this.imgSafe.height as number);
        ctx.drawImage(this.imgSafe, 0, 0, canvas.width, canvas.height);
        // TODO: Refactor this
        ctx.translate(pxfactor * 978, pyfactor * 946);
        ctx.rotate(this.angles[0]);
        ctx.translate(-pxfactor * 978, -pyfactor * 946);
        ctx.drawImage(this.imgDisk1, 0, 0, canvas.width, canvas.height);
        ctx.resetTransform();

        ctx.translate(pxfactor * 978, pyfactor * 946);
        ctx.rotate(this.angles[1]);
        ctx.translate(-pxfactor * 978, -pyfactor * 946);
        ctx.drawImage(this.imgDisk2, 0, 0, canvas.width, canvas.height);
        ctx.resetTransform();

        ctx.translate(pxfactor * 978, pyfactor * 946);
        ctx.rotate(this.angles[2]);
        ctx.translate(-pxfactor * 978, -pyfactor * 946);
        ctx.drawImage(this.imgDisk3, 0, 0, canvas.width, canvas.height);
        ctx.resetTransform();

        ctx.drawImage(this.imgThingy, 0, 0, canvas.width, canvas.height);
    }

    update(delta: number): void {       

        for (let i = 0; i < this.goals.length; i++) {

            if (this.angles[i] === this.goals[i]) {
                continue;
            } else if (this.angles[i] < this.goals[i]) {
                this.angles[i] += this.rate * delta;

            } else if (this.angles[i] > this.goals[i]) {
                this.angles[i] -= this.rate * delta;

            }
            if (Math.abs(this.angles[i] - this.goals[i]) < this.rate * delta * 0.5) {
                this.angles[i] = this.goals[i];
            }
        }
    }

    onclick(ev: MouseEvent): void { }

    onkeypress(ev: KeyboardEvent) {
        let num = Number(ev.key);
        if (!isNaN(num)) {
            this.combi[this.index++] = num;
            if (this.index >= this.combi.length) this.index = 0;
            for (let i = 0; i < this.goals.length; i++) {
                this.goals[i] = this.digitToAngle(this.combi[i]);
            }
        }
    }

    private digitToAngle(digit: number): number {
        return (360 - digit * 36) * Math.PI / 180;
    }
}
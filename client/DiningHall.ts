import { Game } from "./Game";
import { GameObject } from "./GameObject";
import { Room, RoomAlias } from "./Room";


export class DiningHall extends Room {
    imgSafe: CanvasImageSource;
    imgDisk1: CanvasImageSource;
    imgDisk2: CanvasImageSource;
    imgDisk3: CanvasImageSource;
    imgThingy: CanvasImageSource;
    popup: HTMLCanvasElement | null = null;


    constructor(game: Game, canvas: HTMLCanvasElement) {
        super(game, canvas, "diningHall.png");
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

    activate() {
        super.activate();

        this.popup = document.createElement("canvas");
        this.popup.height = window.innerHeight * 0.8;
        this.popup.width = (window.innerHeight * 0.8) * (4 / 3)

        //this.popup.src = "Safe.png";
        this.popup.style.display = "block";
        //this.popup.style.height = "80%";
        this.popup.style.margin = "4vh auto";
        this.popup.style.border = "3px solid black";
        this.overlay.appendChild(this.popup);

        this.overlay.onclick = (e) => { this.overlay.style.display = "none"; };
    }

    draw(canvas: HTMLCanvasElement) {
        super.draw(canvas);
        if (this.popup) {
            let ctx = this.popup.getContext("2d") as CanvasRenderingContext2D;
            ctx.drawImage(this.imgSafe, 0, 0, this.popup.width, this.popup.height);
            ctx.drawImage(this.imgDisk1, 0, 0, this.popup.width, this.popup.height);
            ctx.drawImage(this.imgDisk2, 0, 0, this.popup.width, this.popup.height);
            ctx.drawImage(this.imgDisk3, 0, 0, this.popup.width, this.popup.height);
            ctx.drawImage(this.imgThingy, 0, 0, this.popup.width, this.popup.height);
        }
    }

    deactivate() {
        this.overlay.innerHTML = "";
        this.overlay.onclick = null;
    }

    onclick(ev: MouseEvent) {
        let realx = ev.offsetX / this.xfactor;
        let realy = ev.offsetY / this.yfactor;

        if (realx > 1740 && realx < 2070 && realy > 160 && realy < 820) {
            this.game.nextRoom(RoomAlias.Cockpit);
        }
        if (realx > 2150 && realx < 2330 && realy > 155 && realy < 420) {
            this.overlay.style.display = "block";
        }
    }
}
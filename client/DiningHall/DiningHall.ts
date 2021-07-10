import { Game } from "../Game";
import { Room, RoomAlias } from "../Room";
import { Safe } from "./Safe";
import * as PIXI from 'pixi.js';



export class DiningHall extends Room {

    popup: HTMLCanvasElement | null = null;
    safe: Safe;
    doorBounding = new PIXI.Graphics();
    safeBounding = new PIXI.Graphics();
    glassBounding = new PIXI.Graphics();
    grafImg = new PIXI.Sprite();
    // keypressListener = (e: KeyboardEvent) => { this.onkeypress(e) };
    // mouseClickListener = (e: MouseEvent) => { this.hidePopup() };

    constructor(game: Game) {
        super(game, game.config.diningHall.img);
        this.safe = new Safe(this);

        this.doorBounding.hitArea = new PIXI.Polygon(game.config.diningHall.door);
        this.doorBounding.interactive = true;
        this.doorBounding.buttonMode = true;
        this.doorBounding.on("click", this.onclick);

        this.safeBounding.hitArea = new PIXI.Polygon(game.config.diningHall.safe);
        this.safeBounding.interactive = true;
        this.safeBounding.buttonMode = true;
        this.safeBounding.on("click", this.onclick);

        this.glassBounding.hitArea = new PIXI.Polygon(game.config.diningHall.glass);
        this.glassBounding.interactive = true;
        this.glassBounding.buttonMode = true;
        this.glassBounding.on("click", this.onclick);
        
        this.stage.addChild(this.doorBounding, this.safeBounding, this.glassBounding);

        this.loader.add("graf", game.config.diningHall.graf.img);
        this.loadResources();
    }

    saveResources(resources: any) {
        super.saveResources(resources);
        this.grafImg = new PIXI.Sprite(resources.graf.texture);
        this.grafImg.visible = false;
        this.stage.addChild(this.grafImg);
    }

    // activate() {
    //     super.activate();

    //     this.popup = document.createElement("canvas");
    //     this.popup.height = window.innerHeight * 0.8;
    //     this.popup.width = (window.innerHeight * 0.8) * (4 / 3);

    //     //this.popup.src = "Safe.png";
    //     this.popup.style.display = "block";
    //     //this.popup.style.height = "80%";
    //     this.popup.style.margin = "4vh auto";
    //     this.popup.style.border = "3px solid black";
    //     this.overlay.appendChild(this.popup);

    //     this.overlay.addEventListener("click", this.mouseClickListener);

    //     window.addEventListener("keypress", this.keypressListener);

    // }

    // deactivate() {
    //     super.deactivate();
    //     this.overlay.removeEventListener("click", this.mouseClickListener);
    //     window.removeEventListener("keypress", this.keypressListener);
    // }

    // update(delta: number) {
    //     super.update(delta);
    //     this.safe.update(delta);
    // }


    onclick = (data: PIXI.InteractionData) => {
        if (data.target == this.doorBounding) {
            this.game.nextRoom(RoomAlias.UpperHallway);
        }
        if (data.target == this.safeBounding) {
            //this.overlay.style.display = "block";
        }
        if (data.target == this.glassBounding) {
            this.grafImg.visible = !this.grafImg.visible;
        }
    }

    // onkeypress(ev: KeyboardEvent) {
    //     this.safe.onkeypress(ev);
    // }

    // hidePopup() {
    //     this.overlay.style.display = "none";
    // }


}
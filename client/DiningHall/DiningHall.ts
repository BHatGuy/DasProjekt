import { Game } from "../Game";
import { Room, RoomAlias } from "../Room";
import { Safe } from "./Safe";
import * as PIXI from 'pixi.js';



export class DiningHall extends Room {

    popup: HTMLCanvasElement | null = null;
    safe: Safe;
    doorBounding = new PIXI.Container();
    safeBounding = new PIXI.Container();
    glassBounding = new PIXI.Container();
    grafImg = new PIXI.Sprite();

    constructor(game: Game) {
        super(game, game.config.diningHall.img);

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

        game.app.loader.add("graf", game.config.diningHall.graf.img);


        this.safe = new Safe(this, game);
    }

    saveResources(resources: any) {
        super.saveResources(resources);
        this.grafImg = new PIXI.Sprite(resources.graf.texture);
        this.stage.addChild(this.grafImg);
    }

    onclick = (data: PIXI.InteractionData) => {
        if (data.target == this.doorBounding) {
            this.game.nextRoom(RoomAlias.UpperHallway);
        }
        if (data.target == this.safeBounding) {
            this.safe.show();
        }
        if (data.target == this.glassBounding) {
            this.game.socket.send(JSON.stringify({ action: "glass" }))
        }
    }


    getBaron(): boolean {
        return this.grafImg.visible;
    }

    setBaron(b: boolean) {
        this.grafImg.visible = b;
    }



    // hidePopup() {
    //     this.overlay.style.display = "none";
    // }


}
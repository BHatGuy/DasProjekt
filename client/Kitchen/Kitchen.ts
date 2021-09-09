import { Game } from "../Game";
import { Room, RoomAlias } from "../Room";
import * as PIXI from 'pixi.js';

export class Kitchen extends Room {

    door: PIXI.Container;
    plantsStage = new PIXI.Container();
    plants = new PIXI.Sprite();
    plantsSmall = new PIXI.Container();
    arrow = new PIXI.Sprite();
    reset: PIXI.Container;


    constructor(game: Game) {
        super(game, game.config.kitchen.img);

        this.door = new PIXI.Container();
        this.door.hitArea = new PIXI.Polygon(game.config.kitchen.door);
        this.door.interactive = true;
        this.door.buttonMode = true;
        this.door.on("click", this.onclick);

        this.plantsSmall.hitArea = new PIXI.Polygon(this.game.config.kitchen.plants.poly);
        this.plantsSmall.interactive = true;
        this.plantsSmall.buttonMode = true;
        this.plantsSmall.on("click", this.onclick);

        this.reset = new PIXI.Container();
        this.reset.hitArea = new PIXI.Polygon(this.game.config.kitchen.jar);
        this.reset.interactive = true;
        this.reset.on("click", this.onclick);

        game.app.loader.add("plants", game.config.kitchen.plants.img);

        this.stage.addChild(this.door, this.reset);

    }

    saveResources(resources: any) {
        super.saveResources(resources);

        this.plants = new PIXI.Sprite(resources.plants.texture);

        this.arrow = new PIXI.Sprite(resources.arrow.texture);
        this.arrow.hitArea = new PIXI.Polygon(this.game.config.ui.arrow.polygon);
        this.arrow.interactive = true;
        this.arrow.buttonMode = true;
        this.arrow.on("click", this.onclick);

        this.stage.addChild(this.plantsSmall)
        this.plantsStage.addChild(this.plants, this.arrow);
    }



    onclick = (data: PIXI.InteractionData) => {
        if (data.target === this.door) {
            this.game.nextRoom(RoomAlias.UpperHallway);
        } else if (data.target === this.plantsSmall) {
            this.stage.interactiveChildren = false;
            this.game.app.stage.addChild(this.plantsStage);
        } else if (data.target === this.arrow) {
            this.stage.interactiveChildren = true;
            this.game.app.stage.removeChild(this.plantsStage);
        } else if (data.target == this.reset) {
            this.game.socket.send(JSON.stringify({ action: "reset" }))
        }
    };
}
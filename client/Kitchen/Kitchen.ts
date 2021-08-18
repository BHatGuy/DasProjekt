import { Game } from "../Game";
import { Room, RoomAlias } from "../Room";
import * as PIXI from 'pixi.js';

export class Kitchen extends Room {

    door: PIXI.Graphics;
    plantsStage = new PIXI.Container();
    plants = new PIXI.Sprite();
    plantsSmall = new PIXI.Graphics();
    arrow = new PIXI.Sprite();


    constructor(game: Game) {
        super(game, game.config.kitchen.img);

        this.door = new PIXI.Graphics();
        this.door.hitArea = new PIXI.Polygon(game.config.kitchen.door);
        this.door.interactive = true;
        this.door.buttonMode = true;
        this.door.on("click", this.onclick);
        this.stage.addChild(this.door);
        this.plantsSmall.hitArea = new PIXI.Polygon(this.game.config.kitchen.plants.poly);
        this.plantsSmall.interactive = true;
        this.plantsSmall.buttonMode = true;
        this.plantsSmall.on("click", this.onclick);
        this.loader.add("plants", game.config.kitchen.plants.img)
            .add("arrow", game.config.ui.arrow.img);


        this.loadResources();
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
        } else if (data.target == this.arrow) {
            this.stage.interactiveChildren = true;
            this.game.app.stage.removeChild(this.plantsStage);
        }
    };
}
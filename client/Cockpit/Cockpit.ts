import { Game } from "../Game";
import { Room, RoomAlias } from "../Room";
import * as PIXI from 'pixi.js';


export class Cockpit extends Room {
    imgLamp = new PIXI.Sprite();
    lampCycle = 0;
    lamp = false;
    ladderBounding: PIXI.Graphics;

    constructor(game: Game) {
        super(game, game.config.cockpit.img);

        this.loader.add("lamp", game.config.cockpit.lamp.img);

        this.ladderBounding = new PIXI.Graphics();
        this.ladderBounding.hitArea = new PIXI.Polygon(game.config.cockpit.ladder.poly);
        this.ladderBounding.interactive = true;

        this.loadResources();
    }

    saveResources(resources: any) {
        super.saveResources(resources);
        this.imgLamp = new PIXI.Sprite(resources.lamp.texture);
        this.imgLamp.x = this.game.config.cockpit.lamp.x;
        this.imgLamp.y = this.game.config.cockpit.lamp.y;
        this.stage.addChild(this.imgLamp);
        super.saveResources(resources);
    }


    activate() {
        super.activate();
        this.game.app.ticker.add(this.update);
        this.ladderBounding.on("click", this.onclick);
    }

    deactivate() {
        super.deactivate();
        this.game.app.ticker.remove(this.update);
        this.ladderBounding.off("click", this.onclick);
    }

    update = (delta: number) => {
        this.lampCycle += delta;
        if (this.lampCycle > 750) {
            this.lamp = !this.lamp;
            this.lampCycle = 0;
        }
    }

    onclick = (ev: PIXI.InteractionData) => {
        this.game.nextRoom(RoomAlias.LowerHallway);
    }
}
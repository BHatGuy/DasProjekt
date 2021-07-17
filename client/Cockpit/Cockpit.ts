import { Game } from "../Game";
import { Room, RoomAlias } from "../Room";
import * as PIXI from 'pixi.js';


export class Cockpit extends Room {
    imgLamp = new PIXI.Sprite();
    lampCycle = 0;
    ladderBounding: PIXI.Graphics;
    drawer1Bounding: PIXI.Graphics;
    drawer2Bounding: PIXI.Graphics;
    drawer3Bounding: PIXI.Graphics;

    imgDrawer1 = new PIXI.Sprite();
    imgDrawer2 = new PIXI.Sprite();
    imgDrawer3 = new PIXI.Sprite();


    constructor(game: Game) {
        super(game, game.config.cockpit.img);

        this.loader.add("lamp", game.config.cockpit.lamp.img)
            .add("drawer1", game.config.cockpit.drawer1.img)
            .add("drawer2", game.config.cockpit.drawer2.img)
            .add("drawer3", game.config.cockpit.drawer3.img);

        this.ladderBounding = new PIXI.Graphics();
        this.ladderBounding.hitArea = new PIXI.Polygon(game.config.cockpit.ladder.poly);
        this.ladderBounding.interactive = true;
        this.ladderBounding.buttonMode = true;
        this.ladderBounding.on("click", this.onclick);

        this.drawer1Bounding = new PIXI.Graphics();
        this.drawer1Bounding.hitArea = new PIXI.Polygon(game.config.cockpit.drawer1.poly);
        this.drawer1Bounding.interactive = true;
        this.drawer1Bounding.buttonMode = true;
        this.drawer1Bounding.on("click", this.onclick);

        this.drawer2Bounding = new PIXI.Graphics();
        this.drawer2Bounding.hitArea = new PIXI.Polygon(game.config.cockpit.drawer2.poly);
        this.drawer2Bounding.interactive = true;
        this.drawer2Bounding.buttonMode = true;
        this.drawer2Bounding.on("click", this.onclick);

        this.drawer3Bounding = new PIXI.Graphics();
        this.drawer3Bounding.hitArea = new PIXI.Polygon(game.config.cockpit.drawer3.poly);
        this.drawer3Bounding.interactive = true;
        this.drawer3Bounding.buttonMode = true;
        this.drawer3Bounding.on("click", this.onclick);

        this.stage.addChild(this.ladderBounding, this.drawer1Bounding, this.drawer2Bounding, this.drawer3Bounding);

        this.loadResources();
    }

    saveResources(resources: any) {
        super.saveResources(resources);
        this.imgLamp = new PIXI.Sprite(resources.lamp.texture);
        this.imgLamp.x = this.game.config.cockpit.lamp.x;
        this.imgLamp.y = this.game.config.cockpit.lamp.y;

        this.imgDrawer1 = new PIXI.Sprite(resources.drawer1.texture);
        this.imgDrawer2 = new PIXI.Sprite(resources.drawer2.texture);
        this.imgDrawer3 = new PIXI.Sprite(resources.drawer3.texture);

        this.imgDrawer1.visible = false;
        this.imgDrawer2.visible = false;
        this.imgDrawer3.visible = false;

        this.imgDrawer1.hitArea = new PIXI.Polygon(this.game.config.cockpit.drawer1.open);
        this.imgDrawer2.hitArea = new PIXI.Polygon(this.game.config.cockpit.drawer2.open);
        this.imgDrawer3.hitArea = new PIXI.Polygon(this.game.config.cockpit.drawer3.open);

        this.imgDrawer1.interactive = true;
        this.imgDrawer2.interactive = true;
        this.imgDrawer3.interactive = true;

        this.imgDrawer1.buttonMode = true;
        this.imgDrawer2.buttonMode = true;
        this.imgDrawer3.buttonMode = true;

        this.imgDrawer1.on("click", this.onclick);
        this.imgDrawer2.on("click", this.onclick);
        this.imgDrawer3.on("click", this.onclick);

        this.stage.addChild(this.imgLamp, this.imgDrawer3, this.imgDrawer2, this.imgDrawer1);
    }


    activate() {
        super.activate();
        this.game.app.ticker.add(this.update);
    }

    deactivate() {
        super.deactivate();
        this.game.app.ticker.remove(this.update);
    }

    update = (delta: number) => {
        this.lampCycle += delta;
        if (this.lampCycle > 75) {
            this.lampCycle = 0;
            this.imgLamp.visible = !this.imgLamp.visible;
        }
    }

    onclick = (ev: PIXI.InteractionData) => {
        if (ev.target == this.ladderBounding) {
            this.game.nextRoom(RoomAlias.LowerHallway);
        } else if (ev.target == this.drawer1Bounding) {
            this.imgDrawer1.visible = true;
            this.drawer1Bounding.visible = false;
        } else if (ev.target == this.drawer2Bounding) {
            this.imgDrawer2.visible = true;
            this.drawer2Bounding.visible = false;
        } else if (ev.target == this.drawer3Bounding) {
            this.imgDrawer3.visible = true;
            this.drawer3Bounding.visible = false;
        } else if (ev.target == this.imgDrawer1) {
            this.imgDrawer1.visible = false;
            this.drawer1Bounding.visible = true;
        } else if (ev.target == this.imgDrawer2) {
            this.imgDrawer2.visible = false;
            this.drawer2Bounding.visible = true;
        } else if (ev.target == this.imgDrawer3) {
            this.imgDrawer3.visible = false;
            this.drawer3Bounding.visible = true;
        }
    }
}
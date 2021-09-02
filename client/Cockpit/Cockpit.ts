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

    drawer1Open: PIXI.Graphics;
    drawer1 = new PIXI.Sprite();
    drawer2 = new PIXI.Sprite();
    drawer3 = new PIXI.Sprite();

    smallBook: PIXI.Graphics;
    book = new PIXI.Sprite();
    arrow = new PIXI.Sprite();
    page1: PIXI.Text;
    page2: PIXI.Text;

    bookStage = new PIXI.Container();

    constructor(game: Game) {
        super(game, game.config.cockpit.img);

        game.app.loader.add("lamp", game.config.cockpit.lamp.img)
            .add("drawer1", game.config.cockpit.drawer1.img)
            .add("drawer2", game.config.cockpit.drawer2.img)
            .add("drawer3", game.config.cockpit.drawer3.img)
            .add("book", game.config.cockpit.book.img);

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

        this.drawer1Open = new PIXI.Graphics();
        this.drawer1Open.hitArea = new PIXI.Polygon(this.game.config.cockpit.drawer1.open);
        this.drawer1Open.interactive = true;
        this.drawer1Open.buttonMode = true;
        this.drawer1Open.on("click", this.onclick);

        this.smallBook = new PIXI.Graphics();
        this.smallBook.hitArea = new PIXI.Polygon(game.config.cockpit.book.small);
        this.smallBook.interactive = true;
        this.smallBook.buttonMode = true;
        this.smallBook.on("click", this.onclick);

        let style = new PIXI.TextStyle(game.config.cockpit.book.style);
        this.page1 = new PIXI.Text(game.config.cockpit.book.page1.text, style);
        this.page1.position.set(...game.config.cockpit.book.page1.pos);
        this.page1.angle = game.config.cockpit.book.page1.angle;

        this.page2 = new PIXI.Text(game.config.cockpit.book.page2.text, style);
        this.page2.position.set(...game.config.cockpit.book.page2.pos);
        this.page2.angle = game.config.cockpit.book.page2.angle;

        this.stage.addChild(this.ladderBounding, this.drawer1Bounding, this.drawer2Bounding, this.drawer3Bounding);

    }

    saveResources(resources: any) {
        super.saveResources(resources);
        this.imgLamp = new PIXI.Sprite(resources.lamp.texture);
        this.imgLamp.x = this.game.config.cockpit.lamp.x;
        this.imgLamp.y = this.game.config.cockpit.lamp.y;

        this.drawer1 = new PIXI.Sprite(resources.drawer1.texture);
        this.drawer2 = new PIXI.Sprite(resources.drawer2.texture);
        this.drawer3 = new PIXI.Sprite(resources.drawer3.texture);

        this.drawer1.visible = false;
        this.drawer2.visible = false;
        this.drawer3.visible = false;

        this.drawer2.hitArea = new PIXI.Polygon(this.game.config.cockpit.drawer2.open);
        this.drawer3.hitArea = new PIXI.Polygon(this.game.config.cockpit.drawer3.open);

        this.drawer2.interactive = true;
        this.drawer3.interactive = true;

        this.drawer2.buttonMode = true;
        this.drawer3.buttonMode = true;


        this.drawer2.on("click", this.onclick);
        this.drawer3.on("click", this.onclick);

        this.drawer1.addChild(this.drawer1Open, this.smallBook);
        this.stage.addChild(this.imgLamp, this.drawer3, this.drawer2, this.drawer1);

        this.arrow = new PIXI.Sprite(resources.arrow.texture);
        this.arrow.hitArea = new PIXI.Polygon(this.game.config.ui.arrow.polygon);
        this.arrow.interactive = true;
        this.arrow.buttonMode = true;
        this.arrow.on("click", this.onclick);
        this.book = new PIXI.Sprite(resources.book.texture);
        this.bookStage.addChild(this.book, this.arrow, this.page1, this.page2);

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
            this.drawer1.visible = true;
            this.drawer1Bounding.visible = false;
        } else if (ev.target == this.drawer2Bounding) {
            this.drawer2.visible = true;
            this.drawer2Bounding.visible = false;
        } else if (ev.target == this.drawer3Bounding) {
            this.drawer3.visible = true;
            this.drawer3Bounding.visible = false;
        } else if (ev.target == this.drawer1Open) {
            this.drawer1.visible = false;
            this.drawer1Bounding.visible = true;
        } else if (ev.target == this.drawer2) {
            this.drawer2.visible = false;
            this.drawer2Bounding.visible = true;
        } else if (ev.target == this.drawer3) {
            this.drawer3.visible = false;
            this.drawer3Bounding.visible = true;
        } else if (ev.target == this.arrow) {
            this.stage.interactiveChildren = true;
            this.game.app.stage.removeChild(this.bookStage);
        } else if (ev.target == this.smallBook) {
            this.stage.interactiveChildren = false;
            this.game.app.stage.addChild(this.bookStage);
        }
    }
}
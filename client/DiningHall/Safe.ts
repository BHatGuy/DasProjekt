import { Game } from "../Game";
import { DiningHall } from "./DiningHall";
import * as PIXI from 'pixi.js';

export class Safe {
    imgSafe = new PIXI.Sprite();
    imgSafeOpen = new PIXI.Sprite();
    imgDisk1 = new PIXI.Sprite();
    imgDisk2 = new PIXI.Sprite();
    imgDisk3 = new PIXI.Sprite();
    imgIndicator = new PIXI.Sprite();
    imgSurprise = new PIXI.Sprite();
    arrow = new PIXI.Sprite();
    arrowBounding = new PIXI.Graphics();
    angles = [this.digitToAngle(0), this.digitToAngle(0), this.digitToAngle(0)];
    goals = [this.digitToAngle(0), this.digitToAngle(0), this.digitToAngle(0)];
    combi = [0, 0, 0];
    solution = [4, 2, 8];
    solved = false;
    index = 0;
    rate = 1;

    parent: DiningHall;
    game: Game;
    stage = new PIXI.Container();

    constructor(parent: DiningHall, game: Game) {
        this.parent = parent;
        this.game = game;

        this.arrowBounding.hitArea = new PIXI.Polygon(game.config.ui.arrow.polygon);
        this.arrowBounding.interactive = true;
        this.arrowBounding.buttonMode = true;
        this.arrowBounding.on("click", this.onclick);
        this.stage.addChild(this.arrowBounding);

        let loader = new PIXI.Loader();
        // TODO: use config
        loader.add("safe", "images/Safe.png")
            .add("safeOpen", "images/Safe_offen.png")
            .add("disk1", "images/Scheibe1.png")
            .add("disk2", "images/Scheibe2.png")
            .add("disk3", "images/Scheibe3.png")
            .add("indicator", "images/Anzeige.png")
            .add("surprise", "images/Doener_berlin_kraeuter.png")
            .add("arrow", game.config.ui.arrow.img);

        loader.load((loader, resources) => {
            this.imgSafe = new PIXI.Sprite(resources.safe.texture);
            this.imgSafeOpen = new PIXI.Sprite(resources.safeOpen.texture);
            this.imgDisk1 = new PIXI.Sprite(resources.disk1.texture);
            this.imgDisk2 = new PIXI.Sprite(resources.disk2.texture);
            this.imgDisk3 = new PIXI.Sprite(resources.disk3.texture);
            this.imgIndicator = new PIXI.Sprite(resources.indicator.texture);
            this.imgSurprise = new PIXI.Sprite(resources.surprise.texture);
            this.arrow = new PIXI.Sprite(resources.arrow.texture);

            this.imgSurprise.scale.set(0.75);
            this.imgSurprise.position.set(750, 450);

            // TODO: can we solve this without shifting?
            this.imgDisk1.pivot.set(978, 946);
            this.imgDisk2.pivot.set(978, 946);
            this.imgDisk3.pivot.set(978, 946);

            this.imgDisk1.position.set(978, 946);
            this.imgDisk2.position.set(978, 946);
            this.imgDisk3.position.set(978, 946);

            this.imgSafeOpen.visible = false;
            this.imgSurprise.visible = false;

            this.stage.addChild(this.imgSafe, this.imgDisk1, this.imgDisk2, this.imgDisk3, this.imgIndicator, this.imgSafeOpen, this.imgSurprise, this.arrow);
        });
    }

    update = (delta: number) => {
        let position = [false, false, false];

        for (let i = 0; i < this.goals.length; i++) {

            if (this.angles[i] === this.goals[i]) {
                position[i] = this.combi[i] == this.solution[i];
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

        this.imgDisk1.angle = this.angles[0];
        this.imgDisk2.angle = this.angles[1];
        this.imgDisk3.angle = this.angles[2];

        // TODO Pasue before opening

        if (position.reduce((a, b) => a && b) != this.solved) {
            this.solved = position.reduce((a, b) => a && b);
            if (this.solved) {
                this.imgSafeOpen.visible = true;
                this.imgSurprise.visible = true;
            } else {
                this.imgSafeOpen.visible = false;
                this.imgSurprise.visible = false;
            }
        }

    }

    show() {
        this.parent.game.app.stage.removeChild(this.parent.stage);
        this.parent.game.app.stage.addChild(this.stage);
        document.addEventListener("keypress", this.keypressListener);
        this.parent.game.app.ticker.add(this.update);
    }

    hide() {
        this.parent.game.app.stage.removeChild(this.stage);
        this.parent.game.app.stage.addChild(this.parent.stage);
        document.removeEventListener("keypress", this.keypressListener);
        this.parent.game.app.ticker.remove(this.update);
    }

    keypressListener = (e: KeyboardEvent) => { this.onkeypress(e) };

    onclick = (data: PIXI.InteractionData) => {
        this.hide();
    }

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
        return 360 - digit * 36;
    }
}
import { Game } from "./Game";
import * as PIXI from 'pixi.js'

export enum RoomAlias {
    // DiningHall,
    Cockpit,
    MachineRoom,
    UpperHallway,
    LowerHallway,
}

export class Room {
    protected background: PIXI.Sprite = new PIXI.Sprite();
    protected game: Game;
    protected stage: PIXI.Container;
    protected loader: PIXI.Loader;
    // overlay: HTMLDivElement;


    constructor(game: Game, backgroud: string) {
        this.game = game;
        this.loader = new PIXI.Loader();
        //game.app.loader.reset();
        this.loader.add("backgroud", backgroud);

        this.stage = new PIXI.Container();
    }

    loadResources() {
        this.loader.load((loader, resources) => {
            this.saveResources(resources);
        });
    }

    saveResources(resources: any) {
        this.background = new PIXI.Sprite(resources.backgroud.texture);
        this.stage.addChild(this.background);
    }

    activate() {
        this.game.app.stage = this.stage;
    }

    deactivate() {

    }


    receive(msg: MessageEvent<any>): void {

    }

}
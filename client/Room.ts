import { Game } from "./Game";
import * as PIXI from 'pixi.js'

export enum RoomAlias {
    DiningHall,
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
    private backgroundId: string;


    constructor(game: Game, backgroud: string) {
        this.game = game;
        this.loader = new PIXI.Loader();
        //game.app.loader.reset();
        this.loader.add(backgroud, backgroud);
        this.backgroundId = backgroud;

        this.stage = new PIXI.Container();

    }

    loadResources() {
        this.loader.load((loader, resources) => {
            this.saveResources(resources);
        });
    }

    saveResources(resources: any) {
        this.background = new PIXI.Sprite(resources[this.backgroundId].texture);
        this.stage.addChild(this.background);
    }

    activate() {
        this.game.app.stage.addChild(this.stage);
    }

    deactivate() {
        this.game.app.stage.removeChild(this.stage);
    }


    receive(msg: MessageEvent<any>): void {

    }

}
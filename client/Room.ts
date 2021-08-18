import { Game } from "./Game";
import * as PIXI from 'pixi.js'

export enum RoomAlias {
    DiningHall,
    Cockpit,
    MachineRoom,
    UpperHallway,
    LowerHallway,
    Kitchen,
}

export class Room {
    background: PIXI.Sprite = new PIXI.Sprite();
    game: Game;
    stage: PIXI.Container;
    loader: PIXI.Loader;
    private backgroundId: string;


    constructor(game: Game, backgroud: string) {
        this.game = game;
        this.loader = new PIXI.Loader();
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
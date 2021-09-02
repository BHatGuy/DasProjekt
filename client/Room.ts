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

export let roomAliases = [RoomAlias.DiningHall, RoomAlias.Cockpit, RoomAlias.MachineRoom, RoomAlias.UpperHallway, RoomAlias.LowerHallway, RoomAlias.Kitchen];

export class Room {
    background: PIXI.Sprite = new PIXI.Sprite();
    game: Game;
    stage: PIXI.Container;
    private backgroundId: string;


    constructor(game: Game, backgroud: string) {
        this.game = game;
        game.app.loader.add(backgroud, backgroud);
        this.backgroundId = backgroud;

        this.stage = new PIXI.Container();
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
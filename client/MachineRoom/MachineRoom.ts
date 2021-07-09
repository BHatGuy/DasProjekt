import { Game } from "../Game";
import { Room, RoomAlias } from "../Room";
import * as PIXI from 'pixi.js';


export class MachineRoom extends Room {

    doorBounding: PIXI.Graphics;

    constructor(game: Game) {
        super(game, game.config.machineRoom.img);
        this.doorBounding = new PIXI.Graphics();
        this.doorBounding.hitArea = new PIXI.Polygon(game.config.machineRoom.door);
        this.doorBounding.interactive = true;
        this.doorBounding.on("click", this.onclick);
        this.loadResources();
    }

    onclick = (data: PIXI.InteractionData) => {
        this.game.nextRoom(RoomAlias.UpperHallway);
    };

}
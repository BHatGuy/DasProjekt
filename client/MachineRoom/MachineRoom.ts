import { Game } from "../Game";
import { Room, RoomAlias } from "../Room";
import * as PIXI from 'pixi.js';


export class MachineRoom extends Room {

    doorBounding: PIXI.Graphics;
    mechanic = new PIXI.Sprite();
    animation: PIXI.AnimatedSprite | null = null;


    constructor(game: Game) {
        super(game, game.config.machineRoom.img);
        this.doorBounding = new PIXI.Graphics();
        this.doorBounding.hitArea = new PIXI.Polygon(game.config.machineRoom.door);
        this.doorBounding.interactive = true;
        this.doorBounding.buttonMode = true;

        this.doorBounding.on("click", this.onclick);
        this.stage.addChild(this.doorBounding);

        // TODO use config file
        for (let i = 0; i < 24; i++) {
            this.loader.add(`animation${i}`, `images/Zeitleiste1_${i}.png`);
        }

        this.loader.add("mechanic", game.config.machineRoom.mechanic);
        this.loadResources();
    }

    saveResources(resources: any) {
        super.saveResources(resources);
        this.mechanic = new PIXI.Sprite(resources.mechanic.texture);
        this.stage.addChild(this.mechanic);
        let frames: Array<PIXI.Texture> = [];
        for (let i = 0; i < 24; i++) {
            frames.push(resources[`animation${i}`].texture)
        }
        this.animation = new PIXI.AnimatedSprite(frames);
        this.animation.animationSpeed = 0.2;
        this.stage.addChild(this.animation);
        this.animation?.play();

    }

    onclick = (data: PIXI.InteractionData) => {
        this.game.nextRoom(RoomAlias.LowerHallway);
    };

}
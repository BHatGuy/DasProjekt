import { DiningHall } from "./DiningHall/DiningHall";
import { Cockpit } from "./Cockpit/Cockpit";
import { Room, RoomAlias } from "./Room";
import { MachineRoom } from "./MachineRoom/MachineRoom";
import { LowerHallway } from "./LowerHallway/LowerHallway";
import { UpperHallway } from "./UpperHallway/UpperHallway";
import { Background } from "./Background";
import * as PIXI from 'pixi.js'


export class Game {
    app: PIXI.Application;
    background: PIXI.Application;
    messageQueue: MessageEvent<any>[] = [];
    socket: WebSocket;
    rooms: Record<RoomAlias, Room>;
    currentRoom: Room;
    config: any;

    constructor(app: PIXI.Application, socket: WebSocket, config: any, background: PIXI.Application) {
        this.config = config;
        this.socket = socket;
        this.app = app;
        this.background = background;
        this.socket.onmessage = this.receive;

        app.stage.scale.set(app.view.width / config.width, app.view.height / config.height)

        this.rooms = {
            [RoomAlias.DiningHall]: new DiningHall(this),
            [RoomAlias.Cockpit]: new Cockpit(this),
            [RoomAlias.MachineRoom]: new MachineRoom(this),
            [RoomAlias.UpperHallway]: new UpperHallway(this),
            [RoomAlias.LowerHallway]: new LowerHallway(this)
        }
        this.currentRoom = this.rooms[RoomAlias.UpperHallway];
        this.currentRoom.activate();

        // Animated Background:
        background.stage.scale.set(background.view.height / config.height);
        background.loader.add("sea", config.background.sea)
            .add("clouds", config.background.clouds)
            .load((loader, resources) => {
                let sea = new PIXI.Sprite(resources.sea.texture);
                let clouds1 = new PIXI.Sprite(resources.clouds.texture);
                let clouds2 = new PIXI.Sprite(resources.clouds.texture);
                background.stage.addChild(sea, clouds1, clouds2);
                background.ticker.add((delta) => {
                    clouds1.x += delta;
                    clouds2.x = clouds1.x - clouds1.width;
                    if (clouds1.x >= clouds1.width) {
                        clouds1.x = 0;
                    }
                });
            });
    }


    receive(msg: MessageEvent<any>) {
        console.log(msg.data);
        this.messageQueue.push(msg);
    }


    nextRoom(r: RoomAlias) {
        this.currentRoom.deactivate();
        this.currentRoom = this.rooms[r]
        this.currentRoom.activate();
    }
}
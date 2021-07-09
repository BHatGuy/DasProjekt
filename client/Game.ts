// import { DiningHall } from "./DiningHall/DiningHall";
import { Cockpit } from "./Cockpit/Cockpit";
import { Room, RoomAlias } from "./Room";
import { MachineRoom } from "./MachineRoom/MachineRoom";
import { LowerHallway } from "./LowerHallway/LowerHallway";
import { UpperHallway } from "./UpperHallway/UpperHallway";
import { Background } from "./Background";
import * as PIXI from 'pixi.js'




export class Game {
    app: PIXI.Application;
    messageQueue: MessageEvent<any>[] = [];
    socket: WebSocket;
    rooms: Record<RoomAlias, Room>;
    currentRoom: Room;
    config: any;
    //background: Background;

    constructor(app: PIXI.Application, socket: WebSocket, config: any) {
        this.config = config;
        this.socket = socket;
        this.app = app;
        this.socket.onmessage = this.receive;
        this.rooms = {
            // [RoomAlias.DiningHall]: new DiningHall(this),
            [RoomAlias.Cockpit]: new Cockpit(this),
            [RoomAlias.MachineRoom]: new MachineRoom(this),
            [RoomAlias.UpperHallway]: new UpperHallway(this),
            [RoomAlias.LowerHallway]: new LowerHallway(this)
        }
        //this.background = new Background(this);
        this.currentRoom = this.rooms[RoomAlias.UpperHallway];
        this.currentRoom.activate();
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
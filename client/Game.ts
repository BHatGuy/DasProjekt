import { DiningHall } from "./DiningHall";
import { GameObject } from "./GameObject";
import { Cockpit } from "./Cockpit";
import { Room, RoomAlias } from "./Room";



export class Game {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    messageQueue: MessageEvent<any>[] = [];
    socket: WebSocket;
    rooms: Record<RoomAlias, Room>;
    currentRoom: Room;

    constructor(canvas: HTMLCanvasElement, socket: WebSocket) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d') as CanvasRenderingContext2D;
        this.socket = socket;
        this.socket.onmessage = this.receive;
        this.rooms = {
            [RoomAlias.DiningHall]: new DiningHall(this, canvas),
            [RoomAlias.Cockpit]: new Cockpit(this, canvas),
        }
        this.currentRoom = this.rooms[RoomAlias.DiningHall];
        this.currentRoom.activate();
        canvas.onclick = (e: MouseEvent) => { this.onclick(e); };
    }


    receive(msg: MessageEvent<any>) {
        console.log(msg.data);
        this.messageQueue.push(msg);
    }

    gameLoop(delta: number) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);


        // receive:
        while (this.messageQueue.length > 0) {
            let msg = this.messageQueue.shift() as MessageEvent<any>;

        }

        // update: 
        this.currentRoom.update(delta);

        // draw:
        this.currentRoom.draw(this.context, this.canvas);

    }

    onclick(ev: MouseEvent) {
        this.currentRoom.onclick(ev);
    }

    nextRoom(r: RoomAlias) {
        this.currentRoom.deactivate();
        this.currentRoom = this.rooms[r]
        this.currentRoom.activate();
    }
}
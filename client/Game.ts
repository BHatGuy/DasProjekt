import { DiningHall } from "./DiningHall/DiningHall";
import { Cockpit } from "./Cockpit/Cockpit";
import { Room, RoomAlias } from "./Room";
import { MachineRoom } from "./MachineRoom/MachineRoom";
import { LowerHallway } from "./LowerHallway/LowerHallway";
import { UpperHallway } from "./UpperHallway/UpperHallway";
import { Background } from "./Background";



export class Game {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    messageQueue: MessageEvent<any>[] = [];
    socket: WebSocket;
    rooms: Record<RoomAlias, Room>;
    currentRoom: Room;
    config: any;
    background: Background;

    constructor(canvas: HTMLCanvasElement, background: HTMLCanvasElement, socket: WebSocket, config: any) {
        this.config = config;
        this.canvas = canvas;
        this.context = canvas.getContext('2d') as CanvasRenderingContext2D;
        this.context.imageSmoothingEnabled = true;
        this.context.imageSmoothingQuality = "high";
        this.socket = socket;
        this.socket.onmessage = this.receive;
        this.rooms = {
            [RoomAlias.DiningHall]: new DiningHall(this, canvas, config),
            [RoomAlias.Cockpit]: new Cockpit(this, canvas, this.config),
            [RoomAlias.MachineRoom]: new MachineRoom(this, canvas, this.config),
            [RoomAlias.UpperHallway]: new UpperHallway(this, canvas, this.config),
            [RoomAlias.LowerHallway]: new LowerHallway(this, canvas, this.config)
        }
        this.currentRoom = this.rooms[RoomAlias.UpperHallway];
        this.currentRoom.activate();
        // TODO: feractor this part!!!
        canvas.onclick = (e: MouseEvent) => { this.currentRoom.onclick(e); };
        canvas.onmousemove = (e: MouseEvent) => { this.currentRoom.onmove(e); }
        this.background = new Background(this, background, config);
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
        this.background.update(delta);

        // draw:
        this.currentRoom.draw(this.canvas);
        this.background.draw();

    }

    onclick(ev: MouseEvent) {

    }

    nextRoom(r: RoomAlias) {
        this.currentRoom.deactivate();
        this.currentRoom = this.rooms[r]
        this.currentRoom.activate();
    }
}
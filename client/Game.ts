import { DiningHall } from "./DiningHall/DiningHall";
import { Cockpit } from "./Cockpit/Cockpit";
import { Room, RoomAlias, roomAliases } from "./Room";
import { MachineRoom } from "./MachineRoom/MachineRoom";
import { LowerHallway } from "./LowerHallway/LowerHallway";
import { UpperHallway } from "./UpperHallway/UpperHallway";
import { Kitchen } from "./Kitchen/Kitchen"
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
        this.socket.onmessage = (e: MessageEvent) => { this.receive(e) };  // TODO: use add listener

        app.stage.scale.set(app.view.width / config.width, app.view.height / config.height)

        this.rooms = {
            [RoomAlias.DiningHall]: new DiningHall(this),
            [RoomAlias.Cockpit]: new Cockpit(this),
            [RoomAlias.MachineRoom]: new MachineRoom(this),
            [RoomAlias.UpperHallway]: new UpperHallway(this),
            [RoomAlias.LowerHallway]: new LowerHallway(this),
            [RoomAlias.Kitchen]: new Kitchen(this)
        }
        app.loader.add("arrow", config.ui.arrow.img);

        let graphics = new PIXI.Graphics();
        graphics.lineStyle({ width: 2, color: 0xffffff });
        graphics.drawRect(64, config.height / 2, (config.width - 128), 64);
        let style = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 64,
            fill: 0xffffff,
        });
        let loadingText = new PIXI.Text(config.loadingText, style);
        loadingText.position.set(config.width / 2 - loadingText.width / 2, config.height / 2 - 91);
        app.stage.addChild(graphics, loadingText);

        app.loader.onProgress.add((loader) => {
            graphics.beginFill(0xffffff);
            graphics.drawRect(64, config.height / 2, (config.width - 128) * loader.progress / 100, 64);
            graphics.endFill();
        });

        this.currentRoom = this.rooms[RoomAlias.UpperHallway];

        app.loader.load((loader, resources) => {
            // TODO: do this more elegant
            for (let i = 0; i < roomAliases.length; i++) {
                const room = this.rooms[roomAliases[i]];
                room.saveResources(resources);
            }
            this.app.stage.removeChild(graphics, loadingText);
            this.currentRoom.activate();
            this.socket.send(JSON.stringify({ action: "getstate" }));
        });



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

    // TODO combine recieve setState?
    receive(msg: MessageEvent<any>) {
        let data = JSON.parse(msg.data)
        if (data.action == "state") {
            this.setState(data.state)
        } else {
            console.log(data);
        }
    }

    setState(state: any) {
        console.log(state);

        let dh = this.rooms[RoomAlias.DiningHall] as DiningHall;
        let lh = this.rooms[RoomAlias.LowerHallway] as LowerHallway;
        dh.setBaron(state.baron);
        lh.setDoor(state.trapdoor);
    }


    nextRoom(r: RoomAlias) {
        this.currentRoom.deactivate();
        this.currentRoom = this.rooms[r]
        this.currentRoom.activate();
    }
}
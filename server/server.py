#!/usr/bin/env python

# WS server example that synchronizes state across clients

import asyncio
import websockets
import logging as log
import json

log.basicConfig(
    level=log.INFO,
    format='%(asctime)s.%(msecs)03d %(levelname)s: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
)


class State:
    def __init__(self) -> None:
        self.baron = False
        self.trapdoor = True


clients = set()
state = State()


async def sendall(message):
    for client in clients:
        await client.send(message)


async def main(websocket, path):
    log.info(f"client connected {websocket.remote_address}")
    clients.add(websocket)
    try:
        async for message in websocket:
            data = json.loads(message)
            if data["action"] == "glass":
                state.baron = not state.baron
            elif data["action"] == "trapdoor":
                state.trapdoor = False
            elif data["action"] == "getstate":
                pass
            elif data["action"] == "reset":
                state.__init__()
            await sendall(json.dumps({"action": "state", "state": state.__dict__}))

    finally:
        clients.remove(websocket)
        log.info(f"client disconnected {websocket.remote_address}")


start_server = websockets.serve(main, "0.0.0.0", 6789)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()

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
clients = set()


async def sendall(message):
    for client in clients:
        await client.send(message)


async def main(websocket, path):
    log.info(f"client connected {websocket.remote_address}")
    clients.add(websocket)

    async for message in websocket:
        data = json.loads(message)
        if data["action"] == "glass":
            await sendall(json.dumps({"action": "baron"}))

    clients.remove(websocket)
    log.info(f"client disconnected {websocket.remote_address}")


start_server = websockets.serve(main, "0.0.0.0", 6789)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()

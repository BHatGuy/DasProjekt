#!/usr/bin/env python

# WS server example that synchronizes state across clients

import asyncio
import websockets
import logging as log

log.basicConfig(level=log.INFO)
clients = set()

async def main(websocket, path):
    log.info(f"client connected {websocket.remote_address}")
    log.info(websocket.request_headers)
    async for message in websocket:
        pass
    log.info(f"client disconnected {websocket.remote_address}")


start_server = websockets.serve(main, "localhost", 6789)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
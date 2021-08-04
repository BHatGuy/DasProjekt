#!/usr/bin/env python

# WS server example that synchronizes state across clients

import asyncio
import websockets
import logging

logging.basicConfig(level=logging.INFO)

async def main(websocket, path):
    logging.info(f"connected {path}")
    async for message in websocket:
        pass
        


start_server = websockets.serve(main, "localhost", 6789)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
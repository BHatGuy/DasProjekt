#!/usr/bin/env python

# WS server example that synchronizes state across clients

import asyncio
import websockets
import random


async def main(websocket, path):
    # register(websocket) sends user_event() to websocket
    async for message in websocket:
        print(message)
        


start_server = websockets.serve(main, "localhost", 6789)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
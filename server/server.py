#!/usr/bin/env python

# WS server example that synchronizes state across clients

import asyncio
import websockets
import random


USERS = set()
COLOR = "#000000"

async def register(user):
    USERS.add(user)

async def unregister(user):
    USERS.remove(user)

async def donk():
    random_number = random.randint(0,16777215)
    hex_number = str(hex(random_number))
    hex_number ='#'+ hex_number[2:]
    for u in USERS:
        print(hex_number)
        await u.send(hex_number)

async def main(websocket, path):
    # register(websocket) sends user_event() to websocket
    await register(websocket)
    try:
        await websocket.send(COLOR)
        async for message in websocket:
            print(message)
            await donk()
    finally:
        await unregister(websocket)


start_server = websockets.serve(main, "localhost", 6789)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
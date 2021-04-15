# Zoom Clone Server

Hosted [here](https://zoom-clone-client.vercel.app/)

Peer Server [here](https://github.com/rhammock1/zoom-peer-server)
Client [here](https://github.com/rhammock1/zoom-clone-client)

Server side built with Node, Express, Socket.io

## Documentation
Peer server is on another repo. This server only has two accessible endpoint

'/' GET (just a test endpoint to make sure its working properly)
Response: 200 ok
```
    'Hello world'
```

/rooms GET - include 'room_id' as header to determine if that room_id is being used
Response: 200 ok sends true
Response: 404 sends false

# Plan of Action

- init project
- init first view
- create a room and uuid
- add ability to view our own video
- add ability others to stream their video (P2P)
- add styling
- add instant messaging 
- add mute button
- add stop video button

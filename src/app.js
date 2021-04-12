require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV, IO_PORT } = require('./config');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
(NODE_ENV === 'development') ? io.listen(IO_PORT) : null;
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
  debug: true,
  secure: (NODE_ENV === 'production') ? true : false,
});

app.use('/peerjs', peerServer);

const morganOption = (NODE_ENV === 'production') ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());



const availableRooms = [];

io.on('connection', (socket) => {
  console.log("Connected");
  socket.on('join-room', (roomId, userId) => {
    console.log("user joined room");
    if (!availableRooms.includes(roomId)) {
      availableRooms.push(roomId);
    }
    
    console.log("line 37 server: ", roomId);
    socket.join(roomId);
    socket.to(roomId).emit('user-connected', userId);
    // socket.on('uuid', (roomId) => {
      
    // })
    
  })

})

app.get('/', (req, res) => {
  res.status(200).send("Hello world");
})

app.get('/rooms', (req, res, next) => {
  const { room_id } = req.headers;
  console.log(room_id)
  if (availableRooms.includes(room_id)) {
    res.status(200).send(true);
  } else {
    res.status(404).send(false);
  }
})

app.use(function errorHandler(error, req, res, next) {
  let response;
  if(NODE_ENV === 'production') {
    response = { error: { message: 'Internal Server Error' } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
})

module.exports = { app, server };

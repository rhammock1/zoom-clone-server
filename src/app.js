require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)

const morganOption = (NODE_ENV === 'production') ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(express.static('public'));

app.set('view engine', 'ejs');
io.on('connection', (socket) => {
  socket.on('join-room', () => {
    console.log("user joined room"); 
  })
})

app.get('/', (req, res) => {
  res.redirect(`/${uuidv4()}`)
})

app.get('/:room', (req, res, next) => {
  res.render('room', { roomId: req.params.room });
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

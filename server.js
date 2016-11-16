var express = require('express')
var webpack = require('webpack')
var path = require('path')
var bodyParser = require('body-parser')
var config = require('./webpack.dev.config')
var open = require('open')
/* eslint-disable no-console */



const port = 8080;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

var jsonParser = bodyParser.json();
app.use(jsonParser)

// app.use(bodyParser.urlencoded({
//     extended: true
// }));
// app.use(bodyParser.json({type: 'application/json'}));
app.use(require('webpack-hot-middleware')(compiler));
// app.use(favicon(__dirname + '/assets/public/favicon.ico'));

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, './index.html'));
});

const server = app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});

const io = require('socket.io')(server);


 io.on('connection', (socket) => {
  console.log('a user connected');
 
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

 app.post('/draw', jsonParser, function(req, resp) {
    console.log('in POST /draw')
    console.log('request body:', req.body.drawCoords)
    io.emit('draw event', req.body.drawCoords);
 })

// "use strict";
// const express = require('express');
// const bodyParser = require('body-parser');
// const twilio = require('twilio');
 
// const app = express();
 
// // Run server to listen on port 3000.
// const server = app.listen(3000, () => {
//   console.log('listening on *:3000');
// });
 
// const io = require('socket.io')(server);
 
// app.use(bodyParser.urlencoded({ extended: false } ));
// app.use(express.static('static'));
 
// // Set socket.io listeners.
// io.on('connection', (socket) => {
//   console.log('a user connected');
 
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });
 
// // Set Express routes.
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/views/index.html');
// });
 
// app.post('/events', (req, res) => {
//   let to = req.body.To;
//   let fromNumber = req.body.From;
//   let callStatus = req.body.CallStatus;
//   let callSid = req.body.CallSid;
 
//   io.emit('call progress event', { to, fromNumber, callStatus, callSid });
 
//   console.log(to, from, callStatus, callSid);
//   res.send('Event received');
// });
 
// app.post('/voice', (req, res) => {
//   // Generate a TwiML response
//   let twiml = new twilio.TwimlResponse();
//   // Talk in a robot voice over the phone.
//   twiml.say('Call progress events are rad');
//   // Set the response type as XML.
//   res.header('Content-Type', 'text/xml');
//   // Send the TwiML as the response.
//   res.send(twiml.toString());
// });

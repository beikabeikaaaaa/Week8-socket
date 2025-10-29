const express = require('express');
const http = require('http');
const { Server } = require("socket.io"); 

const app = express();
const server = http.createServer(app); 
const io = new Server(server); 
const PORT = 3000; 

let clickCount = 0;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

  console.log('A user connected!');
    socket.emit('updateCounter', clickCount);

    socket.on('clientClick', () => {
    console.log('Server received a click!');
    
   
    clickCount = clickCount + 1;

    io.emit('updateCounter', clickCount); 
  });

  socket.on('disconnect', () => {
   
    console.log('A user disconnected.');
  });
});


server.listen(PORT, () => {
 
  console.log(`Server is running on http://localhost:${PORT}`);
});
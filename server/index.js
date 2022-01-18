const app = require("express");
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    cors: {
      origin: '*'
    }
  });
const port = process.env.port || 3001;



server.listen(port, () => {
    console.log('Server runs on port ' + port)
})


io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('sendmessage', (data) => {
        console.log(data);
        socket.emit('message', { 
            user: data.user,
            message: data.message
        });
    })
})
 
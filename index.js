//node server which will handle socket connections

const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });

const users = {};

io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        
       
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    })

    socket.on('send',message=>{
        socket.broadcast.emit('recieved',{message : message , name : users[socket.id]})
    })

    socket.on('disconnect',()=>{
        let name = users[socket.id]
        socket.broadcast.emit('disconnected', name);
        delete users[socket.id];
    })

})

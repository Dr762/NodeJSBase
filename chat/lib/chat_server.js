
var socketio = require('socket.io');
var io;
var guestNumber =1;
var nickNames = {};
var namesUsed = [];
var currentRoom = {};

exports.listen = function(server){
io = socketio.listen(server);

io.sockets.on('connection', function(socket){
 guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
 joinRoom(socket, 'Lobby');

 handleMsgBroadCasting(socke);
 handleNameChangeAttempts(socket, nickNames, namesUsed);
 handleRoomJoining(socket);

 socket.on('rooms', function(){
   socket.emit('rooms', io.sockets.manager.rooms);
   });
   handleClientDisconnection(socket, nickNames, namesUsed);
  
  });
};

function assignGuestName(socket, guestName, nickNames, namesUsed){
  var name = 'Guest' + guestNumber;
  nickNames[socket.id] = name;
  socket.emit('nameResult',{
    success:true,
    name:name 
  });
  namesUsed.push(name);
  return guestNumber + 1;
}

function joinRoom(socket, room){
  socket.join(room);
  currentRoom[socket.id] = room;
  socket.emit('joinResult', {room:room});
  socket.broadcast.to(room).emit('message',{
    text: nickNames[socket.id] + ' has joined ' + room + '.'
  }); 

  var usersInRoom = io.sockets.clients(room);
  if (usersInRoom.lengs>1){
   var usersInRoomSummary = 'Users currently in ' + room + ': ';
   for (var index in usersInRoom){
     var userSocketId = usersInRoom[index].id;
     if (userSocketId != socket.id){
       if (index > 0){
          usersInRoomSummary += ', ';
           }
       usersInRoomSummary += nickNames[userSocketId];
        }
     }
     usersInRoomSummary += '.';
     socket.emit('message', {text: usersInRoomSummary})
   }    
}

function handleNameChangeAttempts(socket, nickNames, namesUsed){
  socket.on('nameAttempt', function(name){
   if (name.indexOf('Guest')==0){
       socket.emit('nameEmit', {
        success: false,
        message: 'Names cannot begin with "Guest".' 
       });
     } else {
        if (nameUsed.index(name)==-1){
         var previousName = nickNames[socket.id]
         var previousNameIndex = namesUsed.indexof(previousName);
         namesUsed.push(name);
         nickNames[socket.id] = name;
         delete namesUsed[previousNameIndex];
         socket.emit('nameResult',{
           success: true,
           name: name 
         });    
         socket.broadcast.to(current[socket.id]).emit('message',{
           text: previousName + ' is now known as ' + name + '.'
         }); 
       }    
     }
   });
}

function handleMsgBroadCasting(socket){
  socket.on('message', function(message){
    socket.broadcast.to(message.room).emit('message', {
      text: nickNames[socket.id] + ': ' + message.text
    });
  });
}

function handleRoomJoining(socket){
  socket.on('join', function(room){
    socket.leave(currentRoom[socket.id]);
    joinRoom(socket, room.newRoom);  
  });
}

function handleClientDisconnection(socket){
  socket.on('disconnect',function(){
     var nameIndex = namesUsed.indexOf(nickNames[socket.id]);
     delete namesUsed[nameIndex];
     delete nickNames[socket.id];    
  });
}

const io = require('../server.js').io

/** 
 * Model imports for data manipulation
 */
const Chats  = require('./models').ChatModel;

const { 
  PRIVATE_CHAT, MESSAGE_RECEIVED, MESSAGE_SENT, 
  USER_CONNECTED, USER_DISCONNECTED, TYPING, FOUND_CHAT, 
  VERIFY_USER, LOGOUT
  } = require('./constants')


let connectedUsers = {};

module.exports = function(socket){
  
  //Verify Username 1
  socket.on(VERIFY_USER, function(newUser, callback){
    if(!isUser(connectedUsers, newUser.id)){
      
      callback({isUser:false, user:{id:newUser.id, socket_id: socket.id, first_name: newUser.first_name, last_name: newUser.last_name}})

    }else{
     
      callback({isUser:true})

    }
  })

  //User Connects with username
  socket.on(USER_CONNECTED, (user)=>{
    user.socket_id = socket.id
    connectedUsers = addUser(connectedUsers, user)
    socket.user = user

    io.emit(USER_CONNECTED, connectedUsers)
    console.log(connectedUsers);

  })
  
  //User disconnects
  socket.on('disconnect', ()=>{
    if("user" in socket){
      connectedUsers = removeUser(connectedUsers, socket.user.id)

      io.emit(USER_DISCONNECTED, connectedUsers)
      console.log("Disconnect", connectedUsers);
    }
  })


  //User logsout
  socket.on(LOGOUT, ()=>{
    connectedUsers = removeUser(connectedUsers, socket.id)
    io.emit(USER_DISCONNECTED, connectedUsers)
    console.log("Disconnect", connectedUsers);

  })

  //Get Community Chat
  socket.on(PRIVATE_CHAT, (user_id, friend_id,callback)=>{
    let id_1 = '';
    let id_2 = '';
    if(user_id > friend_id) {
      id_1 = user_id;
      id_2 = friend_id;
    } else {
      id_1 = friend_id;
      id_2 = user_id;
    }
    Chats.findOne({users:{$all: [id_1, id_2]}})
    .exec((err, chat_object) => {
      if (!err && chat_object!=null && Object.keys(chat_object).length > 0) {
        console.log("FOUND CHAT:", chat_object)
        callback(chat_object)
      } else Chats.create({users: [id_1, id_2]}, (err, data) =>{
        if(!err) {
          io.emit(FOUND_CHAT,data)
          console.log("CREATED NEW CHAT:",data)
        } else console.log(err)
      })
    })
  })

  socket.on(MESSAGE_SENT, (message_object,callback)=>{
    console.log(callback);
    Chats.findById(message_object.chat_id)
    .exec((err,chat_object) => {
      if(!err && chat_object!=null && Object.keys(chat_object).length > 0) {
        delete message_object['chat_id'];
        console.log(message_object)
        chat_object.messages.push(message_object);
        chat_object.save((err, saved_object) => {
          if(!err) {
            console.log(saved_object)
            callback(saved_object)
            io.emit(MESSAGE_RECEIVED,saved_object)
          } else console.log('Something Went Wrong!')
        })
      } else console.log('Something Went Wrong!')
    })
  })

  socket.on(TYPING, ({user,chat_id, isTyping})=>{
    io.emit(`${TYPING}-${chat_id}`, {user, isTyping})
  })

}

/*
* Adds user to list passed in.
* @param userList {Object} Object with key value pairs of users
* @param user {User} the user to added to the list.
* @return userList {Object} Object with key value pairs of Users
*/
function addUser(userList, user){
  let newList = Object.assign({}, userList)
  newList[user.id] = user
  return newList
}

/*
* Removes user from the list passed in.
* @param userList {Object} Object with key value pairs of Users
* @param username {string} name of user to be removed
* @return userList {Object} Object with key value pairs of Users
*/
function removeUser(userList, user_id){
  let newList = Object.assign({}, userList)
  delete newList[user_id]
  return newList
}

/*
* Checks if the user is in list passed in.
* @param userList {Object} Object with key value pairs of Users
* @param username {String}
* @return userList {Object} Object with key value pairs of Users
*/
function isUser(userList, user_id){
    return user_id in userList
}
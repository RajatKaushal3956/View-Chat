const io = require('./index.js').io

const { VERIFY_USER, USER_CONNECTED, LOGOUT} = require('../Events.js');

const {createUser, createMessage, createChat} = require('../Factories.js');

let connectedUsers = { }


module.exports = (socket) => {
    console.log("Socket Id:", socket.id);

    socket.on(VERIFY_USER, (nickname,callback) => {
        if(isUser(connectedUsers,nickname)){
            callback({isUser:true, user:null});
        } else {
            callback({isUser:false, user:user.createUser(nickname)});
        }
    })

    socket.on(USER_CONNECTED, (user) =>{
        connectedUsers = addUser(connectedUsers, user);
        socket.user = user;
        io.emit(USER_CONNECTED,connectedUsers);
        console.log(connectedUsers); 
    })

    socket.on('disconnect', () => {
        if('user' in socket) {
            connectedUsers = removeUser(connectedUsers,socket.user.name);
            io.emit(USER_DISCONNECTED,connectedUsers);
            console.log(connectedUsers);
        }
    })

    socket.on(LOGOUT,()=>{
        connectedUsers = removeUser(connectedUsers,socket.user.name);
        io.emit(USER_DISCONNECTED,connectedUsers);
        console.log(connectedUsers);
    })
}

function isUser(userList,username) {
    return username in userList;
}

function removeUser(userList, username) {
    let newList = Object.assign({}, userList);
    delete newList[username];
    return newList;
}

function addUser(userList, user) {
    let newList = Object.assign({}, userList);
    newList[user.name] = user;
    return newList;
}
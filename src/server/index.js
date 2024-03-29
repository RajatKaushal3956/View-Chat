var app = require('http').createServer();
var io = module.exports.io = require('socket.io')(app);

const PORT = 5000;

const SocketManager = require('./SocketManager.js');

io.on('connection', SocketManager);

app.listen(PORT, () => {
    console.log('Connected to PORT:',PORT);
})
var app = require('http').createServer();
const mongoose = require("mongoose");
var io = module.exports.io = require('socket.io')(app);

const PORT = process.env.PORT || 3231
const SocketManager = require('./server_config/socket_manager')
const DB_URL = <insert_DB_URL>

// Establishing a connection to the database
mongoose.connect(DB_URL, { useNewUrlParser: true })
  .then(() =>  {
    io.on('connection', SocketManager);
    app.listen(PORT);
    console.log("Simple Chat Server Running @" + PORT + "!");
  })
  .catch((err) => console.error(err));
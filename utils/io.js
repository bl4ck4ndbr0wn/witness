const socketIO = require("socket.io");

let io = null;

const connect = server => {
  io = socketIO(server);
};

const emit = data => {
  io = socketIO(data);
};

const getSocket = () => io;

module.exports = {
  connect,
  getSocket,
  emit
};

require("dotenv").config();
const app = require("express")();
const io = require("./utils/io");
// const WebSocket = require("ws");
var key =
  "eyJhbGciOiJLTVNFUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NDQ4MjczMzIsImp0aSI6Ijg5MWE2ZjcxLWYxMmUtNGY1NC04NjAzLTNjMjkyMmFlMDY1YSIsImlhdCI6MTU0MjIzNTMzMiwiaXNzIjoiZGZ1c2UuaW8iLCJzdWIiOiJDaVFBNmNieWU0SzE5Z3Q4NkFicUtRbmpKYVdTTXg0dkR3U09zZlBYUFpWQmlWSzlsTXNTUGdBL0NMUnR0L211eUE5MEFUaHZrUkR0d0RYUjhpdVBHTUlyKzFqdWprZGNZVTdPb1BSQ0hab0MvM3BLVmJkV1UwMVVvVGRMU3NDdlFaSkdreU5RIiwidGllciI6ImJldGEtdjEiLCJ2IjoxfQ.xdQq2R1wyipNeSDT-UA2CTNkzHQAshobsIB-pujewf_s6L1p7Js19Om7AfowabOHkzJ5J-rogmLAENN0XUiotw";
// Create WebSocket connection.
const socket = new WebSocket("wss://kylin.eos.dfuse.io/v1/stream?token=" + key);

// Connection opened
socket.addEventListener("open", function(event) {
  console.log("Message from server ", event.data);
  // socket.send({
  //   type: "get_actions",
  //   listen: true,
  //   data: {
  //     account: "witnessaccnt",
  //     action_name: "claim"
  //   }
  // });
});

// Listen for messages
// socket.addEventListener("message", function(event) {
//   console.log("Message from server ", event.data);
// });

const server = app.listen(process.env.PORT, () =>
  console.info(`Example app listening on port ${process.env.PORT}!`)
);

io.connect();

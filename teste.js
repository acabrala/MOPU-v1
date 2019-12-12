
const io = require("socket.io-client");

const socket = io("http://34.68.209.220:3000");

socket.on("connect", (result => {
    console.log(result);
    
}))


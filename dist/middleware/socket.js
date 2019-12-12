"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let incidente;
class SocketConnection {
    constructor(socket) {
        this.io = socket;
        this.io.on('connection', socket => {
            socket.emit('incidente', ((incidente) => {
                console.log('jkasjkldnas jahsd hnjahnsd');
            }));
            console.log("Conectado");
            socket.on('sousa', ((msg) => {
                console.log(msg);
            }));
            socket.on('disconnect', () => {
                console.log(`User disconnected.`);
            });
        });
    }
}
exports.SocketConnection = SocketConnection;

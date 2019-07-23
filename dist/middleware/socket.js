"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SocketConnection {
    constructor(socket) {
        this.io = socket;
        this.io.on('connection', socket => {
            console.log("Conectado");
            socket.on('disconnect', () => {
                console.log(`User disconnected.`);
            });
        });
    }
}
exports.SocketConnection = SocketConnection;

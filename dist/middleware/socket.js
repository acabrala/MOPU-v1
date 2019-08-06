"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProblemaReal_1 = require("../model/ProblemaReal");
const changeStream = ProblemaReal_1.default.watch();
changeStream.on('change', next => {
    console.log('alterou');
    console.log(next.fullDocument);
    let incidente = next.fullDocument;
});
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

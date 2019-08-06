import * as socket from 'socket.io'
import Problema from '../model/ProblemaReal';


const changeStream = Problema.watch();
changeStream.on('change', next => {
    console.log('alterou');
    console.log(next.fullDocument);
    let incidente = next.fullDocument;
})

export class SocketConnection {
    server: any
    private io: SocketIO.Server

    public constructor(socket: SocketIO.Server) {
        this.io = socket;

        this.io.on('connection', socket => {
            console.log("Conectado")

        socket.on('disconnect', () => {
        console.log(`User disconnected.`)
        });
    });
}
}
import * as socket from 'socket.io'

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
import * as express from 'express'
import * as bodyParser from 'body-parser';
import { Server, createServer } from 'http';
import { sequelize } from "./db/sequelize";
import Router from './routes/Router';
import * as io from 'socket.io';
import * as passport from 'passport'
import { AuthController } from './controllers/AuthController';
import { UserRepository } from './repository/UserRepository';
import { UserController } from './controllers/UserController';
import { EstacaoController } from './controllers/EstacaoController';
import { EstacaoRepository } from './repository/EstacaoRepository';
import { EstacaoAreaController } from './controllers/EstacaoAreaController';
import { EstacaoAreaRepository } from './repository/EstacaoAreaRepository';
import { LinhasTrilhosRepository } from './repository/LinhasTrilhosRepository';
import { CalculateRouterController } from './controllers/CalculateRouterController';
import { CalculateRouterRepository } from './repository/CalculateRouterRepository';
import { FavoritosRepository } from './repository/FavoritosRepository';
import { initializeStrategies } from './middleware/-initialize'
import { Database } from './db/Database';
import { RouterUserController } from './controllers/RouterUserController';
import { RouterRepository } from './repository/RouterRepository';
import { FavoritosController } from './controllers/FavoritosController';
import { ProblemaRepositoty } from './repository/ProblemaRepository';
import { ProblemaController } from './controllers/ProblemaController';
import Problema from './model/Problema';
import { MobileController } from './controllers/MobileController';
import { MobileRepository } from './repository/MobileRepository';
import { AvatarRepository } from './repository/AvatarRepository';
import { AvatarController } from './controllers/AvatarController';
import { SocketConnection } from './middleware/socket';
import * as socketio from 'socket.io'
import { LinhasRepository } from './repository/LinhasRepository';
import { LinhasController } from './controllers/LinhasController';



// import { BilheteRepository } from './repository/BilheteRepository';
// import { BilheteController } from './controllers/BilheteController';


export const Passport = passport;
export const Socket = socketio;

export class App {

    public static readonly PORT: number = 3000;
    private app: express.Application;
    private port: string | number;
    private server: Server;
    public auth;
    private socket;
    private io: SocketIO.Server;

    constructor() {
        this.createApp();
        this.config();
        this.createServer();
        this.initializeStrategies();
        this.middleware();
        this.listen();
        this.socketConnect();
        this.listenSocket();
        new Database();

    }

    private async listen() {
        try {
            await sequelize.sync({ force: false })

            this.server.listen(this.port, () => {
                console.log('Running server on port %s', this.port);
                const io = socketio(this.server);
                new SocketConnection(io)
            });
        } catch (e) {
            console.log("FATAL ERROR: COULD NOT CONNECT TO DATABASE.");
            console.log("ERROR:" + e);
        }
    }

    private socketConnect(): void {
        this.io = io(this.server)
    }

    private createApp(): void {
        this.app = express();
    }

    private config(): void {
        this.port = process.env.PORT || App.PORT;
    }

    private createServer(): void {
        this.server = createServer(this.app);
    }

    private middleware(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(passport.initialize())
        this.app.use(passport.session())
        this.app.use(socketio.listen)

        const routerRepository = new RouterRepository();
        const problemaRepository = new ProblemaRepositoty()
        const userRepository = new UserRepository();
        const estacaoRepository = new EstacaoRepository();
        const estacaoAreaRepository = new EstacaoAreaRepository();
        const calculateRouterRepository = new CalculateRouterRepository();
        const linhasTrilhosRepository = new LinhasTrilhosRepository();
        const favoritosRepository = new FavoritosRepository();
        const mobileRepository = new MobileRepository();
        const avatarRepository = new AvatarRepository();
        const linhasRepository = new LinhasRepository()

        new Router(new AuthController(userRepository),
            new UserController(userRepository),
            new EstacaoController(estacaoRepository),
            new EstacaoAreaController(estacaoAreaRepository),
            new CalculateRouterController(calculateRouterRepository,
                linhasTrilhosRepository),
            new RouterUserController(routerRepository),
            new FavoritosController(favoritosRepository),
            new ProblemaController(problemaRepository),
            new MobileController(mobileRepository),
            new AvatarController(avatarRepository),
            new LinhasController(linhasRepository))
            .startWith(this.app);
    }

    private initializeStrategies(): void {
        initializeStrategies(passport)
    }

    private listenSocket(): void {
        this.io.on('connection', (socket: any) => {
            console.log('conectado');
            const changeStream = Problema.watch();
            changeStream.on('change', next => {
                console.log('alterou');
                console.log(next.fullDocument);
                let incidente = next.fullDocument;
                socket.emit('incidentes', incidente )
            })

            

            socket.on('sousa', ((msg) => {
                console.log(msg);

            }))

            socket.on('disconnect', () => {

                console.log('disconecteado');
            })
        })

    }

    public getApp(): express.Application {
        return this.app;
    }
}
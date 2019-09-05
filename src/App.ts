import * as express from 'express'
import * as bodyParser from 'body-parser';
import { Server, createServer } from 'http';
import { sequelize } from "./db/sequelize";
import Router from './routes/Router';
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
import { MobileController } from './controllers/MobileController';
import { MobileRepository } from './repository/MobileRepository';
import { AvatarRepository } from './repository/AvatarRepository';
import { AvatarController } from './controllers/AvatarController';
import * as socketio from 'socket.io'
import { LinhasRepository } from './repository/LinhasRepository';
import { LinhasController } from './controllers/LinhasController';
import ProblemaReal from './model/ProblemaReal';


export const Passport = passport;
export const Socket = socketio;

export class App {

    public static readonly PORT: number = 3000;
    private app: express.Application;
    private port: string | number;
    private server: Server;
    public auth;
    private io: SocketIO.Server;

    constructor() {
        this.createApp();
        this.config();
        this.createServer();
        this.initializeStrategies();
        this.middleware();
        this.listen();
        this.socketConnect();
        new Database();

    }

    private async listen() {
        try {
            await sequelize.sync({ force: false })

            this.server.listen(this.port, () => {
                console.log('Running server on port %s', this.port);
                this.io.on('connect', (socket: any) => {
                    console.log("se pa foi")

                    
                    const changeStream = ProblemaReal.watch();
                    changeStream.on('change', next => {
                        let data_incidente = next.fullDocument.horario_ocorrencia
                        console.log(data_incidente)
                        socket.emit('incidentes', next.fullDocument)
                        
                    })

                    const geral = ProblemaReal.aggregate([
                        {
                            $lookup: 
                                {
                                    from: "linhas",
                                    localField: "linha_problema",
                                    foreignField: "nome",
                                    as: "localizacao"
                                }
                        }
                    ])

                    console.log(geral)

                    socket.on('sousa', ((msg) => {
                        console.log(msg)
                    }))
                })
            });
        } catch (e) {
            console.log("FATAL ERROR: COULD NOT CONNECT TO DATABASE.");
            console.log("ERROR:" + e);
        }
    }

    private socketConnect(): void {
        this.io = socketio(this.server)
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

    public getApp(): express.Application {
        return this.app;
    }
}
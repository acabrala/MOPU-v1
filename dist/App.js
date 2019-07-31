"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const http_1 = require("http");
const sequelize_1 = require("./db/sequelize");
const Router_1 = require("./routes/Router");
const io = require("socket.io");
const passport = require("passport");
const AuthController_1 = require("./controllers/AuthController");
const UserRepository_1 = require("./repository/UserRepository");
const UserController_1 = require("./controllers/UserController");
const EstacaoController_1 = require("./controllers/EstacaoController");
const EstacaoRepository_1 = require("./repository/EstacaoRepository");
const EstacaoAreaController_1 = require("./controllers/EstacaoAreaController");
const EstacaoAreaRepository_1 = require("./repository/EstacaoAreaRepository");
const LinhasTrilhosRepository_1 = require("./repository/LinhasTrilhosRepository");
const CalculateRouterController_1 = require("./controllers/CalculateRouterController");
const CalculateRouterRepository_1 = require("./repository/CalculateRouterRepository");
const FavoritosRepository_1 = require("./repository/FavoritosRepository");
const _initialize_1 = require("./middleware/-initialize");
const Database_1 = require("./db/Database");
const RouterUserController_1 = require("./controllers/RouterUserController");
const RouterRepository_1 = require("./repository/RouterRepository");
const FavoritosController_1 = require("./controllers/FavoritosController");
const ProblemaRepository_1 = require("./repository/ProblemaRepository");
const ProblemaController_1 = require("./controllers/ProblemaController");
const Problema_1 = require("./model/Problema");
const MobileController_1 = require("./controllers/MobileController");
const MobileRepository_1 = require("./repository/MobileRepository");
const AvatarRepository_1 = require("./repository/AvatarRepository");
const AvatarController_1 = require("./controllers/AvatarController");
const socket_1 = require("./middleware/socket");
const socketio = require("socket.io");
const changeStream = Problema_1.default.watch();
changeStream.on('change', next => {
    console.log('alterou');
    console.log(next.fullDocument);
});
// import { BilheteRepository } from './repository/BilheteRepository';
// import { BilheteController } from './controllers/BilheteController';
exports.Passport = passport;
exports.Socket = socketio;
class App {
    constructor() {
        this.createApp();
        this.config();
        this.createServer();
        this.initializeStrategies();
        this.middleware();
        this.listen();
        this.socketConnect();
        this.listenSocket();
        new Database_1.Database();
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield sequelize_1.sequelize.sync({ force: false });
                this.server.listen(this.port, () => {
                    console.log('Running server on port %s', this.port);
                    const io = socketio(this.server);
                    new socket_1.SocketConnection(io);
                });
            }
            catch (e) {
                console.log("FATAL ERROR: COULD NOT CONNECT TO DATABASE.");
                console.log("ERROR:" + e);
            }
        });
    }
    socketConnect() {
        this.io = io(this.server);
    }
    createApp() {
        this.app = express();
    }
    config() {
        this.port = process.env.PORT || App.PORT;
    }
    createServer() {
        this.server = http_1.createServer(this.app);
    }
    middleware() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        const routerRepository = new RouterRepository_1.RouterRepository();
        const problemaRepository = new ProblemaRepository_1.ProblemaRepositoty();
        const userRepository = new UserRepository_1.UserRepository();
        const estacaoRepository = new EstacaoRepository_1.EstacaoRepository();
        const estacaoAreaRepository = new EstacaoAreaRepository_1.EstacaoAreaRepository();
        const calculateRouterRepository = new CalculateRouterRepository_1.CalculateRouterRepository();
        const linhasTrilhosRepository = new LinhasTrilhosRepository_1.LinhasTrilhosRepository();
        const favoritosRepository = new FavoritosRepository_1.FavoritosRepository();
        const mobileRepository = new MobileRepository_1.MobileRepository();
        const avatarRepository = new AvatarRepository_1.AvatarRepository();
        new Router_1.default(new AuthController_1.AuthController(userRepository), new UserController_1.UserController(userRepository), new EstacaoController_1.EstacaoController(estacaoRepository), new EstacaoAreaController_1.EstacaoAreaController(estacaoAreaRepository), new CalculateRouterController_1.CalculateRouterController(calculateRouterRepository, linhasTrilhosRepository), new RouterUserController_1.RouterUserController(routerRepository), new FavoritosController_1.FavoritosController(favoritosRepository), new ProblemaController_1.ProblemaController(problemaRepository), new MobileController_1.MobileController(mobileRepository), new AvatarController_1.AvatarController(avatarRepository))
            .startWith(this.app);
    }
    initializeStrategies() {
        _initialize_1.initializeStrategies(passport);
    }
    listenSocket() {
        this.io.on('connection', (socket) => {
            console.log('conectado');
            socket.on('sousa', ((msg) => {
                console.log(msg);
            }));
            socket.on('disconnect', () => {
                console.log('disconecteado');
            });
        });
    }
    getApp() {
        return this.app;
    }
}
App.PORT = 3000;
exports.App = App;
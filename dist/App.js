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
const MobileController_1 = require("./controllers/MobileController");
const MobileRepository_1 = require("./repository/MobileRepository");
const AvatarRepository_1 = require("./repository/AvatarRepository");
const AvatarController_1 = require("./controllers/AvatarController");
const socketio = require("socket.io");
const LinhasRepository_1 = require("./repository/LinhasRepository");
const LinhasController_1 = require("./controllers/LinhasController");
const ProblemaReal_1 = require("./model/ProblemaReal");
const LogsInteraction_1 = require("./model/LogsInteraction");
const LogsInteracao_1 = require("./model/LogsInteracao");
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
        new Database_1.Database();
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield sequelize_1.sequelize.sync({ force: false });
                this.server.listen(this.port, () => {
                    console.log('Running server on port %s', this.port);
                    this.io.on('connect', (socket) => {
                        const changeStream = ProblemaReal_1.default.watch();
                        changeStream.on('change', next => {
                            let data_incidente = next.fullDocument.horario_ocorrencia;
                            socket.emit('incidentes', next.fullDocument);
                        });
                        geral();
                        function geral() {
                            return __awaiter(this, void 0, void 0, function* () {
                                const teste = yield ProblemaReal_1.default.aggregate([
                                    {
                                        $lookup: {
                                            from: "linhas",
                                            localField: "local_problema",
                                            foreignField: "nome",
                                            as: "localizacao"
                                        }
                                    }
                                ]);
                                socket.emit('incidentes-geral', teste);
                            });
                        }
                        socket.on('votacao', (msg) => {
                            votar(msg);
                        });
                        socket.on('verificar-votacao', (user) => __awaiter(this, void 0, void 0, function* () {
                            const teste = yield ProblemaReal_1.default.aggregate([
                                {
                                    $lookup: {
                                        from: "linhas",
                                        localField: "local_problema",
                                        foreignField: "nome",
                                        as: "localizacao"
                                    }
                                }
                            ]);
                            const ids = teste.map(item => {
                                return item._id;
                            });
                            vaaai(user, ids);
                            //socket.emit(user, parameters)
                        }));
                        function vaaai(id, ids) {
                            return __awaiter(this, void 0, void 0, function* () {
                                let teste2 = yield LogsInteraction_1.default.find({ id_usuario: { $in: [id] }, id_incidente: { $in: ids } });
                                socket.emit(id, teste2);
                            });
                        }
                        function votar(id) {
                            return __awaiter(this, void 0, void 0, function* () {
                                const aaa = yield ProblemaReal_1.default.find({ _id: (id.id_incidente) });
                                const newLength = aaa[0]['quantidade_relatada'] + 1;
                                const iteracao = ProblemaReal_1.default.update({ _id: (id.id_incidente) }, { $set: { quantidade_relatada: newLength } });
                                const user_interaction = {
                                    id_usuario: id.id_user,
                                    id_incidente: id.id_incidente,
                                    data_interacao: new Date,
                                    like: id.like
                                };
                                LogsInteraction_1.default.create(user_interaction);
                                LogsInteracao_1.LogsInteracao.create(user_interaction);
                            });
                        }
                        socket.on('sousa', ((msg) => {
                            console.log(msg);
                        }));
                    });
                });
            }
            catch (e) {
                console.log("FATAL ERROR: COULD NOT CONNECT TO DATABASE.");
                console.log("ERROR:" + e);
            }
        });
    }
    socketConnect() {
        this.io = socketio(this.server);
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
        const linhasRepository = new LinhasRepository_1.LinhasRepository();
        new Router_1.default(new AuthController_1.AuthController(userRepository), new UserController_1.UserController(userRepository), new EstacaoController_1.EstacaoController(estacaoRepository), new EstacaoAreaController_1.EstacaoAreaController(estacaoAreaRepository), new CalculateRouterController_1.CalculateRouterController(calculateRouterRepository, linhasTrilhosRepository), new RouterUserController_1.RouterUserController(routerRepository), new FavoritosController_1.FavoritosController(favoritosRepository), new ProblemaController_1.ProblemaController(problemaRepository), new MobileController_1.MobileController(mobileRepository), new AvatarController_1.AvatarController(avatarRepository), new LinhasController_1.LinhasController(linhasRepository))
            .startWith(this.app);
    }
    initializeStrategies() {
        _initialize_1.initializeStrategies(passport);
    }
    getApp() {
        return this.app;
    }
}
App.PORT = 3000;
exports.App = App;

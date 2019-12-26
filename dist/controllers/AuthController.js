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
const Response_1 = require("../model/Response");
const dateformat = require("dateformat");
const LinhasRotas_1 = require("../model/LinhasRotas");
const DiasRotas_1 = require("../model/DiasRotas");
const DescricaoRotas_1 = require("../model/DescricaoRotas");
const uuid = require("uuid/v4");
class AuthController {
    constructor(userRepository) {
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.body.email == null) {
                    console.log("sousa");
                    return res.json({ anonimo: true,
                        id_anonimo: uuid() });
                }
                console.log(req.body);
                const user = yield this.userRepository.getUserByEmail(req.body);
                if (user == null) {
                    return res.status(227).json(new Response_1.Response(true, "Usuario não localizado em nosso banco de dados", null));
                }
                const isValid = yield user.isValidPassword(req.body.senha);
                if (!isValid) {
                    return res.status(228).json(new Response_1.Response(true, "Senha invalida e/ou e-mail inválido", null));
                }
                const routers = yield this.userRepository.getUserData(user.dataValues.id_user, LinhasRotas_1.LinesRoutes, DiasRotas_1.RoutesDay, DescricaoRotas_1.RoutesDescriptions);
                delete user.dataValues.senha;
                delete user.dataValues.data_criacao;
                const token = user.generateAuthToken();
                const dataNascimento = dateformat(user.data_nascimento, "dd/mm/yyyy");
                user.dataValues.data_nascimento = dataNascimento;
                user.dataValues['rota'] = routers;
                return res.status(200)
                    .header({ "x-auth-token": token })
                    .json(new Response_1.Response(false, "Usuario logado com sucesso", user));
            }
            catch (e) {
                console.log(e);
                return res.status(422).json(new Response_1.Response(true, e.message, null));
            }
        });
        this.getFacebookUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const usuario = yield this.userRepository.alreadyHasFacebookAccount(req.user);
                if (usuario) {
                    const token = usuario.generateAuthToken();
                    const routers = yield this.userRepository.getUserData(usuario.dataValues.id_user, LinhasRotas_1.LinesRoutes, DiasRotas_1.RoutesDay, DescricaoRotas_1.RoutesDescriptions);
                    delete usuario.dataValues.senha;
                    delete usuario.dataValues.data_criacao;
                    const dataNascimento = dateformat(usuario.data_nascimento, "dd/mm/yyyy");
                    usuario.dataValues.data_nascimento = dataNascimento;
                    usuario.dataValues['rota'] = routers;
                    res.status(200)
                        .header({ "x-auth-token": token })
                        .json(new Response_1.Response(false, "Usuario logado com sucesso", usuario));
                }
            }
            catch (e) {
            }
        });
        this.getTwitterUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield this.userRepository.alreadyHasTwitterAccount(req.user);
                if (user) {
                    const token = user.generateAuthToken();
                    const routers = yield this.userRepository.getUserData(user.dataValues.id_user, LinhasRotas_1.LinesRoutes, DiasRotas_1.RoutesDay, DescricaoRotas_1.RoutesDescriptions);
                    delete user.dataValues.senha;
                    delete user.dataValues.data_criacao;
                    const dataNascimento = dateformat(user.data_nascimento, "dd/mm/yyyy");
                    user.dataValues.data_nascimento = dataNascimento;
                    user.dataValues['rota'] = routers;
                    res.status(200)
                        .header({ "x-auth-header": token })
                        .json(new Response_1.Response(false, 'Usuario logado com sucesso', user));
                }
            }
            catch (e) {
            }
        });
        this.getGoogleUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let usuario = yield this.userRepository.alreadyHasGoogleAccount(req.user);
                if (usuario) {
                    const token = usuario.generateAuthToken();
                    const routers = yield this.userRepository.getUserData(usuario.dataValues.id_user, LinhasRotas_1.LinesRoutes, DiasRotas_1.RoutesDay, DescricaoRotas_1.RoutesDescriptions);
                    delete usuario.dataValues.senha;
                    delete usuario.dataValues.data_criacao;
                    const dataNascimento = dateformat(usuario.data_nascimento, "dd/mm/yyyy");
                    usuario.dataValues.data_nascimento = dataNascimento;
                    usuario.dataValues['rota'] = routers;
                    res.status(200)
                        .header({ "x-auth-token": token })
                        .json(new Response_1.Response(false, "Usuario logado com sucesso", usuario));
                }
            }
            catch (e) {
            }
        });
        this.userRepository = userRepository;
    }
}
exports.AuthController = AuthController;

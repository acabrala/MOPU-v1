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
const User_1 = require("../model/User");
const sequelize_1 = require("sequelize");
const Rotas_1 = require("../model/Rotas");
const mail_1 = require("../services/mail");
const crypto = require("crypto");
const Favoritos_1 = require("../model/Favoritos");
let dias_semana = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'];
class UserRepository {
    constructor() {
        this.alreadyHasGoogleAccount = (authUser) => __awaiter(this, void 0, void 0, function* () {
            let id = authUser.id_user;
            authUser.senha = '123456';
            console.log(authUser);
            let user = yield User_1.User.findOne({
                where: {
                    [sequelize_1.Op.and]: [
                        { id_user: id },
                        { is_google: true }
                    ]
                },
                include: [Favoritos_1.Favoritos]
            });
            if (user) {
                return user;
            }
            else {
                return yield User_1.User.create(authUser);
            }
        });
        this.alreadyHasTwitterAccount = (authUser) => __awaiter(this, void 0, void 0, function* () {
            let id = authUser.id_user;
            authUser.senha = '123456';
            let user = yield User_1.User.findOne({
                where: {
                    [sequelize_1.Op.and]: [
                        { id_user: id },
                        { is_twitter: true }
                    ]
                },
                include: [Favoritos_1.Favoritos]
            });
            if (user) {
                return user;
            }
            else {
                return yield User_1.User.create(authUser);
            }
        });
        this.alreadyHasFacebookAccount = (authUser) => __awaiter(this, void 0, void 0, function* () {
            let id = authUser.id_user;
            authUser.senha = '123456';
            let user = yield User_1.User.findOne({
                where: {
                    [sequelize_1.Op.and]: [
                        { id_user: id },
                        { is_facebook: true }
                    ],
                },
                include: [Favoritos_1.Favoritos]
            });
            if (user) {
                return user;
            }
            else {
                return yield User_1.User.create(authUser);
            }
        });
        this.createUser = (user) => __awaiter(this, void 0, void 0, function* () {
            let email = user.email.toLowerCase();
            delete user.email;
            user.email = email;
            console.log(email);
            return yield User_1.User.create(user);
        });
        this.updateUser = (user) => __awaiter(this, void 0, void 0, function* () {
            console.log(user);
            let id_user = user.id_user;
            return yield User_1.User.update(user, {
                where: { id_user: id_user }
            });
        });
        this.updatePassword = (user) => __awaiter(this, void 0, void 0, function* () {
            let newPass = user.nova_senha;
            let idUser = user.id;
            return yield User_1.User.update({ senha: newPass }, { where: { id: idUser } });
        });
        this.getUserById = (id) => __awaiter(this, void 0, void 0, function* () {
            let idUser = id.id;
            return yield User_1.User.findById(idUser);
        });
        this.getUserByEmail = (usuario) => __awaiter(this, void 0, void 0, function* () {
            let emailUser = usuario.email.toLowerCase();
            console.log(emailUser);
            console.log(typeof emailUser);
            return yield User_1.User.findOne({
                where: { email: emailUser },
                include: [Favoritos_1.Favoritos]
            });
        });
        this.getUserData = (id, Rotas_linhas, Rotas_dias, Rotas_descricao) => __awaiter(this, void 0, void 0, function* () {
            let rotas_user = Rotas_1.Routes.findAll({
                where: { id_usuario: id },
                include: [Rotas_descricao, Rotas_dias, Rotas_linhas]
            }).then((result) => {
                let stringRt = JSON.stringify(result);
                let naosei = JSON.parse(stringRt);
                let naoseimesmo = naosei.map((naoseiresult, index) => {
                    let naoseimaiserio = {};
                    let naoseiresultcomsortemap = naoseiresult.dias_rota.sort((a, b) => {
                        return a.id - b.id;
                    }).map((teste, indice) => {
                        if (teste.weekday == 0) {
                            teste[dias_semana[indice]] = false;
                        }
                        else {
                            teste[dias_semana[indice]] = true;
                        }
                        return teste;
                    }).map((seraquevai, index) => {
                        naoseimaiserio[dias_semana[index]] = seraquevai[dias_semana[index]];
                        naoseimaiserio['id_rota'] = seraquevai.id_rota;
                    });
                    return naoseimaiserio;
                });
                for (let k = 0; k < result.length; k++) {
                    result[k].dataValues.dias_rota = naoseimesmo[k];
                }
                return result;
            });
            return yield rotas_user;
        });
        this.resetPassword = (email) => __awaiter(this, void 0, void 0, function* () {
            return User_1.User.findOne({ where: { email: email.email } })
                .then((result) => {
                if (result) {
                    let code = Math.floor(Math.random() * 10000000).toString().substring(1);
                    let user = result.dataValues;
                    user.code = code;
                    return User_1.User.update(user, {
                        where: {
                            id: user.id
                        }
                    }).then((changed) => {
                        if (changed) {
                            mail_1.default.to = email.email;
                            mail_1.default.subject = "Redefinição de Senha";
                            mail_1.default.message = `Mais o ${code}`;
                            let result = mail_1.default.sendMail();
                        }
                        return "deu certo";
                    }).catch((err) => {
                    });
                }
            }).catch((err) => {
                return "Não Localizamos seu cadastro, verifique o e-mail e tente novamente";
            });
        });
        this.verifyUserCode = (email, code) => __awaiter(this, void 0, void 0, function* () {
            let tokenPassReset = crypto.randomBytes(32).toString('hex');
            return User_1.User.findOne({ where: { email: email } })
                .then((user) => {
                if (user.code === code) {
                    let usuario = user.dataValues;
                    usuario.password_reset_token = tokenPassReset;
                    return User_1.User.update(usuario, {
                        where: { id: user.id }
                    }).then((result) => {
                        let responseSucess = {
                            error: true,
                            message: "Código digitado válido",
                            data: { password_token: tokenPassReset }
                        };
                        return Promise.resolve(responseSucess);
                    }).catch((err) => {
                        return "Não localizamos este e-mail";
                    });
                }
                else {
                    let response = {
                        error: true,
                        message: "Código digitado inválido, verifique e tente novamente",
                        data: null
                    };
                    return response;
                }
            }).catch((error) => {
                return;
            });
        });
        this.changePasswordUser = (email, newPassword, passwordToken) => __awaiter(this, void 0, void 0, function* () {
            return User_1.User.findOne({ where: { email: email } })
                .then((user) => {
                if (user) {
                    if (user.password_reset_token === passwordToken) {
                        let usuario = user.dataValues;
                        usuario.senha = newPassword;
                        return User_1.User.update(usuario, { where: { id: usuario.id } })
                            .then((user) => {
                            return "Senha Alterada com sucesso";
                        }).catch((error) => {
                        });
                    }
                    else {
                        return "Token inválido";
                    }
                }
            }).catch((err) => {
                return "usário não localizado";
            });
        });
    }
}
exports.UserRepository = UserRepository;

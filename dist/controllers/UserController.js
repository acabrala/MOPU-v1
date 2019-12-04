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
class UserController {
    constructor(userRepository) {
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('oba, chegou');
                const isUSer = yield this.userRepository.getUserByEmail(req.body);
                if (isUSer) {
                    console.log('deu aqui');
                    return res.status(229).json(new Response_1.Response(false, "Email já está sendo utlizado.", false));
                }
                req.body.email.toLowerCase();
                console.log(req.body.email);
                const user = yield this.userRepository.createUser(req.body);
                res.status(201).json(new Response_1.Response(false, "Usuário criado com sucesso.", user));
            }
            catch (e) {
                return res.status(422).json(new Response_1.Response(true, e.message, null));
            }
        });
        this.changePasswordUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.getUserById(req.body);
                if (!user) {
                    res.status(227).json(new Response_1.Response(true, "Usuário não localizado", null));
                }
                const isValid = yield user.isValidPassword(req.body.senha);
                if (!isValid) {
                    res.status(228).json(new Response_1.Response(true, "Senha atual informada invalida", null));
                }
                const newPass = yield user.changePassword(req.body.new_password);
                let userUpdate = {
                    nova_senha: newPass,
                    id: req.body.id
                };
                const updatePass = yield this.userRepository.updatePassword(userUpdate);
                if (updatePass) {
                    res.status(201).json(new Response_1.Response(false, "Senha alterada com sucesso", null));
                }
            }
            catch (e) {
                res.status(422).json(new Response_1.Response(true, e.message, false));
            }
        });
        // getUser = async (req, res) => {
        //     console.log(req.body)
        //     try {
        //         const user = await User.findOne({ where: { email: req.body.email } })
        //         if(!user) {
        //             return res.status(204).json(new Response(true,"Usuario nao encontrado em nosso banco de dados.", null));
        //         }
        //         const isValid = await user.isValidPassword(req.body.senha);
        //         if(!isValid) {
        //             return res.status(422).json(new Response(true,"Senha invalida.", null));
        //         }
        //         const token = user.generateAuthToken();
        //         delete user.senha
        //         console.log(user);
        //         return res.status(200)
        //                     .header({"x-auth-token": token})
        //                     .json(new Response(false,"Usuario logado com sucesso.", user));
        //     } catch(e) {
        //         return res.status(422).json(new Response(true, null, e.message));
        //     }
        // }
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield this.userRepository.updateUser(req.body);
                if (!user) {
                    return res.status(227).json(new Response_1.Response(true, "Usuário não localizado em nosso banco de dados.", null));
                }
                res.status(201).json(new Response_1.Response(false, "Usuario atualizado com sucesso.", user));
            }
            catch (e) {
                return res.status(422).json(new Response_1.Response(true, null, e.message));
            }
        });
        this.forgotUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let pass = yield this.userRepository.resetPassword(req.body);
                if (pass == null) {
                    console.log(pass);
                    res.status(227).json(new Response_1.Response(true, 'Não localizamos seu e-mail', null));
                }
                res.status(200).json(new Response_1.Response(false, "E-mail com orientações para alterar senha encaminhado com sucesso", null));
            }
            catch (e) {
                res.status(400).json(new Response_1.Response(true, e.message, null));
            }
        });
        this.verifyToken = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let email = req.body.email;
                let code = req.body.code;
                let usuario = yield this.userRepository.verifyUserCode(email, code);
                if (!usuario) {
                    return res.status(227).json(new Response_1.Response(true, "Não localizamos seu cadastro", false));
                }
                res.status(200).json(usuario);
            }
            catch (e) {
                res.status(400).json(new Response_1.Response(true, e.message, null));
            }
        });
        this.resetPassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let email = req.body.email;
                let passToken = req.body.password_token;
                let newPassword = req.body.new_password;
                const usuario = yield this.userRepository.getUserByEmail(req.body);
                if (!usuario) {
                    res.status(227).json(new Response_1.Response(true, "Não conseguimos localizar o usuário", false));
                }
                let newPass = yield usuario.changePassword(newPassword);
                if (!newPass) {
                    res.status(422).json(new Response_1.Response(true, "Erro ao criptografar nova senha", false));
                }
                let changeded = yield this.userRepository.changePasswordUser(email, newPass, passToken);
                if (!changeded) {
                    res.status(422).json(new Response_1.Response(true, "Erro ao atualizar senha do usuário", false));
                }
                res.status(201).json(new Response_1.Response(false, "Senha Alterada com sucesso", false));
            }
            catch (e) {
                res.status(422).json(new Response_1.Response(true, e.message, false));
            }
        });
        this.userRepository = userRepository;
    }
}
exports.UserController = UserController;

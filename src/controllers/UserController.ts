import { User } from "../model/User";
import { Response } from "../model/Response";
import * as jwt from 'jwt-simple';
import { UserRepository } from '../repository/UserRepository'


export class UserController {

    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    createUser = async (req, res) => {
        try {
            console.log('oba, chegou')

            const isUSer = await this.userRepository.getUserByEmail(req.body)

            if (isUSer) {
                return res.status(229).json(new Response(false, "Email já está sendo utlizado.", false))
            }
            const user = await this.userRepository.createUser(req.body)
            res.status(201).json(new Response(false, "Usuário criado com sucesso.", user));
        } catch (e) {
            return res.status(422).json(new Response(true, e.message, null));
        }
    }

    changePasswordUser = async (req, res) => {
        try {

            const user = await this.userRepository.getUserById(req.body)

            if (!user) {

                res.status(227).json(new Response(true, "Usuário não localizado", null))

            }

            const isValid = await user.isValidPassword(req.body.senha)

            if (!isValid) {

                res.status(228).json(new Response(true, "Senha atual informada invalida", null))
            }

            const newPass = await user.changePassword(req.body.new_password)

            let userUpdate = {
                nova_senha: newPass,
                id: req.body.id
            }

            const updatePass = await this.userRepository.updatePassword(userUpdate)
            if (updatePass) {
                res.status(201).json(new Response(false, "Senha alterada com sucesso", null))
            }

        } catch (e) {

            res.status(422).json(new Response(true, e.message, false))

        }
    }

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

    updateUser = async (req, res) => {
        try {

            let user = await this.userRepository.updateUser(req.body)

            if (!user) {
                return res.status(227).json(new Response(true, "Usuário não localizado em nosso banco de dados.", null));

            }

            res.status(201).json(new Response(false, "Usuario atualizado com sucesso.", user));
        } catch (e) {

            return res.status(422).json(new Response(true, null, e.message))

        }
    }

    forgotUser = async (req, res) => {
        try {
            let pass = await this.userRepository.resetPassword(req.body)

            if (pass == null) {
                console.log(pass);

                res.status(227).json(new Response(true, 'Não localizamos seu e-mail', null))
            }

            res.status(200).json(new Response(false, "E-mail com orientações para alterar senha encaminhado com sucesso", null))
        } catch (e) {
            res.status(400).json(new Response(true, e.message, null))
        }
    }

    verifyToken = async (req, res) => {
        try {
            let email = req.body.email;
            let code = req.body.code;

            let usuario = await this.userRepository.verifyUserCode(email, code)
            if (!usuario) {
                return res.status(227).json(new Response(true, "Não localizamos seu cadastro", false))
            }

            res.status(200).json(usuario)
        } catch (e) {
            res.status(400).json(new Response(true, e.message, null))
        }
    }

    resetPassword = async (req, res) => {
        try {
            let email = req.body.email;
            let passToken = req.body.password_token;
            let newPassword = req.body.new_password;

            const usuario = await this.userRepository.getUserByEmail(req.body)
            if (!usuario) {
                res.status(227).json(new Response(true, "Não conseguimos localizar o usuário", false))
            }

            let newPass = await usuario.changePassword(newPassword)

            if (!newPass) {
                res.status(422).json(new Response(true, "Erro ao criptografar nova senha", false))
            }

            let changeded = await this.userRepository.changePasswordUser(email, newPass, passToken)

            if (!changeded) {

                res.status(422).json(new Response(true, "Erro ao atualizar senha do usuário", false))

            }

            res.status(201).json(new Response(false, "Senha Alterada com sucesso", false))

        } catch (e) {

            res.status(422).json(new Response(true, e.message, false))

        }
    }


}


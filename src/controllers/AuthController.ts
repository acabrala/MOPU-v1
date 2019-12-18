import { UserRepository } from "../repository/UserRepository";
import { User } from "../model/User";
import { Response } from "../model/Response";
import { Passport } from '../App'
import * as dateformat from 'dateformat'
import { Routes } from "../model/Rotas";
import { LinesRoutes } from "../model/LinhasRotas";
import { RoutesDay } from "../model/DiasRotas";
import { RoutesDescriptions } from "../model/DescricaoRotas";
import * as  uuid from 'uuid/v4';

export class AuthController {

    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    getUser = async (req, res) => {

        try {    
            
            if(req.body.email == null){
                console.log("sousa")
               return res.json({anonimo: true,
                                id_anonimo: uuid()})
            }
            const user = await this.userRepository.getUserByEmail(req.body)
            
            
            if (user == null) {
                
                return res.status(227).json(new Response(true, "Usuario não localizado em nosso banco de dados", null))
            }

            const isValid = await user.isValidPassword(req.body.senha)

            if (!isValid) {

                return res.status(228).json(new Response(true, "Senha invalida e/ou e-mail inválido", null))
            }

            const routers = await this.userRepository.getUserData(user.dataValues.id_user, LinesRoutes, RoutesDay, RoutesDescriptions)

            delete user.dataValues.senha
            delete user.dataValues.data_criacao

            const token = user.generateAuthToken();
            const dataNascimento = dateformat(user.data_nascimento, "dd/mm/yyyy")
            user.dataValues.data_nascimento = dataNascimento
            user.dataValues['rota'] = routers
            
            return res.status(200)
                .header({ "x-auth-token": token })
                .json(new Response(false, "Usuario logado com sucesso", user))
        } catch (e) {
            console.log(e);
            
            return res.status(422).json(new Response(true, e.message, null))
        }
    }

    getFacebookUser = async (req, res) => {

        try {
            const usuario = await this.userRepository.alreadyHasFacebookAccount(req.user)

            if (usuario) {
                const token = usuario.generateAuthToken();

            const routers = await this.userRepository.getUserData(usuario.dataValues.id_user, LinesRoutes, RoutesDay, RoutesDescriptions)
    
            delete usuario.dataValues.senha
            delete usuario.dataValues.data_criacao

            const dataNascimento = dateformat(usuario.data_nascimento, "dd/mm/yyyy")
            usuario.dataValues.data_nascimento = dataNascimento
            usuario.dataValues['rota'] = routers

                res.status(200)
                    .header({ "x-auth-token": token })
                    .json(new Response(false, "Usuario logado com sucesso", usuario))
            }

        } catch (e) {

        }
    }

    getTwitterUser = async (req, res) => {

        try {
            let user = await this.userRepository.alreadyHasTwitterAccount(req.user)

            if (user) {

                const token = user.generateAuthToken();

                const routers = await this.userRepository.getUserData(user.dataValues.id_user, LinesRoutes, RoutesDay, RoutesDescriptions)

                delete user.dataValues.senha
                delete user.dataValues.data_criacao
    
                const dataNascimento = dateformat(user.data_nascimento, "dd/mm/yyyy")
                user.dataValues.data_nascimento = dataNascimento
                user.dataValues['rota'] = routers

                res.status(200)
                    .header({ "x-auth-header": token })
                    .json(new Response(false, 'Usuario logado com sucesso', user))

            }
        } catch (e) {

        }

    }

    getGoogleUser = async (req, res) => {
        try {
            let usuario = await this.userRepository.alreadyHasGoogleAccount(req.user)

            if (usuario) {

            const token = usuario.generateAuthToken();
            const routers = await this.userRepository.getUserData(usuario.dataValues.id_user, LinesRoutes, RoutesDay, RoutesDescriptions)
    
            delete usuario.dataValues.senha
            delete usuario.dataValues.data_criacao

            const dataNascimento = dateformat(usuario.data_nascimento, "dd/mm/yyyy")
            usuario.dataValues.data_nascimento = dataNascimento
            usuario.dataValues['rota'] = routers

                res.status(200)
                    .header({ "x-auth-token": token })
                    .json(new Response(false, "Usuario logado com sucesso", usuario))

            }
        } catch (e) {

        }
    }
}

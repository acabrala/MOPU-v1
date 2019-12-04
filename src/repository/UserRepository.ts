import { User } from "../model/User";
import { Op } from "sequelize";
import { Routes } from "../model/Rotas";
import Mail from "../services/mail";
import * as crypto from 'crypto';
import { Favoritos } from "../model/Favoritos";


let dias_semana = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo']



export class UserRepository {

    alreadyHasGoogleAccount = async (authUser) => {
        let id = authUser.id_user
        authUser.senha = '123456'
        console.log(authUser);

        let user = await User.findOne({
            where: {
                [Op.and]: [
                    { id_user: id },
                    { is_google: true }
                ]
            },
            include: [Favoritos]
        })

        if (user) {

            return user;

        } else {

            return await User.create(authUser)
        }
    }

    alreadyHasTwitterAccount = async (authUser) => {

        let id = authUser.id_user
        authUser.senha = '123456'

        let user = await User.findOne({
            where: {
                [Op.and]: [
                    { id_user: id },
                    { is_twitter: true }
                ]
            },
            include: [Favoritos]
        })
        if (user) {
            return user;
        } else {
            return await User.create(authUser);
        }
    }

    alreadyHasFacebookAccount = async (authUser) => {

        let id = authUser.id_user
        authUser.senha = '123456'

        let user = await User.findOne({
            where: {
                [Op.and]: [
                    { id_user: id },
                    { is_facebook: true }
                ],
            
            },
            include: [Favoritos]
        })

        if (user) {
            return user;
        } else {
            return await User.create(authUser)

        }
    }

    createUser = async (user) => {
        let email = user.email.toLowerCase();
        delete user.email
        user.email = email
        console.log(email)
        return await User.create(user);
    }

    updateUser = async (user) => {
        console.log(user)
    let id_user = user.id_user
        return await User.update(user, {
            where: { id_user:id_user }
        });
    }
    updatePassword = async (user) => {

        let newPass = user.nova_senha;
        let idUser = user.id

        return await User.update({ senha: newPass }, { where: { id: idUser } })
    }

    getUserById = async (id) => {
        let idUser = id.id
        return await User.findById(idUser)
    }

    getUserByEmail = async (usuario) => {

        let emailUser = usuario.email.toLowerCase()
        console.log(emailUser)
        console.log(typeof emailUser);
        
        return await User.findOne({
            where: { email: emailUser },
            include: [Favoritos]
        },
        );
    }

    getUserData = async (id, Rotas_linhas, Rotas_dias, Rotas_descricao) => {

        let rotas_user = Routes.findAll({
            where: { id_usuario: id },
            include: [Rotas_descricao, Rotas_dias, Rotas_linhas]
        }).then((result) => {

            let stringRt = JSON.stringify(result)
            let naosei = JSON.parse(stringRt)
            let naoseimesmo = naosei.map((naoseiresult, index) => {
                let naoseimaiserio = {};
                let naoseiresultcomsortemap = naoseiresult.dias_rota.sort((a, b) => {
                    return a.id - b.id
                }).map((teste, indice) => {
                    if (teste.weekday == 0) {
                        teste[dias_semana[indice]] = false
                    } else {
                        teste[dias_semana[indice]] = true
                    }

                    return teste
                }).map((seraquevai, index) => {
                    naoseimaiserio[dias_semana[index]] = seraquevai[dias_semana[index]]
                    naoseimaiserio['id_rota'] = seraquevai.id_rota

                })

                return naoseimaiserio

            })

            for (let k = 0; k < result.length; k++) {
                result[k].dataValues.dias_rota = naoseimesmo[k]
            }

            return result;
        });

        return await rotas_user

    }

    resetPassword = async (email) => {

        return User.findOne({ where: { email: email.email } })
            .then((result) => {

                if (result) {
                    let code = Math.floor(Math.random() * 10000000).toString().substring(1)

                    let user = result.dataValues
                    user.code = code

                    return User.update(user, {
                        where: {
                            id: user.id
                        }
                    }).then((changed) => {

                        if (changed) {

                            Mail.to = email.email
                            Mail.subject = "Redefinição de Senha"
                            Mail.message = `Mais o ${code}`
                            let result = Mail.sendMail();
                        }

                        return "deu certo"
                    }).catch((err) => {

                    })
                }
            }).catch((err) => {
                return "Não Localizamos seu cadastro, verifique o e-mail e tente novamente"
            })
    }

    verifyUserCode = async (email, code) => {

        let tokenPassReset = crypto.randomBytes(32).toString('hex');

        return User.findOne({ where: { email: email } })
            .then((user) => {
                if (user.code === code) {

                    let usuario = user.dataValues
                    usuario.password_reset_token = tokenPassReset

                    return User.update(usuario, {
                        where: { id: user.id }
                    }).then((result) => {

                        let responseSucess = {
                            error: true,
                            message: "Código digitado válido",
                            data: {password_token: tokenPassReset}

                        };

                        return Promise.resolve(responseSucess);

                    }).catch((err) => {
                        return "Não localizamos este e-mail"

                    })
                } else {
                    let response = {
                        error: true,
                        message: "Código digitado inválido, verifique e tente novamente",
                        data: null
                    };

                    return response;
                }
            }).catch((error) => {

                return 
            })
    }

    changePasswordUser = async (email, newPassword, passwordToken) => {


        return User.findOne({ where: { email: email } })
            .then((user) => {
                if (user) {

                    if (user.password_reset_token === passwordToken) {

                        let usuario = user.dataValues;
                        usuario.senha = newPassword

                        return User.update(usuario, { where: { id: usuario.id } })
                            .then((user) => {
                                return "Senha Alterada com sucesso"
                            }).catch((error) => {

                            })
                    } else {
                        return "Token inválido"
                    }
                }
            }).catch((err) => {
                return "usário não localizado";
            })
    }

}
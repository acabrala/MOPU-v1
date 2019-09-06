import { AuthController } from "../controllers/AuthController";
import { UserController } from "../controllers/UserController";
import { EstacaoController } from "../controllers/EstacaoController";
import { EstacaoAreaController } from "../controllers/EstacaoAreaController";
import { CalculateRouterController } from '../controllers/CalculateRouterController';
import authVerify from '../middleware/authverify';
import { Request, Response } from 'express'
import * as passport from 'passport';
import request from "request";
import { RouterUserController } from "../controllers/RouterUserController";
import { FavoritosController } from "../controllers/FavoritosController";
import { ProblemaController } from "../controllers/ProblemaController";
import { MobileController } from "../controllers/MobileController";
import { AvatarController } from "../controllers/AvatarController";
import { LinhasController } from "../controllers/LinhasController";

import { Socket } from '../App'; 

export default class Router {

    private authController: AuthController;
    private userController: UserController;
    private estacaoController: EstacaoController;
    private estacaoAreaController: EstacaoAreaController;
    private calculateRouterController: CalculateRouterController;
    private routerController: RouterUserController;
    private favoritosController: FavoritosController;
    private problemaController: ProblemaController;
    private mobileController: MobileController;
    private avatarController: AvatarController;
    private linhasController: LinhasController;

    private BASE_URL: string = "/api/v1";
    private AUTH_URL: string = this.BASE_URL + "/auth";
    private FACEBOOK_AUTH_URL: string = this.BASE_URL + "/auth/facebook";
    private GOOGLE_AUTH_URL: string = this.BASE_URL + "/auth/google";
    private TWITTER_AUTH_URL: string = this.BASE_URL + "/auth/twitter";
    private UPDATE_USER_URL: string = this.BASE_URL + "/user/update";
    private UPDATE_PASSWORD_URL: string = this.BASE_URL + "/user/update/password";
    private REGISTER_URL: string = this.BASE_URL + "/register";
    private ESTACAO_URL: string = this.BASE_URL + "/estacao";
    private ESTACAO_URL_GET: string = this.BASE_URL + "/estacao/pontos";
    private ESTACAOAREA_URL: string = this.BASE_URL + "/estacao/area";
    private CALCULAR_ROTA_URL: string = this.BASE_URL + "/calcular/rota/:origem/:destino/:data_partida/:data_chegada/:onibus/:metro/:trem/:caminhada"
    private CADASTRAR_ROTA_URL: string = this.BASE_URL + "/cadastro/rota";
    private EXCLUIR_ROTA: string = this.BASE_URL + "/excluir/rota";
    private ATUALIZAR_ROTA: string = this.BASE_URL + "/update/rota";
    private SALVAR_FAVORITO: string = this.BASE_URL + "/cadastro/favorito";
    private DELETAR_FAVORITO: string = this.BASE_URL + "/excluir/favorito";
    private ALTERAR_NOTIFICACAO: string = this.BASE_URL + "/alterar/notificacao";
    private ALTERAR_FAVORITO: string = this.BASE_URL + "/alterar/favorito";
    private RESETAR_SENHA: string = this.BASE_URL + "/alterar/senha";
    private VERIFICAR_CODIGO: string = this.BASE_URL + "/usuario/codigo";
    private ALTERAR_SENHA: string = this.BASE_URL + "/usuario/reset";
    private RELATAR_PROBLEMA: string = this.BASE_URL + "/relatar/problema";
    private GERAR_TERMINAL:string = this.BASE_URL + "/mobile";
    private ATUALIZAR_TERMINAL:string = this.BASE_URL + "/mobile/atualizar";
    private DESCER_AVATAR:string = this.BASE_URL + "/avatares";
    private DESCER_LINHAS:string = this.BASE_URL + "/linhas";
    private PROBLEMAS_USER:string = this.BASE_URL + "/incidentes/usuario";

    constructor(authController: AuthController, userController: UserController,
        estacaoController: EstacaoController, estacaoAreaController: EstacaoAreaController,
        calculateRouterController: CalculateRouterController, routerController: RouterUserController,
        favoritosController: FavoritosController, problemaController: ProblemaController, mobileController: MobileController,
        avatarController: AvatarController, linhasController: LinhasController) {
        this.authController = authController;
        this.userController = userController;
        this.estacaoController = estacaoController;
        this.estacaoAreaController = estacaoAreaController;
        this.calculateRouterController = calculateRouterController;
        this.routerController = routerController;
        this.favoritosController = favoritosController;
        this.problemaController = problemaController;
        this.mobileController = mobileController;
        this.avatarController = avatarController
        this.linhasController = linhasController;
    }

    public startWith(app) {


        //Autenticação Email e Senha e Redes Sociais
        app.route(this.FACEBOOK_AUTH_URL).post(passport.authenticate('facebook-token'), this.authController.getFacebookUser)
        app.route(this.GOOGLE_AUTH_URL).post(passport.authenticate('google-token'), this.authController.getGoogleUser)
        app.route(this.TWITTER_AUTH_URL).post(passport.authenticate('twitter-token'), this.authController.getTwitterUser);
        app.route(this.AUTH_URL).post(passport.authenticate('anonymous'), this.authController.getUser);

        //Reset de senha usuário
        app.route(this.RESETAR_SENHA).put(this.userController.forgotUser);
        app.route(this.VERIFICAR_CODIGO).post(this.userController.verifyToken)
        app.route(this.ALTERAR_SENHA).post(this.userController.resetPassword)


        // REGISTER
        app.route(this.REGISTER_URL).post(this.userController.createUser);

        //ATUALIZACAO USUARIO
        app.route(this.UPDATE_USER_URL).put(this.userController.updateUser)
        app.route(this.UPDATE_PASSWORD_URL).put(this.userController.changePasswordUser)

        //Estacao
        app.route(this.ESTACAO_URL).all(authVerify).post(this.estacaoController.createNewStation);
        app.route(this.ESTACAO_URL_GET).get(this.estacaoController.getStation);
        app.route(this.ESTACAOAREA_URL).post(this.estacaoAreaController.createNewAreaStation);

        //Rotas
        app.route(this.CALCULAR_ROTA_URL).get(this.calculateRouterController.calculateRouterNow);
        app.route(this.CADASTRAR_ROTA_URL).post(this.routerController.createNewRouter);

        //Rotas
        app.route(this.EXCLUIR_ROTA).delete(this.routerController.deleteRouterUser)
        app.route(this.ATUALIZAR_ROTA).patch(this.routerController.updateRouterUser)
        app.route(this.ALTERAR_NOTIFICACAO).patch(this.routerController.changeNotification);

        //Favoritos
        app.route(this.SALVAR_FAVORITO).post(this.favoritosController.createNewFavorites)
        app.route(this.DELETAR_FAVORITO).delete(this.favoritosController.deleteFavorites)
        app.route(this.ALTERAR_FAVORITO).patch(this.favoritosController.updateFavorites)

        //Problemas
        app.route(this.RELATAR_PROBLEMA).post(this.problemaController.createNewProblem)
        app.route(this.PROBLEMAS_USER).post(this.problemaController.getProblemsUser)


        //Mobile
        app.route(this.GERAR_TERMINAL).post(this.mobileController.gerarMobile);
        app.route(this.ATUALIZAR_TERMINAL).patch(this.mobileController.atualizarMobile);
 
        //Avatares
        app.route(this.DESCER_AVATAR).get(this.avatarController.todosAvatar)

        //Linhas
        app.route(this.DESCER_LINHAS).get(this.linhasController.consultarlinhas);
    }
}
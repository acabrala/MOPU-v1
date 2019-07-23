"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authverify_1 = require("../middleware/authverify");
const passport = require("passport");
class Router {
    constructor(authController, userController, estacaoController, estacaoAreaController, calculateRouterController, routerController, favoritosController, problemaController, mobileController, avatarController) {
        this.BASE_URL = "/api/v1";
        this.AUTH_URL = this.BASE_URL + "/auth";
        this.FACEBOOK_AUTH_URL = this.BASE_URL + "/auth/facebook";
        this.GOOGLE_AUTH_URL = this.BASE_URL + "/auth/google";
        this.TWITTER_AUTH_URL = this.BASE_URL + "/auth/twitter";
        this.UPDATE_USER_URL = this.BASE_URL + "/user/update";
        this.UPDATE_PASSWORD_URL = this.BASE_URL + "/user/update/password";
        this.REGISTER_URL = this.BASE_URL + "/register";
        this.ESTACAO_URL = this.BASE_URL + "/estacao";
        this.ESTACAO_URL_GET = this.BASE_URL + "/estacao/pontos";
        this.ESTACAOAREA_URL = this.BASE_URL + "/estacao/area";
        this.CALCULAR_ROTA_URL = this.BASE_URL + "/calcular/rota/:origem/:destino/:data_partida/:data_chegada/:onibus/:metro/:trem/:caminhada";
        this.CADASTRAR_ROTA_URL = this.BASE_URL + "/cadastro/rota";
        this.EXCLUIR_ROTA = this.BASE_URL + "/excluir/rota";
        this.ATUALIZAR_ROTA = this.BASE_URL + "/update/rota";
        this.SALVAR_FAVORITO = this.BASE_URL + "/cadastro/favorito";
        this.DELETAR_FAVORITO = this.BASE_URL + "/excluir/favorito";
        this.ALTERAR_NOTIFICACAO = this.BASE_URL + "/alterar/notificacao";
        this.ALTERAR_FAVORITO = this.BASE_URL + "/alterar/favorito";
        this.RESETAR_SENHA = this.BASE_URL + "/alterar/senha";
        this.VERIFICAR_CODIGO = this.BASE_URL + "/usuario/codigo";
        this.ALTERAR_SENHA = this.BASE_URL + "/usuario/reset";
        this.RELATAR_PROBLEMA = this.BASE_URL + "/relatar/problema";
        this.GERAR_TERMINAL = this.BASE_URL + "/mobile";
        this.ATUALIZAR_TERMINAL = this.BASE_URL + "/mobile/atualizar";
        this.DESCER_AVATAR = this.BASE_URL + "/avatares";
        this.authController = authController;
        this.userController = userController;
        this.estacaoController = estacaoController;
        this.estacaoAreaController = estacaoAreaController;
        this.calculateRouterController = calculateRouterController;
        this.routerController = routerController;
        this.favoritosController = favoritosController;
        this.problemaController = problemaController;
        this.mobileController = mobileController;
        this.avatarController = avatarController;
    }
    startWith(app) {
        //Autenticação Email e Senha e Redes Sociais
        app.route(this.FACEBOOK_AUTH_URL).post(passport.authenticate('facebook-token'), this.authController.getFacebookUser);
        app.route(this.GOOGLE_AUTH_URL).post(passport.authenticate('google-token'), this.authController.getGoogleUser);
        app.route(this.TWITTER_AUTH_URL).post(passport.authenticate('twitter-token'), this.authController.getTwitterUser);
        app.route(this.AUTH_URL).post(passport.authenticate('anonymous'), this.authController.getUser);
        //Reset de senha usuário
        app.route(this.RESETAR_SENHA).put(this.userController.forgotUser);
        app.route(this.VERIFICAR_CODIGO).post(this.userController.verifyToken);
        app.route(this.ALTERAR_SENHA).post(this.userController.resetPassword);
        // REGISTER
        app.route(this.REGISTER_URL).post(this.userController.createUser);
        //ATUALIZACAO USUARIO
        app.route(this.UPDATE_USER_URL).put(this.userController.updateUser);
        app.route(this.UPDATE_PASSWORD_URL).put(this.userController.changePasswordUser);
        //Estacao
        app.route(this.ESTACAO_URL).all(authverify_1.default).post(this.estacaoController.createNewStation);
        app.route(this.ESTACAO_URL_GET).get(this.estacaoController.getStation);
        app.route(this.ESTACAOAREA_URL).post(this.estacaoAreaController.createNewAreaStation);
        //Rotas
        app.route(this.CALCULAR_ROTA_URL).get(this.calculateRouterController.calculateRouterNow);
        app.route(this.CADASTRAR_ROTA_URL).post(this.routerController.createNewRouter);
        //Rotas
        app.route(this.EXCLUIR_ROTA).delete(this.routerController.deleteRouterUser);
        app.route(this.ATUALIZAR_ROTA).patch(this.routerController.updateRouterUser);
        app.route(this.ALTERAR_NOTIFICACAO).patch(this.routerController.changeNotification);
        //Favoritos
        app.route(this.SALVAR_FAVORITO).post(this.favoritosController.createNewFavorites);
        app.route(this.DELETAR_FAVORITO).delete(this.favoritosController.deleteFavorites);
        app.route(this.ALTERAR_FAVORITO).patch(this.favoritosController.updateFavorites);
        //Problemas
        app.route(this.RELATAR_PROBLEMA).post(this.problemaController.createNewProblem);
        //Mobile
        app.route(this.GERAR_TERMINAL).post(this.mobileController.gerarMobile);
        app.route(this.ATUALIZAR_TERMINAL).patch(this.mobileController.atualizarMobile);
        //Avatares
        app.route(this.DESCER_AVATAR).get(this.avatarController.todosAvatar);
    }
}
exports.default = Router;

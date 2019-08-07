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
class RouterUserController {
    constructor(routerRepository) {
        this.createNewRouter = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const router = yield this.routerRepository.createRouter(req.body.rota);
                if (!router) {
                    res.status(404).json(new Response_1.Response(true, 'Ocorreu um erro ao gravar sua rotas', null));
                }
                else {
                    const linhas = req.body.linhas;
                    linhas.id_rota = router.dataValues.id;
                    const linesRouter = yield this.routerRepository.createRouterLines(linhas, router.dataValues.id);
                    if (!linesRouter) {
                        res.status(404).json(new Response_1.Response(true, 'Erro ao salvar linhas', null));
                    }
                    else {
                        const descricao_rota = req.body.descricao_rota;
                        descricao_rota.id_rota = router.dataValues.id;
                        const descriptionRouter = yield this.routerRepository.createDescriptionRouter(descricao_rota);
                        if (!descriptionRouter) {
                            res.status(404).json(new Response_1.Response(true, 'Erro ao salvar descricao', null));
                        }
                        const daysRouter = req.body.dias_rota;
                        daysRouter.id_rota = router.dataValues.id;
                        const diasRotas = yield this.routerRepository.createDaysRouter(daysRouter);
                    }
                    res.status(201).json(new Response_1.Response(false, "Rota Inserida com sucesso", { "id_rota": router.dataValues.id }));
                }
            }
            catch (e) {
            }
        });
        this.deleteRouterUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const delRouter = this.routerRepository.deleteRouter(req.body);
                if (!delRouter) {
                    res.status(404).json(new Response_1.Response(true, 'Erro ao excluir rotas', null));
                }
                res.status(202).json(new Response_1.Response(false, "Rota excluída com sucesso", delRouter));
            }
            catch (e) {
                return res.status(422).json(new Response_1.Response(true, e.message, null));
            }
        });
        this.updateRouterUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updateRouter = this.routerRepository.updateRouter(req.body);
                if (!updateRouter) {
                    res.status(422).json(new Response_1.Response(true, 'Não foi possivel atualizar sua rota', null));
                }
                res.status(201).json(new Response_1.Response(false, 'Rota atualizada com sucesso', null));
            }
            catch (e) {
                res.status(400).json(new Response_1.Response(true, e.message, null));
            }
        });
        this.changeNotification = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const notification = this.routerRepository.alterNotification(req.body);
            }
            catch (e) {
            }
        });
        this.routerRepository = routerRepository;
    }
}
exports.RouterUserController = RouterUserController;

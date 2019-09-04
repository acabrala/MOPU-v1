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
let way;
let trem;
let metro;
const key = require('../config/google-key');
class CalculateRouterController {
    constructor(calculateRouterRepository, linhasTrilhosRepository) {
        this.calculateRouterNow = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const router_is_bus = req.params.onibus;
                const router_is_train = req.params.trem;
                const router_is_subway = req.params.metro;
                if ((router_is_bus == 'false') && (router_is_subway == 'false') && (router_is_train == 'false')) {
                    way = yield this.calculateRouterRepository.tracingRouter(req.params);
                }
                else if ((router_is_bus == 'false') && (router_is_subway == 'false') && (router_is_train == 'true')) {
                    way = yield this.calculateRouterRepository.tracingRouterTrain(req.params);
                    trem = true;
                }
                else if ((router_is_bus == 'false') && (router_is_subway == 'true') && (router_is_train == 'false')) {
                    way = yield this.calculateRouterRepository.tracingRouterSubway(req.params);
                    metro = true;
                }
                else if ((router_is_bus == "true") && (router_is_subway == 'false') && (router_is_train == 'false')) {
                    way = yield this.calculateRouterRepository.tracingRouterBus(req.params);
                }
                else if ((router_is_bus == "true") && (router_is_subway == 'true') && (router_is_train == 'false')) {
                    way = yield this.calculateRouterRepository.trancingRouterBusAndSubway(req.params);
                }
                else if ((router_is_bus == "true") && (router_is_subway == 'false') && (router_is_train == 'true')) {
                    way = yield this.calculateRouterRepository.trancingRouterBusAndTrain(req.params);
                }
                else if ((router_is_bus == 'true') && (router_is_subway == 'true') && (router_is_train == 'true')) {
                    way = yield this.calculateRouterRepository.tracingRouter(req.params);
                }
                if (way) {
                    if (way.data.routes.length <= 0) {
                        return res.json({
                            message: 'Não localizamos rota para os endereços informados, por favor verifique e tente novamente'
                        });
                    }
                    for (let k = 0; k < way.data.routes.length; k++) {
                        const obj = way.data.routes[k].legs[0].steps;
                        let filters = obj.filter(linhas => {
                            return linhas.travel_mode === "TRANSIT";
                        });
                        let estacoesSolicitadas = [];
                        let stations = filters.map(estacaoMapeadas => {
                            estacoesSolicitadas.push(estacaoMapeadas.transit_details.line.short_name);
                        });
                        const linhasIndisponivel = yield this.linhasTrilhosRepository.getLinesAvailable();
                        let b = [];
                        let availables = linhasIndisponivel.map(estacoes => {
                            b.push(estacoes['nome']);
                        });
                        let c = [];
                        c = estacoesSolicitadas.filter((item) => {
                            if (b.includes(item)) {
                                return item;
                            }
                        });
                        let tremIndisponivel = Boolean();
                        let metroIndisponivel = Boolean();
                        if (c.length > 0) {
                            let ab = c.map((mapeada) => {
                                let linhasTrens = ['CPTM L11', 'CPTM L7', 'CPTM L8', 'CPTM L9', 'CPTM L10', 'CPTM L12', 'CPTM L13'];
                                let linhasMetro = ['METRÔ L1', 'METRÔ L2', 'METRÔ L3', 'METRÔ L4', 'METRÔ L5', 'METRÔ L15'];
                                for (let a = 0; a < linhasTrens.length; a++) {
                                    for (let i = 0; i < linhasMetro.length; i++) {
                                        if (mapeada === linhasTrens[a]) {
                                            tremIndisponivel = true;
                                        }
                                        if (mapeada === linhasMetro[i]) {
                                            metroIndisponivel = true;
                                        }
                                    }
                                }
                            });
                            if (tremIndisponivel == true && metroIndisponivel == false) {
                                let metroRouter = yield this.calculateRouterRepository.tracingRouterSubway(req.params);
                                if (metroRouter) {
                                    let newRouter = metroRouter.data.routes;
                                    return res.json({
                                        message: `Estação com problema relatado pelos usuários ${c}, achamos essa solução para ti`,
                                        "caminho": newRouter
                                    });
                                }
                            }
                            else if (tremIndisponivel == false && metroIndisponivel == true) {
                                let trainRouter = yield this.calculateRouterRepository.tracingRouterTrain(req.params);
                                if (trainRouter) {
                                    let newRouter = trainRouter.data.routes;
                                    return res.json({
                                        message: `Linhas com problema relatado pelos usuarios ${c}, achamos essa solução para ti`,
                                        "caminho": newRouter
                                    });
                                }
                            }
                            else {
                                let busRouter = yield this.calculateRouterRepository.tracingRouterBus(req.params);
                                if (busRouter) {
                                    let newRouter = busRouter.data.routes;
                                    return res.json({
                                        message: `Linhas com problema relatado pelos usuarios ${c}, achamos essa solução para ti`,
                                        "caminho": newRouter
                                    });
                                }
                            }
                        }
                        else {
                            const normally = way.data.routes;
                            const apenas_trem = normally.map((analisar, index) => {
                                analisar.legs[0].steps.map((tipo_transporte) => {
                                    if (tipo_transporte.travel_mode === "TRANSIT") {
                                        if ((trem === true) && (tipo_transporte.transit_details.line.vehicle.type === "SUBWAY")) {
                                            normally.splice(index, 1);
                                        }
                                        else if ((metro === true) && (tipo_transporte.transit_details.line.vehicle.type === "HEAVY_RAIL")) {
                                            normally.splice(index, 1);
                                        }
                                    }
                                    return;
                                });
                            });
                            return res.json({
                                message: "Caminho sem nenhuma anormalidade relatada",
                                caminho: normally
                            });
                        }
                    }
                }
            }
            catch (e) {
                console.log(e);
                res.json(e.response);
            }
        });
        this.calculateRouterRepository = calculateRouterRepository;
        this.linhasTrilhosRepository = linhasTrilhosRepository;
    }
}
exports.CalculateRouterController = CalculateRouterController;

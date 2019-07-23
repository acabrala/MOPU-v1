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
class EstacaoController {
    constructor(estacaoRepository) {
        this.createNewStation = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const station = yield this.estacaoRepository.createStation(req.body);
                if (station) {
                    res.status(200).json(new Response_1.Response(false, "Requisicao processada com sucesso.", station));
                }
                else {
                    return;
                }
            }
            catch (e) {
                console.log(e);
                return;
            }
        });
        this.getStation = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const stations = yield this.estacaoRepository.getStations();
                if (stations) {
                    res.status(200).json(new Response_1.Response(false, "Processamento feito com sucesso.", stations));
                }
                else {
                    res.status(400).json(new Response_1.Response(true, "Ocorreu algum erro", null));
                }
            }
            catch (e) {
                res.status(404).json(new Response_1.Response(true, "mensagem" + e, null));
            }
        });
        this.estacaoRepository = estacaoRepository;
    }
}
exports.EstacaoController = EstacaoController;

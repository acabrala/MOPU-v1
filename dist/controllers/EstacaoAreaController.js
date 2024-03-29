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
class EstacaoAreaController {
    constructor(estacaoAreaRepository) {
        this.createNewAreaStation = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const station = yield this.estacaoAreaRepository.createAreaStation(req.body);
                if (station) {
                    res.status(200).json(new Response_1.Response(false, "Com sucesso", station));
                }
                else {
                    res.status(400).json(new Response_1.Response(true, "adsasdas", station));
                }
            }
            catch (e) {
                res.status(404).json(new Response_1.Response(true, "Erro" + e, null));
            }
        });
        this.estacaoAreaRepository = estacaoAreaRepository;
    }
}
exports.EstacaoAreaController = EstacaoAreaController;

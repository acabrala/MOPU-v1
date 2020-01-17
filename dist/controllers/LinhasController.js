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
class LinhasController {
    constructor(linhasRepository) {
        this.consultarlinhas = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const linhas = yield this.linhasRepository.getLinhas();
            const teste = { 'linhas': linhas, versao_server: "v2" };
            return res.status(201).json(new Response_1.Response(false, "deu bom", teste));
        });
        this.linhasRepository = linhasRepository;
    }
}
exports.LinhasController = LinhasController;

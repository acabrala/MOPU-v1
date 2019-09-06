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
// import { IncidenteRepositoty } from '../repository/IncidenteRepository'
class ProblemaController {
    constructor(problemaRepository) {
        this.createNewProblem = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const problem = yield this.problemaRepository.createProblem(req.body);
                return res.status(201).json(new Response_1.Response(false, "Problema relatado com sucesso", null));
            }
            catch (e) {
                return res.status(422).json(new Response_1.Response(true, e.message, false));
            }
        });
        this.getProblemsUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const problemUser = yield this.problemaRepository.getIncidentes(req.body);
            }
            catch (e) {
            }
        });
        this.problemaRepository = problemaRepository;
    }
}
exports.ProblemaController = ProblemaController;

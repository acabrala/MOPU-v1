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
const Problema_1 = require("../model/Problema");
const Incidentes_1 = require("../model/Incidentes");
const moment = require("moment");
const ProblemaReal_1 = require("../model/ProblemaReal");
const data_atual = moment().subtract(180, "minutes").format("DD/MM/YYYY HH:mm:ss");
class ProblemaRepositoty {
    constructor() {
        this.createProblem = (problema) => __awaiter(this, void 0, void 0, function* () {
            const verificar_existente = yield ProblemaReal_1.default.find({ local_problema: problema.local_problema, linha_problema: problema.linha_problema });
            if (verificar_existente.length > 0) {
                Incidentes_1.Incidentes.create(problema);
                Problema_1.default.create(problema);
                let quantidade_relatado = verificar_existente['quantidade_relatada'];
                let nova_quantidade = quantidade_relatado + 1;
                ProblemaReal_1.default.update({ linha_problema: problema.linha_problema, local_problema: problema.local_problema }, { $set: { quantidade_relatada: nova_quantidade } });
                return;
            }
            else {
                if (problema.anonimo === "true") {
                    const problemas = yield Problema_1.default.find({ local_problema: problema.local_problema, horario_ocorrencia: { $gt: data_atual } });
                    if (problemas.length >= 3) {
                        ProblemaReal_1.default.create(problema);
                        Incidentes_1.Incidentes.create(problema);
                        return yield Problema_1.default.create(problema);
                    }
                    else {
                        Problema_1.default.create(problema);
                        Incidentes_1.Incidentes.create();
                        return;
                    }
                }
                else {
                    Problema_1.default.create();
                    Incidentes_1.Incidentes.create();
                    ProblemaReal_1.default.create();
                }
            }
        });
        this.getIncidentes = (problema) => __awaiter(this, void 0, void 0, function* () {
            Problema_1.default.find({ horario_ocorrencia: { $lt: data_atual } });
        });
    }
}
exports.ProblemaRepositoty = ProblemaRepositoty;

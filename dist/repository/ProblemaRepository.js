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
const moment = require("moment-timezone");
const ProblemaReal_1 = require("../model/ProblemaReal");
const LinhasTrilhos_1 = require("../model/LinhasTrilhos");
const LinhasRotas_1 = require("../model/LinhasRotas");
const ProblemReally_1 = require("../model/ProblemReally");
const data_atual = moment().subtract(180, "minutes").format("DD/MM/YYYY HH:mm:ss");
class ProblemaRepositoty {
    constructor() {
        this.createProblem = (problema) => __awaiter(this, void 0, void 0, function* () {
            problema.horario_ocorrencia = moment().tz("America/Sao_Paulo").format("DD/MM/YYYY HH:mm:ss");
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
                if (problema.anonimo === true) {
                    const problemas = yield Problema_1.default.find({ local_problema: problema.local_problema, horario_ocorrencia: { $gt: data_atual } });
                    console.log(problemas.length);
                    if (problemas.length >= 3) {
                        let problema_real = {
                            tipo_transporte: problema.tipo_transporte,
                            linha_problema: problema.linha_problema,
                            local_problema: problema.local_problema,
                            motivo: problema.problema,
                            submotivo: problema.problema,
                            id_usuario: problema.id_usuario,
                            horario_inicio: problema.horario_ocorrencia,
                            horario_fim: null,
                            duracao_ocorrencia: null,
                            quantidade_relatada: 3
                        };
                        ProblemaReal_1.default.create(problema_real);
                        LinhasTrilhos_1.default.update({ nome: problema.linha_problema }, { $set: { status_disponivel: false } });
                        Incidentes_1.Incidentes.create(problema);
                        return yield Problema_1.default.create(problema);
                    }
                    else {
                        Problema_1.default.create(problema);
                        Incidentes_1.Incidentes.create(problema);
                    }
                }
                else {
                    let problema_real = {
                        tipo_transporte: problema.tipo_transporte,
                        linha_problema: problema.linha_problema,
                        local_problema: problema.local_problema,
                        motivo: problema.problema,
                        submotivo: problema.problema,
                        id_usuario: problema.id_usuario,
                        horario_inicio: problema.horario_ocorrencia,
                        horario_fim: null,
                        duracao_ocorrencia: null,
                        quantidade_relatada: 1
                    };
                    console.log(problema);
                    ProblemReally_1.ProblemReally.create(problema_real);
                    Problema_1.default.create(problema);
                    Incidentes_1.Incidentes.create(problema);
                    ProblemaReal_1.default.create(problema_real);
                    LinhasTrilhos_1.default.update({ nome: problema.linha_problema }, { $set: { status_disponivel: false } });
                }
            }
        });
        this.getIncidentes = (problema) => __awaiter(this, void 0, void 0, function* () {
            let problemas = [];
            const issues = yield LinhasRotas_1.LinesRoutes.findAll({ where: { id_rota: problema.id_rota } });
            if (issues) {
                for (let i = 0; i < issues.length; i++) {
                    yield ProblemaReal_1.default.aggregate([
                        {
                            $lookup: {
                                from: "linhas",
                                localField: "local_problema",
                                foreignField: "nome",
                                as: "localizacao"
                            }
                        }, {
                            $match: {
                                "linha_problema": issues[i].dataValues.descricao, ocorrencia_finalizada: false
                            }
                        }
                    ]).then(abc => {
                        problemas.push(abc[0]);
                    });
                }
                return problemas;
            }
        });
    }
}
exports.ProblemaRepositoty = ProblemaRepositoty;

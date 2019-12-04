import Problema from "../model/Problema";
import { Incidentes } from "../model/Incidentes";
import * as moment from 'moment-timezone';
import ProblemaReal from "../model/ProblemaReal";
import LinhasTrilhos from "../model/LinhasTrilhos";
import { LinesRoutes } from "../model/LinhasRotas";
import { ProblemReally } from "../model/ProblemReally";


const data_atual = moment().subtract(180, "minutes").format("DD/MM/YYYY HH:mm:ss")

export class ProblemaRepositoty {

    createProblem = async (problema) => {
        problema.horario_ocorrencia = moment().tz("America/Sao_Paulo").format("DD/MM/YYYY HH:mm:ss")


        const verificar_existente = await ProblemaReal.find({ local_problema: problema.local_problema, linha_problema: problema.linha_problema })

        if (verificar_existente.length > 0) {

            Incidentes.create(problema)
            Problema.create(problema)

            let quantidade_relatado = verificar_existente['quantidade_relatada'];
            let nova_quantidade = quantidade_relatado + 1;
            ProblemaReal.update({ linha_problema: problema.linha_problema, local_problema: problema.local_problema }, { $set: { quantidade_relatada: nova_quantidade } })
            return

        } else {

            if (problema.anonimo === "true") {

                const problemas = await Problema.find({ local_problema: problema.local_problema, horario_ocorrencia: { $gt: data_atual } })

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

                    ProblemaReal.create(problema_real)
                    LinhasTrilhos.update({ nome: problema.linha_problema }, { $set: { status_disponivel: false } })
                    Incidentes.create(problema)
                    return await Problema.create(problema)

                } else {

                    Problema.create(problema)
                    Incidentes.create(problema)

                }
            } else {

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

                ProblemReally.create(problema)
                Problema.create(problema)
                Incidentes.create(problema)
                ProblemaReal.create(problema_real)
                LinhasTrilhos.update({ nome: problema.linha_problema }, { $set: { status_disponivel: false } })
            }
        }
    }

    getIncidentes = async (problema) => {
        let problemas = []
        const issues = await LinesRoutes.findAll({ where: { id_rota: problema.id_rota } })

        if (issues) {

            for (let i = 0; i < issues.length; i++) {

                    await ProblemaReal.aggregate([
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
                        problemas.push(abc[0])
                    })
            }

                return problemas
        }
    }
}
import Problema from "../model/Problema";
import { Incidentes } from "../model/Incidentes";
import * as moment from 'moment';
import ProblemaReal from "../model/ProblemaReal";


const data_atual = moment().subtract(180, "minutes").format("DD/MM/YYYY HH:mm:ss")

export class ProblemaRepositoty {

    createProblem = async (problema) => {

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

                    ProblemaReal.create(problema)
                    Incidentes.create(problema)
                    return await Problema.create(problema)

                } else {

                    Problema.create(problema)
                    Incidentes.create()
                    return
                }
            } else {

                Problema.create()
                Incidentes.create()
                ProblemaReal.create()

            }
        }

    }

    getIncidentes = async (problema) => {
        Problema.find({ horario_ocorrencia: { $lt: data_atual } })
    }



}
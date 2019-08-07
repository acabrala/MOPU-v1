import Problema from "../model/Problema";
import { Incidentes } from "../model/Incidentes";
import * as moment from 'moment';


export class ProblemaRepositoty {

    createProblem = async (problema) => {
        problema.horario_ocorrencia = moment().format("DD/MM/YYYY HH:mm:ss")

        Incidentes.create(problema)
        return await Problema.create(problema)


    }

}
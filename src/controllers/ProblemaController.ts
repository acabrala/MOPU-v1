import { Response } from "../model/Response";
import { ProblemaRepositoty } from "../repository/ProblemaRepository";
// import { IncidenteRepositoty } from '../repository/IncidenteRepository'

export class ProblemaController {

    private problemaRepository: ProblemaRepositoty;

    constructor(problemaRepository: ProblemaRepositoty) {
        this.problemaRepository = problemaRepository
    }

    createNewProblem = async (req, res) => {

        try {

            const problem = await this.problemaRepository.createProblem(req.body)

           return res.status(201).json(new Response(false,"Problema relatado com sucesso", null))

        } catch (e) {
            return res.status(422).json(new Response(true, e.message, false))

        }
    }

    getProblemsUser = async (req, res) => {
        try {
            const problemUser = await this.problemaRepository.getIncidentes(req.body)
        
            if(problemUser){

                return res.status(200).json(new Response(false, 'Problemas listados', problemUser))
            }
        
        } catch (e) {
            
        }
    }

}
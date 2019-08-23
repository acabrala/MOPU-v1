import { Response } from "../model/Response";
import { EstacaoRepository } from "../repository/EstacaoRepository"

export class EstacaoController {

    private estacaoRepository: EstacaoRepository;

    constructor(estacaoRepository: EstacaoRepository){
        this.estacaoRepository = estacaoRepository
    }
    
    createNewStation = async (req, res) => {

        try {

            const station = await this.estacaoRepository.createStation(req.body)

            if(station){
                res.status(200).json(new Response(false, "Requisicao processada com sucesso.", station));
            } else {
                return
            }
        } catch (e) {
            console.log(e)
            return
        }
    };

    getStation = async (req, res) => {

        console.log('esta chegando')

        try {
            const stations = await this.estacaoRepository.getStations();
            
            if(stations){
                res.status(200).json(new Response(false,"Processamento feito com sucesso.", stations));
                 
            } else { 
                res.status(400).json(new Response(true, "Ocorreu algum erro", null))
            } 

        }catch (e) {
                res.status(404).json(new Response(true, "mensagem"+e, null))            
        }
    }
}

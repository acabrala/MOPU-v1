import { TempoPushRepository } from "../repository/TempoPushRepository";
import { Response } from "../model/Response";

export class TempoPushController {

    private tempoPushRepository: TempoPushRepository;

    constructor(tempoPushRepository: TempoPushRepository) {
        this.tempoPushRepository = tempoPushRepository;
    }

    salvarTempo = async(req, res) => {
        try{
            const tempo = this.tempoPushRepository.create(req.body)
            if(tempo) { 
                return res.status(200).json(new Response(false, "Informação salva com sucesso", null ))
            } else {
                return
            }

        } catch(e) {

            return res.status(401).json(new Response(true, e.message, null))
        }
    }


}
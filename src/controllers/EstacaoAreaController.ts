import { Response } from '../model/Response';
import { EstacaoAreaRepository } from '../repository/EstacaoAreaRepository';

export class EstacaoAreaController {

    private estacaoAreaRepository: EstacaoAreaRepository;

    constructor(estacaoAreaRepository: EstacaoAreaRepository) {
        this.estacaoAreaRepository = estacaoAreaRepository
    }

    createNewAreaStation = async (req, res) => {

        try {

            const station = await this.estacaoAreaRepository.createAreaStation(req.body)

            if (station) {
                res.status(200).json(new Response(false, "Com sucesso", station))
            } else {
                res.status(400).json(new Response(true, "adsasdas", station))
            }

        } catch (e) {
            res.status(404).json(new Response(true, "Erro" + e, null))

        }
    }

}
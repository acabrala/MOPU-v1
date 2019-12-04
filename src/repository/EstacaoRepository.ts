import Estacao from "../model/Estacao";

export class EstacaoRepository {

    createStation = async (estacao) => {

        return await Estacao.create(estacao)

    }

    getStations = async () => {

        return await  Estacao.find({})

    }

}
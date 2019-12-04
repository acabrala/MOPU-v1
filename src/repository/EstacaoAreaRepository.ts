import EstacaoArea from '../model/EstacaoArea';

export class EstacaoAreaRepository {

    createAreaStation = async (estacao) => {

        return await EstacaoArea.create({
            nome: estacao.nome,
            geometry: {
                coordinates: estacao.area,
                type: 'Polygon'
            }
        })
    }
}
import { Linhas } from "../model/Linha";

export class LinhasRepository {

    getLinhas = async() => {
        return await Linhas.findAll()
    }

}
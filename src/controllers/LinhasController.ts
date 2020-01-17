import { LinhasRepository } from "../repository/LinhasRepository";
import { Response } from "../model/Response";

export class LinhasController {

    private linhasRepository: LinhasRepository;

    constructor(linhasRepository: LinhasRepository) {
        this.linhasRepository = linhasRepository;
    }

    consultarlinhas = async (req,res) => {
        const linhas = await this.linhasRepository.getLinhas();

	const teste = {'linhas': linhas, versao_server: "v2"}

        return res.status(201).json(new Response(false, "deu bom", teste))
    }
}
import { Response } from '../model/Response';
import { MobileRepository } from '../repository/MobileRepository';

export class MobileController {

    private mobileRepository: MobileRepository;

    constructor(mobileRepository: MobileRepository) {
        this.mobileRepository = mobileRepository;
    }

    gerarMobile = async (req, res) => {
        try {
            const mobile = await this.mobileRepository.generateMobile(req.body)

            if (!mobile) {

            }
            return res.status(200).json(new Response(false, 'mobile gerado', mobile))
        } catch (e) {

        }
    }

    atualizarMobile = async (req, res) => {
        try {
            const mobile = await this.mobileRepository.updateMobile(req.body);

            return res.status(202).json(new Response(false, "terminal atualizado com sucesso", null))
        } catch (e) {

        }
    }

}
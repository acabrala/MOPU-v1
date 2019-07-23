import { Response } from "../model/Response";
import { AvatarRepository } from "../repository/AvatarRepository";

export class AvatarController {

    private avatarRepository: AvatarRepository;

    constructor(avatarRepository: AvatarRepository) {
        this.avatarRepository = avatarRepository;
    }



    todosAvatar = async (req, res) => {
        try {
            const avatares = await this.avatarRepository.getAvatar(req.body)

            return res.status(200).json(new Response(false, "Avatares listado com sucesso", avatares))

        } catch (e) {

        }
    }

}



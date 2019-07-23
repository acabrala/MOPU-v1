import { Avatar } from "../model/Avatar";

export class AvatarRepository {

    getAvatar = async (avatar) => {
        return await Avatar.findAll().then((result) =>  {
            return result
            
        })
    }

}
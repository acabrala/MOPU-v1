import { Mobile } from "../model/Mobile";

export class MobileRepository {

    generateMobile = async (mobile) => {

        let terminal = await Mobile.findOne({ where: { serial: mobile.serial } })

        if(!terminal) {
            return await Mobile.create(mobile) 
        } else {
            return terminal
        }
        
    }

    updateMobile = async (mobile) => {
        let id_terminal = mobile.id;

        return await Mobile.update(mobile, { where: {id: id_terminal}})
    }
}

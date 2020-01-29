import TimePushBus from "../model/TimePushBus"

export class TempoPushRepository {

    create = async(data) => {

        return await TimePushBus.create(data)
    }
}
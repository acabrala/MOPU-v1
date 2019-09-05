import LinhasTrilhos from '../model/LinhasTrilhos';

export class LinhasTrilhosRepository {

    getLinesAvailable = async () => {
        return await LinhasTrilhos.find({status_disponivel: true},{"nome":1,"tipo":1, "_id":0})
    }
}

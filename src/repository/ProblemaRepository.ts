import Problema from "../model/Problema";
import { Incidentes } from "../model/Incidentes";

export class ProblemaRepositoty {

    createProblem = async (problema) => {

        // const { latitude, longitude } = incidente.location;
        Incidentes.create(problema)
        return await Problema.create(problema)

        // return await Problema.findOne({
        //     geometry: {
        //         $geoIntersects: {
        //             $geometry: {
        //                 type: 'Point',
        //                 coordinates: [longitude, latitude]
        //             }
        //         }
        //     }
        // })

    }

}
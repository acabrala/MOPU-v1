import Problema from "../model/Problema";

export class ProblemaRepositoty {

    createProblem = async (problema) => {

        // const { latitude, longitude } = incidente.location;
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
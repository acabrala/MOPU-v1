// // import Incidente from "../model/Incidente";
// export class IncidenteRepositoty {
//     createIncidente = async (incidente) => {
//         const { latitude, longitude } = incidente.location;
//         return await Incidente.findOne({
//             geometry: {
//                 $geoIntersects: {
//                     $geometry: {
//                         type: 'Point',
//                         coordinates: [longitude, latitude]
//                     }
//                 }
//             }
//         })
//     }
// }

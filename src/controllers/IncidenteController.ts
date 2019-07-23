// import { Response } from '../model/Response';
// import { IncidenteRepositoty } from '../repository/IncidenteRepository'

// export class IncidenteController {

//     private incidenteRepository: IncidenteRepositoty;

//     constructor(incidenteRepository: IncidenteRepositoty) {
//         this.incidenteRepository = incidenteRepository
//     }

//     createNewIncidente = async (req, res) => {

//         try {

//             const issue = await this.incidenteRepository.createIncidente(req.body)

//             if (!issue) {
//                 return res.status(400).json(new Response(true,"Você precisa estar perto ", null))
//             }


//         } catch (e) {

//         }
//     }

// }
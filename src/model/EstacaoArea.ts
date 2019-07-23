import * as mongoose from 'mongoose';

interface IStationArea extends mongoose.Document {
    nome: String;
    geometry: [[[ Number ]]]
}

const estacaoArea = new mongoose.Schema({
    geometry: {
        coordinates: {
            type: [[[ Number ]]],
            required: true 
        },
        type: {
            type: String,
            enum: ['Polygon'],
            required: true
        }
    },
    nome: String,
    id_estacao: String 
});

export default mongoose.model<IStationArea>("estacao area", estacaoArea);
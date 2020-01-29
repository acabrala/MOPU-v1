import * as mongoose from 'mongoose';

const timeBusInformation = new mongoose.Schema({
    endereco_ponto: [Number],
    tempo_ponto: String,
    nome_onibus: String,
    numero_onibus: String,
    id_usuario: String,

});

export default mongoose.model("time_push", timeBusInformation);
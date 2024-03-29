import * as mongoose from 'mongoose';
import * as moment from 'moment-timezone';
let data_local = moment.tz(Date.now(), "America/Sao_Paulo")

const ProblemaSchema = new mongoose.Schema({
    tipo_transporte: {
        type: String,
        required: true
    },
    linha_problema: {
        type: String,
        required: true
    },
    local_problema: {
        type: String,
        required: true 
    },
    problema: {
        type: String,
        required: true
    },
    id_usuario: {
        type: String,
        required: true
    },
    horario_ocorrencia: {
        type: String,
        required: true
    },
    id_mobile: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    anonimo: {
        type: Boolean,
        required: true,
    },
    status_finalizado: {
        type: Boolean,
        required: false,
        default: false
    }
})

const Problema = mongoose.model("Incidentes", ProblemaSchema);

export default Problema;
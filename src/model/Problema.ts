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
        type: Date,
        required: true,
        default: data_local
    },
    status: {
        type: Boolean,
        required: false,
        default: false
    }
})

const Problema = mongoose.model("Incidentes", ProblemaSchema);

export default Problema;
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
    motivo: {
        type: String,
        required: true
    },
    submotivo: {
        type: String,
        required: true
    },
    id_usuario: {
        type: String,
        required: true
    },
    horario_inicio: {
        type: Date,
        required: true,
        default: data_local
    },
    horario_fim: {
        type: Date,
        required: false
    },
    ocorrencia_finalizada: {
        type: Boolean,
        required: true,
        default: false
    },
    duracao_ocorrencia: {
        type: Number,
        required: false
    }
})

const Problema = mongoose.model("Problema-Real", ProblemaSchema);

export default Problema;
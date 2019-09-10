import * as mongoose from 'mongoose';
import * as moment from 'moment-timezone';
let data_local = moment.tz(Date.now(), "America/Sao_Paulo").format("DD/MM/YYYY HH:mm:ss")
mongoose.pluralize(null);

const ProblemaRealSchema = new mongoose.Schema({
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
    },
    quantidade_relatada: {
        type: Number,
        required: true,
        default: 1
    }
})

const ProblemaReal = mongoose.model("Problema-Real", ProblemaRealSchema);

export default ProblemaReal;
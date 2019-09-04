"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const moment = require("moment-timezone");
let data_local = moment.tz(Date.now(), "America/Sao_Paulo");
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
});
const ProblemaReal = mongoose.model("Problema-Real", ProblemaRealSchema);
exports.default = ProblemaReal;

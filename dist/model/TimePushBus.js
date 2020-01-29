"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const timeBusInformation = new mongoose.Schema({
    endereco_ponto: [Number],
    tempo_ponto: String,
    nome_onibus: String,
    numero_onibus: String,
    id_usuario: String,
});
exports.default = mongoose.model("time_push", timeBusInformation);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const estacoes = new mongoose.Schema({
    nome: String,
    linha: String,
    status: Boolean,
    localizacao: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});
estacoes.index({ localizacao: '2dshere' });
exports.default = mongoose.model("estacoes", estacoes);

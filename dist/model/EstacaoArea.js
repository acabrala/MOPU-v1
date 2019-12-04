"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const estacaoArea = new mongoose.Schema({
    geometry: {
        coordinates: {
            type: [[[Number]]],
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
exports.default = mongoose.model("estacao area", estacaoArea);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const bus_information = new mongoose.Schema({
    prefixo: String,
    acessibilidade: Boolean,
    ar_condicionado: Boolean,
    usb: Boolean,
    validador: Boolean,
    wifi: Boolean
});
exports.default = mongoose.model("onibus_veiculos", bus_information);

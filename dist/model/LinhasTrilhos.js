"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const LinhasSchema = new mongoose.Schema({
    nome: String,
    status_disponivel: Boolean
});
exports.default = mongoose.model("linhas", LinhasSchema);
;

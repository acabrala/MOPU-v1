"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const Response_1 = require("../model/Response");
exports.default = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(401).json(new Response_1.Response(true, null, "Acesso negado. Sem token"));
    }
    try {
        const decoded = jwt.verify(token, "private-key");
        req.user = decoded;
        next();
    }
    catch (ex) {
        return res.status(401).send(new Response_1.Response(true, null, "token invalido "));
    }
};

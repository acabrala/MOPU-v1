"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = require("../model/User");
const Rotas_1 = require("../model/Rotas");
const LinhasRotas_1 = require("../model/LinhasRotas");
const DiasRotas_1 = require("../model/DiasRotas");
const DescricaoRotas_1 = require("../model/DescricaoRotas");
const Favoritos_1 = require("../model/Favoritos");
const Mobile_1 = require("../model/Mobile");
const Avatar_1 = require("../model/Avatar");
const Linha_1 = require("../model/Linha");
const Incidente_padrao_1 = require("../model/Incidente_padrao");
const ScoreUser_1 = require("../model/ScoreUser");
const Incidentes_1 = require("../model/Incidentes");
exports.sequelize = new sequelize_typescript_1.Sequelize({
    dialect: "postgres",
    operatorsAliases: sequelize_typescript_1.Sequelize.Op,
    host: "34.68.209.220",
    port: 5432,
    database: "mobilidade",
    username: "postgres",
    password: "MKTz@zz1"
});
exports.sequelize.addModels([User_1.User, Rotas_1.Routes, LinhasRotas_1.LinesRoutes, DiasRotas_1.RoutesDay, DescricaoRotas_1.RoutesDescriptions, Favoritos_1.Favoritos, Mobile_1.Mobile, Avatar_1.Avatar, Linha_1.Linhas, Incidente_padrao_1.IncidentesPadrao, ScoreUser_1.ScoreUser, Incidentes_1.Incidentes]);

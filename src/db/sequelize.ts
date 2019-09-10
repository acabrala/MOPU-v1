import { Sequelize } from "sequelize-typescript";
import { User } from "../model/User";
import { Routes } from '../model/Rotas';
import { LinesRoutes } from "../model/LinhasRotas";
import { RoutesDay } from "../model/DiasRotas";
import { RoutesDescriptions } from "../model/DescricaoRotas";
import { Favoritos } from "../model/Favoritos";
import { Mobile } from "../model/Mobile";
import { Avatar } from "../model/Avatar";
import { Linhas } from "../model/Linha";
import { IncidentesPadrao } from "../model/Incidente_padrao";
import { ScoreUser } from "../model/ScoreUser";
import { Incidentes } from "../model/Incidentes";
import { ProblemReally } from "../model/ProblemReally";

export const sequelize = new Sequelize({
    dialect: "postgres",
    operatorsAliases: Sequelize.Op as any,
    host: "localhost",
    port: 5432,
    database: "mobilidade",
    username: "postgres",
    password: "MKTz@zz1"
});

sequelize.addModels([ User, Routes, LinesRoutes, RoutesDay, RoutesDescriptions, Favoritos, Mobile, Avatar, Linhas, IncidentesPadrao, ScoreUser, Incidentes, ProblemReally ]);
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Rotas_1 = require("./Rotas");
let RoutesDescriptions = class RoutesDescriptions extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column({ primaryKey: true, type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], RoutesDescriptions.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Rotas_1.Routes),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], RoutesDescriptions.prototype, "id_rota", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], RoutesDescriptions.prototype, "horario_rota", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], RoutesDescriptions.prototype, "horario_saida", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], RoutesDescriptions.prototype, "horario_chegada", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], RoutesDescriptions.prototype, "is_push", void 0);
RoutesDescriptions = __decorate([
    sequelize_typescript_1.Table({
        tableName: "descricao_rotas"
    })
], RoutesDescriptions);
exports.RoutesDescriptions = RoutesDescriptions;

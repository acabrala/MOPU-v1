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
let Incidentes = class Incidentes extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column({ primaryKey: true, type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], Incidentes.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", String)
], Incidentes.prototype, "id_usuario", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Incidentes.prototype, "tipo_transporte", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Incidentes.prototype, "problema", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Incidentes.prototype, "linha_problema", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Incidentes.prototype, "local_problema", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Incidentes.prototype, "horario_ocorrencia", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Incidentes.prototype, "id_mobile", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.FLOAT }),
    __metadata("design:type", Number)
], Incidentes.prototype, "longitude", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.FLOAT }),
    __metadata("design:type", Number)
], Incidentes.prototype, "latitude", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Incidentes.prototype, "anonimo", void 0);
Incidentes = __decorate([
    sequelize_typescript_1.Table({
        tableName: "incidentes"
    })
], Incidentes);
exports.Incidentes = Incidentes;

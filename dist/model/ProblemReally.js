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
// let data_local = moment.tz(Date.now(), "America/Sao_Paulo").format("DD/MM/YYYY HH:mm:ss")
let ProblemReally = class ProblemReally extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column({ primaryKey: true, type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], ProblemReally.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ProblemReally.prototype, "tipo_transporte", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ProblemReally.prototype, "linha_problema", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ProblemReally.prototype, "local_problema", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], ProblemReally.prototype, "motivo", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ProblemReally.prototype, "submotivo", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ProblemReally.prototype, "id_usuario", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], ProblemReally.prototype, "horario_inicio", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], ProblemReally.prototype, "horario_fim", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], ProblemReally.prototype, "ocorrencia_finalizada", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], ProblemReally.prototype, "duracao_ocorrencia", void 0);
__decorate([
    sequelize_typescript_1.Column({ defaultValue: 1 }),
    __metadata("design:type", Number)
], ProblemReally.prototype, "quantidade_relatada", void 0);
ProblemReally = __decorate([
    sequelize_typescript_1.Table({
        tableName: "problema-real"
    })
], ProblemReally);
exports.ProblemReally = ProblemReally;

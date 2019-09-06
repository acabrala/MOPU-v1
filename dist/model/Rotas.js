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
const User_1 = require("./User");
const LinhasRotas_1 = require("./LinhasRotas");
const DescricaoRotas_1 = require("./DescricaoRotas");
const DiasRotas_1 = require("./DiasRotas");
let Routes = class Routes extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column({ primaryKey: true, type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], Routes.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => User_1.User),
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Routes.prototype, "id_usuario", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Routes.prototype, "nome_rota", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Routes.prototype, "origem", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Routes.prototype, "destino", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => LinhasRotas_1.LinesRoutes),
    __metadata("design:type", Array)
], Routes.prototype, "linhas", void 0);
__decorate([
    sequelize_typescript_1.HasOne(() => DescricaoRotas_1.RoutesDescriptions),
    __metadata("design:type", Array)
], Routes.prototype, "descricao_rota", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => DiasRotas_1.RoutesDay),
    __metadata("design:type", Array)
], Routes.prototype, "dias_rota", void 0);
Routes = __decorate([
    sequelize_typescript_1.Table({
        tableName: "rotas"
    })
], Routes);
exports.Routes = Routes;

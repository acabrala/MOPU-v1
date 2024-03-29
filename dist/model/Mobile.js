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
let Mobile = class Mobile extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column({ primaryKey: true, type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], Mobile.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Mobile.prototype, "fabricante", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Mobile.prototype, "modelo", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Mobile.prototype, "versao_so", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Mobile.prototype, "so", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Mobile.prototype, "data_criacao", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Mobile.prototype, "imei", void 0);
__decorate([
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Mobile.prototype, "serial", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Mobile.prototype, "sim_card", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Mobile.prototype, "versao_app", void 0);
__decorate([
    sequelize_typescript_1.Column({ defaultValue: false }),
    __metadata("design:type", Boolean)
], Mobile.prototype, "is_anonimo", void 0);
Mobile = __decorate([
    sequelize_typescript_1.Table({
        tableName: "mobile"
    })
], Mobile);
exports.Mobile = Mobile;

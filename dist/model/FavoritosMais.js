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
var _a;
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = require("./User");
let FavoritosMais = class FavoritosMais extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column({ primaryKey: true, type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], FavoritosMais.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => User_1.User),
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], FavoritosMais.prototype, "id_usuario", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", String)
], FavoritosMais.prototype, "endereco", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", String)
], FavoritosMais.prototype, "tipo", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], FavoritosMais.prototype, "data_criacao", void 0);
FavoritosMais = __decorate([
    sequelize_typescript_1.Table({
        tableName: "favoritos_mais"
    })
], FavoritosMais);
exports.FavoritosMais = FavoritosMais;

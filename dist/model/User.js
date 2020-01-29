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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Rotas_1 = require("../model/Rotas");
const Favoritos_1 = require("./Favoritos");
let User = class User extends sequelize_typescript_1.Model {
    static hashPassword(instance) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcrypt.genSalt(10);
            instance.senha = yield bcrypt.hash(instance.senha, salt);
        });
    }
    isValidPassword(pass) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt.compare(pass, this.senha);
        });
    }
    changePassword(newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcrypt.genSalt(10);
            return yield bcrypt.hash(newPassword, salt);
        });
    }
    generateAuthToken() {
        return jwt.sign({ _id: this.id }, "mkt#RPC2020@", { expiresIn: "1h" });
    }
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column({ primaryKey: true, type: sequelize_typescript_1.DataType.STRING, defaultValue: sequelize_typescript_1.DataType.UUIDV4 }),
    __metadata("design:type", String)
], User.prototype, "id_user", void 0);
__decorate([
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.Column({ allowNull: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    sequelize_typescript_1.Length({ min: 6, msg: "Sua senha deve ter no minimo 6 caracteres." }),
    sequelize_typescript_1.Column({ allowNull: true }),
    __metadata("design:type", String)
], User.prototype, "senha", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], User.prototype, "data_criacao", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Rotas_1.Routes),
    __metadata("design:type", Array)
], User.prototype, "usuarios", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Favoritos_1.Favoritos),
    __metadata("design:type", Array)
], User.prototype, "favoritos", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", String)
], User.prototype, "nome", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "telefone", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], User.prototype, "data_nascimento", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], User.prototype, "score", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], User.prototype, "is_facebook", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], User.prototype, "is_google", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], User.prototype, "is_twitter", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "code", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "password_reset_token", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "imagem", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "ultimo_login", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], User.prototype, "mobile_cadastro", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], User.prototype, "mobile_logado", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "notification_token", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", Promise)
], User, "hashPassword", null);
User = __decorate([
    sequelize_typescript_1.Table({
        tableName: "usuario"
    })
], User);
exports.User = User;

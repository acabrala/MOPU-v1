"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
class Database {
    constructor() {
        this.MONGODB_URI = "mongodb://localhost:27017/mobilidade?replicaSet=rs0";
        this.connectMongo();
    }
    connectMongo() {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongoose.connect(this.MONGODB_URI, {
                useCreateIndex: true,
                useNewUrlParser: true
            }).then(() => {
                console.log('sucesso');
            }).catch(() => {
                console.log('erro');
            });
            console.log("MongoDB connected.");
        });
    }
}
exports.Database = Database;

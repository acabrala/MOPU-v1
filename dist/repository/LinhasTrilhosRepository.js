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
const LinhasTrilhos_1 = require("../model/LinhasTrilhos");
class LinhasTrilhosRepository {
    constructor() {
        this.getLinesAvailable = () => __awaiter(this, void 0, void 0, function* () {
            return yield LinhasTrilhos_1.default.find({ status_disponivel: true }, { "nome": 1, "tipo": 1, "_id": 0 });
        });
    }
}
exports.LinhasTrilhosRepository = LinhasTrilhosRepository;

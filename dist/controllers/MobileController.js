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
const Response_1 = require("../model/Response");
class MobileController {
    constructor(mobileRepository) {
        this.gerarMobile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const mobile = yield this.mobileRepository.generateMobile(req.body);
                if (!mobile) {
                }
                return res.status(200).json(new Response_1.Response(false, 'mobile gerado', mobile));
            }
            catch (e) {
            }
        });
        this.atualizarMobile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const mobile = yield this.mobileRepository.updateMobile(req.body);
                return res.status(202).json(new Response_1.Response(false, "terminal atualizado com sucesso", null));
            }
            catch (e) {
            }
        });
        this.mobileRepository = mobileRepository;
    }
}
exports.MobileController = MobileController;

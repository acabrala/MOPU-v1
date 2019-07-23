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
const Problema_1 = require("../model/Problema");
class ProblemaRepositoty {
    constructor() {
        this.createProblem = (problema) => __awaiter(this, void 0, void 0, function* () {
            // const { latitude, longitude } = incidente.location;
            return yield Problema_1.default.create(problema);
            // return await Problema.findOne({
            //     geometry: {
            //         $geoIntersects: {
            //             $geometry: {
            //                 type: 'Point',
            //                 coordinates: [longitude, latitude]
            //             }
            //         }
            //     }
            // })
        });
    }
}
exports.ProblemaRepositoty = ProblemaRepositoty;

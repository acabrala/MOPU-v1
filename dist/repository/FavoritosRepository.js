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
const Favoritos_1 = require("../model/Favoritos");
class FavoritosRepository {
    constructor() {
        this.createFavorites = (favoritos) => __awaiter(this, void 0, void 0, function* () {
            return yield Favoritos_1.Favoritos.create(favoritos);
        });
        this.deleteFavorites = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield Favoritos_1.Favoritos.destroy({
                where: {
                    id: id.id
                }
            });
        });
        this.updateFavorites = (favorites) => __awaiter(this, void 0, void 0, function* () {
            let id = favorites.id;
            delete favorites.id;
            return yield Favoritos_1.Favoritos.update(favorites, {
                where: {
                    id: id
                }
            });
        });
    }
}
exports.FavoritosRepository = FavoritosRepository;

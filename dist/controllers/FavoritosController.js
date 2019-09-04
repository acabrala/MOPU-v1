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
class FavoritosController {
    constructor(favoritosRepository) {
        this.createNewFavorites = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const favoritos = yield this.favoritosRepository.createFavorites(req.body);
                if (!favoritos) {
                    return res.status(402).json(new Response_1.Response(true, "Não conseguimos salvar seu favorito!", null));
                }
                return res.status(200).json(new Response_1.Response(false, "Favorito salvo com sucesso", { "id_favorito": favoritos.dataValues.id }));
            }
            catch (e) {
                res.status(400).json(new Response_1.Response(true, e.message, null));
            }
        });
        this.deleteFavorites = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const favoritos = this.favoritosRepository.deleteFavorites(req.body);
                if (!favoritos) {
                    res.status(402).json(new Response_1.Response(true, "Não conseguimos excluir seu favorito", null));
                }
                res.status(202).json(new Response_1.Response(false, "Favorito excluído com sucesso", favoritos));
            }
            catch (e) {
                res.status(400).json(new Response_1.Response(true, e.message, null));
            }
        });
        this.updateFavorites = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updateFavorites = this.favoritosRepository.updateFavorites(req.body);
                if (!updateFavorites) {
                    res.status(402).json(new Response_1.Response(true, "Não conseguimos realizar a atualização do seu favorito", null));
                }
                res.status(200).json(new Response_1.Response(false, "Favorito atualizado com sucess", false));
            }
            catch (e) {
                res.status(400).json(new Response_1.Response(true, e.message, null));
            }
        });
        this.favoritosRepository = favoritosRepository;
    }
}
exports.FavoritosController = FavoritosController;

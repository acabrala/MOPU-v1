import { Response } from '../model/Response';
import { FavoritosRepository } from '../repository/FavoritosRepository'

export class FavoritosController {

    private favoritosRepository: FavoritosRepository;

    constructor(favoritosRepository: FavoritosRepository) {
        this.favoritosRepository = favoritosRepository
    }

    createNewFavorites = async (req, res) => {
        try {

            const favoritos = await this.favoritosRepository.createFavorites(req.body)

            if (!favoritos) {

                return res.status(402).json(new Response(true, "Não conseguimos salvar seu favorito!", null))
            }

            return res.status(200).json(new Response(false, "Favorito salvo com sucesso",{"id_favorito" : favoritos.dataValues.id}))
        } catch (e) {
            res.status(400).json(new Response(true, e.message, null))
        }
    }

    deleteFavorites = async (req, res) => {
        try {
            const favoritos = this.favoritosRepository.deleteFavorites(req.body)

            if (!favoritos) {
                res.status(402).json(new Response(true, "Não conseguimos excluir seu favorito", null))
            }

            res.status(202).json(new Response(false, "Favorito excluído com sucesso", favoritos))
        } catch (e) {
            res.status(400).json(new Response(true, e.message, null))
        }

    }

    updateFavorites = async (req, res) => {
        try {

            const updateFavorites = this.favoritosRepository.updateFavorites(req.body)

            if (!updateFavorites) {

                res.status(402).json(new Response(true, "Não conseguimos realizar a atualização do seu favorito", null))

            }

            res.status(200).json(new Response(false, "Favorito atualizado com sucess", false))

        } catch (e) {

            res.status(400).json(new Response(true, e.message, null))

        }
    }

}
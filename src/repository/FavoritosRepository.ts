import { Favoritos } from "../model/Favoritos";

export class FavoritosRepository {


    createFavorites = async (favoritos) => {

        return await Favoritos.create(favoritos)

    }

    deleteFavorites = async (id) => {

        return await Favoritos.destroy({
            where: {
                id: id.id
            }
        });
    }

    updateFavorites = async (favorites) => {

        let id = favorites.id
        delete favorites.id

        return await Favoritos.update(favorites, {
            where: {
                id: id
            }
        });
    }
}
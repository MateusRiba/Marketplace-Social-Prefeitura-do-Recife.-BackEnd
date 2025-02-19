const Favorite = require('../models/Favorite');
const { Op } = require('sequelize');

module.exports = {

createFavorite: async(req, res) =>{
    const {userIdentifier, productId} = req.body;
    try{
        const[favorite, created] = await Favorite.findOrCreate({
            where: {userIdentifier, productId}
        });
    if(created){
        return res.status(201).json({message: 'Produto adicionado aos favoritos', favorite});
    }
    return res.status(400).json({message: 'Este produto já está nos seus favoritos'})
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
},

getAllFavorites: async (req, res) => {
    try {
      const favorites = await Favorite.findAll();

      if (favorites.length === 0) {
        return res.status(404).json({ message: 'Nenhum favorito encontrado.' });
      }

      return res.status(200).json(favorites);
    } catch (error) {
      console.error('Erro ao buscar favoritos:', error);
      return res.status(500).json({ error: error.message });
    }
  },

  getFavoriteById: async (req, res) => {
    const { id } = req.params;

    try {
      const favorite = await Favorite.findByPk(id);
      if (!favorite) {
        return res.status(404).json({ message: 'Favorito não encontrado.' });
      }
      return res.status(200).json(favorite);
    } catch (error) {
      console.error('Erro ao buscar favorito por ID:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}
}

}


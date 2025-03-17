const Favorite = require('../models/favorite');
const { Op } = require('sequelize');

module.exports = {

createFavorite: async(req, res) =>{
    const {userIdentifier, productId} = req.body;
    
    if (!req.user) { //Alterado nos testes unitarios
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }
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
},

deleteFavorite: async (req, res) => {
  const { id } = req.params;
  try {
    const favorite = await Favorite.findByPk(id);
    if (!favorite) {
      return res.status(404).json({ message: 'Favorito não encontrado.' });
    }
    await Favorite.destroy({ where: { id } });
    return res.status(200).json({ message: 'Favorito removido com sucesso!' });
  } catch (error) {
    console.error('Erro ao remover favorito:', error);
    return res.status(500).json({ error: error.message });
  }
},

  // Função para remover todos os favoritos de uma vez
  deleteAllFavorites: async (req, res) => {
    try {
      const count = await Favorite.destroy({ where: {} });
      if (count === 0) {
        return res.status(404).json({ message: 'Nenhum favorito encontrado para remover.' });
      }
      return res.status(200).json({ message: `${count} favorito(s) removido(s) com sucesso.` });
    } catch (error) {
      console.error('Erro ao remover todos os favoritos:', error);
      return res.status(500).json({ error: error.message });
    }
  }
}



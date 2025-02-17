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
}
}
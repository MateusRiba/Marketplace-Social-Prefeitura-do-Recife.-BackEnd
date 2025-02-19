
const express = require('express');
const router = express.Router();

const FavoriteController = require('../controllers/FavoriteController');

// Criando novo favorito
router.post('/add', FavoriteController.createFavorite)

//Get para todos os favoritos

router.get('/', FavoriteController.getAllFavorites);

// Rota para buscar um favorito por ID
router.get('/:id', FavoriteController.getFavoriteById);

module.exports = router;

const express = require('express');
const router = express.Router();

const FavoriteController = require('../controllers/FavoriteController');

// Criando novo favorito
router.post('/add', FavoriteController.createFavorite)

module.exports = router;
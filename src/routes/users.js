const express = require("express");
const router = express.Router();
const { setUserCookie, getUserCookie } = require("../controllers/UserController");

//Salva os cookies do usuário
router.post("/set-cookie", setUserCookie);

// Pega informações dos cookies
router.get("/get-cookie", getUserCookie);

module.exports = router;

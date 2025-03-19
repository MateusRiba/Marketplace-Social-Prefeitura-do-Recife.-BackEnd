const axios = require("axios");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email e senha são obrigatórios" });
        }

        const response = await axios.post("https://bora-impactar-prd.setd.rdmapps.com.br/api/login.json", {
            email, password
        });

        const { user, ngo } = response.data;
        if (!user || !user.email) {
            return res.status(500).json({ error: "Resposta inválida da API externa." });
        }

        const token = jwt.sign(
            { 
                email: user.email, 
                name: user.name, 
                role: "admin" 
            },
            process.env.JWT_SECRET || "seuSegredoJWT",
            { expiresIn: "1h" }
        );
        

      
        res.cookie("authToken", token, {
            httpOnly: true,
            secure: false, 
            maxAge: 3600000 
        });

        return res.status(200).json({ message: "Login bem-sucedido", user });

    } catch (error) {
        console.error("❌ Erro na autenticação:", error.message);
        return res.status(500).json({ error: "Erro ao autenticar usuário." });
    }
};



const TokenBlacklist = require("../models/TokenBlacklist");

const logout = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Pega o token do header

        if (!token) {
            return res.status(400).json({ error: "Token não fornecido" });
        }

        // Salva o token na blacklist para impedir seu uso futuro
        await TokenBlacklist.create({ token });

        return res.status(200).json({ message: "Logout realizado com sucesso" });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao fazer logout" });
    }
};

module.exports = { login, logout };

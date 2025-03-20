const axios = require("axios");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email e senha são obrigatórios" });
        }

        console.log("🔹 Enviando requisição para a API externa...");

        // Faz a requisição para a API externa
        const response = await axios.post("https://bora-impactar-prd.setd.rdmapps.com.br/api/login.json", {
            email,
            password
        });

        console.log("✅ Resposta da API externa:", response.data);

        const { message, user, ngo } = response.data;

        // Verifica se os dados de usuário vieram corretamente
        if (!user || !user.email) {
            return res.status(500).json({ error: "Resposta inválida da API externa.", detalhes: response.data });
        }

        // Gera um token JWT com os dados do usuário e da ONG (se houver)
        const token = jwt.sign(
            { 
                email: user.email, 
                name: user.name,
                ngo: ngo ? ngo.name : null  // Se houver ONG, inclui o nome dela
            },
            process.env.JWT_SECRET || "seuSegredoJWT",
            { expiresIn: "1h" }
        );

        return res.status(200).json({ token, user, ngo });

    } catch (error) {
        console.error("❌ Erro na autenticação:", error.message);
        
        if (error.response) {
            console.error("📌 Resposta do servidor externo:", error.response.data);
            return res.status(error.response.status).json({ error: error.response.data });
        }

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

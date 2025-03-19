const axios = require("axios");
const jwt = require("jsonwebtoken");
const TokenBlacklist = require("../models/TokenBlacklist");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email e senha são obrigatórios" });
        }

        let response;
        try {
            response = await axios.post(
                "https://bora-impactar-prd.setd.rdmapps.com.br/api/login.json",
                { email, password }
            );
        } catch (error) {
            if (error.response && error.response.status === 401) {
                return res.status(401).json({ error: "Credenciais inválidas." });
            }
            return res.status(500).json({ error: "Erro na autenticação." });
        }

        // ✅ Garante que a API externa retornou um usuário válido antes de gerar o token
        if (!response.data || !response.data.user || !response.data.user.email) {
            return res.status(401).json({ error: "Autenticação falhou. Usuário inválido." });
        }

        const { user, ngo } = response.data;

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

        return res.status(200).json({ message: "Login bem-sucedido", user, token });

    } catch (error) {
        console.error("❌ Erro na autenticação:", error.message);
        return res.status(500).json({ error: "Erro ao autenticar usuário." });
    }
};

const logout = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(400).json({ error: "Token não fornecido" });
        }

        // ✅ Verifica se o token já está na blacklist
        const tokenExists = await TokenBlacklist.findOne({ where: { token } });
        if (tokenExists) {
            return res.status(400).json({ error: "Token já está na blacklist" });
        }

        // ✅ Salva o token na blacklist para impedir seu uso futuro
        await TokenBlacklist.create({ token });

        return res.status(200).json({ message: "Logout realizado com sucesso" });
    } catch (error) {
        console.error("❌ Erro ao fazer logout:", error.message);
        return res.status(500).json({ error: "Erro ao fazer logout" });
    }
};

module.exports = { login, logout };

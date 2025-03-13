const setUserCookie = (req, res) => {
    const { name, preferences } = req.body;

    // Criar objeto com as preferências do usuário
    const userData = {
        name: name || "Visitante",
        preferences: preferences || { theme: "light", language: "pt-BR" }
    };

    // Cookie JSON de acordo com cada usuário
    res.cookie("user_data", JSON.stringify(userData), {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
        httpOnly: false, 
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax"
    });

    res.status(200).json({ message: "Informações do usuário armazenadas com sucesso!" });
};

// Resgata osdados dos cookies para serem enviados para o front end
const getUserCookie = (req, res) => {
    const userCookie = req.cookies.user_data;

    if (!userCookie) {
        return res.status(404).json({ message: "Nenhum dado encontrado no cookie" });
    }

    res.status(200).json(JSON.parse(userCookie));
};

module.exports = { setUserCookie, getUserCookie };

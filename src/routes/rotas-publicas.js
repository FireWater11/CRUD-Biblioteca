import express from 'express';

const rotas_publicas = express.Router();

rotas_publicas.post('/auth/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ mensagem: "Username e senha são obrigatórios" });
    };

    try {
        prisma.User.create({
            data: {
                username:username,
                password:password
            }
        })
    } catch (error) {
        console.log("RESOLVE LIXO")
    }
});

export default rotas_publicas;
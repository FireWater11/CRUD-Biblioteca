import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function cadastrarUsuario(req, res) {
    const { username, password } = req.body;

    const verificarUsernameDB = await prisma.User.findUnique({
        where: {username}
    })

    if (!username || !password) {
        return res.status(400).json({ mensagem: "Username e senha são obrigatórios" });
    };

    if (verificarUsernameDB) {
        return res.status(409).json({ mensagem: "Username já esta cadastrado" });
    };

    if(password.length < 4) {
        return res.status(400).json({ message: "Senha deve ter pelo menos 4 caracteres" });
    };

    try {
        await prisma.User.create({
            data: {
                username: username,
                password: password
            }
        });

        return res.status(201).json({ mensagem: `Usuario cadastrado com sucesso!` });

    } catch (error) {
        console.log(error)
    }
}
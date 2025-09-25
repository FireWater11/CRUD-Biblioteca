import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function cadastrarUsuario(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ mensagem: "Username e senha são obrigatórios" });
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
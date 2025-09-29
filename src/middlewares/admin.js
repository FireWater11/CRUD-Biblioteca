import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function verificarAdmin(req, res, next) {
    
    const id = req.user.id;

    try {

        // verificar se o usuario existe no banco
        const user = await prisma.User.findUnique({
            where: {id:Number(id)}
        })

        // verifcar SE existe e SE é admin
        if (!user || !user.isAdmin) {
            return res.status(403).json({ mensagem: "somente admin pode realizar essa funcionalidade" });
        }

        next();

    } catch(error) {
        return res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
}










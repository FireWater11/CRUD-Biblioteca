import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function verificarAdmin(req, res, next) {
    
    try {

        // verificar se o usuario existe no banco
        const user = await prisma.User.findUnique({
            where: {id: req.user.id}
        })

        // verifcar SE existe e SE é admin
        if (!user || user.isAdmin === false) {
            return res.status(403).json({ mensagem: "somente admin pode realizar essa funcionalidade" });
        }

        next();

    } catch(error) {
        console.log(error)
    }
}










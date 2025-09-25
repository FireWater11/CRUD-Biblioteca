import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function buscarLivro(req, res) {
    try {
        const livrosBD = await prisma.Book.findMany();
        res.status(200).json(livrosBD);
    } catch (error) {
        console.log(error)
    }
};

export async function buscarLivroId(req, res) {
    try {
        const id = parseInt(req.params.id);
        const book = await prisma.Book.findUnique( 
            {
                where: {
                    id:Number(id)
                }
            }
        );

        res.status(200).json(book);
    } catch (error) {
        console.log(error);
    }
};

// export async function adicionarLivro(req, res) {
    
// }
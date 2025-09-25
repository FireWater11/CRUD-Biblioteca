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

export async function adicionarLivro(req, res) {
    const {title, autor} = req.body;

    if (!title || !autor) {
        return res.status(400).json({ mensagem: "Titulo e autor são obrigatórios" });
    }

    try {
        const novoLivro = await prisma.Book.create({
            data: {
                title:title,
                autor:autor
            }
        });

        // return res.status(201).json({ mensagem: `O Livro ${title} foi cadastrado com sucesso!` });
        return res.status(201).json({ mensagem: `O Livro foi cadastrado com sucesso!` ,novoLivro });


    } catch (error) {
        console.log(error);
    }
}
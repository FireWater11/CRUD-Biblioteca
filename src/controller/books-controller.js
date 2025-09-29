import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// BUSCAR LIVROS
export async function buscarLivro(req, res) {
    try {
        const livrosBD = await prisma.Book.findMany();
        res.status(200).json(livrosBD);
    } catch (error) {
        console.log(error)
    }
};

// BUSCAR LIVRO PELO ID
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

        if (!book) {
            return res.status(404).json({ mensagem: "livro não encontrado" });
        };

        res.status(200).json(book);
    } catch (error) {
        console.log(error);
    }
};

// ADICIONAR LIVRO
export async function adicionarLivro(req, res) {
    const {title, autor} = req.body;

    if (!title || !autor) {
        return res.status(400).json({ mensagem: "Titulo e autor são obrigatórios" });
    };

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
};

// DELETAR LIVRO
export async function deletarLivro(req, res) {
    const idLivro = parseInt(req.params.id);

    if (!idLivro) {
        return res.status(400).json({mensagem: "é necessario um ID para realizar a tarefa"});
    };  

    try {
        const removerLivro = await prisma.Book.delete({
            where: {
                id:Number(idLivro)
            }
        });

        res.status(200).json({mensagem: `o livro ${removerLivro.title} foi deletado`});

    } catch (error) {
        console.log(error);
    }
    
};

export async function pegarLivroEmprestado(req, res) {
    const idLivroEmprestar = parseInt(req.params.id);

    if (!idLivroEmprestar) {
        return res.status(400).json({mensagem: "é necessario um ID para realizar a tarefa"});
    }

    try {
        const idLivro = await prisma.Book.findUnique({
            where: {
                id:Number(idLivroEmprestar)
            }
        });

        if (!idLivro) {
            return res.status().json({mensagem: "o livro nao existe no banco de dados"});
        };

        if () {

        };


    } catch (error) {
        console.log(error);
    }
};
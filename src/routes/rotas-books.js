import express from 'express';
import { adicionarLivro, buscarLivro, buscarLivroId } from '../controller/books-controller.js';

const rotas_livros = express.Router();

rotas_livros.get('/books', (req, res) => {
    buscarLivro(req, res);
});

rotas_livros.get('/books/:id', (req, res) => {
    buscarLivroId(req, res);
})

rotas_livros.post('/books', (req, res) => {
    adicionarLivro(req, res);
})

export default rotas_livros;
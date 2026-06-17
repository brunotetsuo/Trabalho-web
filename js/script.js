class Livro {
    constructor(id, titulo, autor, categoria, ano, status) {
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.categoria = autor;
        this.ano = ano;
        this.status = status;
    }
}

var livrosCadastrados = JSON.parse(localStorage.getItem('livros')) || [];

function listarLivros() {
    const catalogoLivros = JSON.parse(localStorage.getItem('livros')) || [];
    const catalogo = document.querySelector('.catalogo');
    catalogo.innerHTML = '';
    if (catalogoLivros.length === 0) {
        const vazio = document.createElement('div');
        vazio.className = 'livro livro-vazio';
        vazio.innerHTML = `
            <h3>Nenhum livro encontrado</h3>
            <p>Cadastre um novo livro no cat&aacute;logo.</p>
        `;
        catalogo.appendChild(vazio);
        return;
    }
    catalogoLivros.forEach(livro => {
        const livroElement = document.createElement('div');
        livroElement.className = 'livro';
        livroElement.innerHTML = `
            <h3>${livro.titulo}</h3>
            <p>Autor: ${livro.autor}</p>
            <p>Categoria: ${livro.categoria}</p>
            <p>Ano: ${livro.ano}</p>
        `;
        catalogo.appendChild(livroElement);
    });
}

document.addEventListener('DOMContentLoaded', listarLivros);

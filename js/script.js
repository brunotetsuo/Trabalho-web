class Livro {
    constructor(id, titulo, autor, categoria, ano, status) {
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.categoria = categoria;
        this.ano = ano;
        this.status = status;
    }
}

class Emprestimo {
    constructor(id, aluno, livro, dataEmprestimo, dataDevolucao, isAtivo) {
        this.id = id;
        this.aluno = aluno;
        this.livro = livro;
        this.dataEmprestimo = dataEmprestimo;
        this.dataDevolucao = dataDevolucao;
        this.isAtivo = isAtivo;
    }
}

var livrosCadastrados = JSON.parse(localStorage.getItem('livros')) || [];
var emprestimosCadastrados = JSON.parse(localStorage.getItem('emprestimos')) || [];

// Função para adicionar um livro ao catálogo
function adicionarLivro() {
    const titulo = document.getElementById('titulo').value.trim();
    const autor = document.getElementById('autor').value.trim();
    const categoria = document.getElementById('categoria').value.trim();
    const ano = document.getElementById('ano').value.trim();

    if (!titulo || !autor || !categoria || !ano) {
        alert('Preencha os campos obrigatórios: Título, Autor, Categoria e Ano!');
        return;
    }

    const id = livrosCadastrados.length > 0 ? String(Math.max(...livrosCadastrados.map(item => Number(item.id))) + 1) : '1';
    const livro = new Livro(id, titulo, autor, categoria, ano, 'Disponível');
    livrosCadastrados.push(livro);
    localStorage.setItem("livros", JSON.stringify(livrosCadastrados));

    alert(`Livro "${livro.titulo}" adicionado com sucesso!`);
    console.log('Livro cadastrado:', livro);

    document.getElementById('titulo').value = '';
    document.getElementById('autor').value = '';
    document.getElementById('categoria').value = '';
    document.getElementById('ano').value = '';
}

// Função para listar os livros no catálogo
async function carregarLivros() {
    listarLivros();
}

document.addEventListener("DOMContentLoaded", carregarLivros);

function listarLivros() {
    const catalogoLivros = JSON.parse(localStorage.getItem('livros')) || [];
    document.querySelector('.catalogo').innerHTML = '';
    catalogoLivros.forEach(livro => {
        const livroElement = document.createElement('div');
        livroElement.className = 'livro';
        livroElement.innerHTML = `
            <h3>${livro.titulo}</h3>
            <p>Autor: ${livro.autor}</p>
            <p>Categoria: ${livro.categoria}</p>
            <p>Ano: ${livro.ano}</p>
            <p>Status: ${livro.status}</p>
        `;
        if (livro.status === 'Disponível') {
            livroElement.innerHTML += `
                    <div class="botoes-container">
                        <button id="botao_reserva">Empréstimo</button>
                        <button id="botao_deletar" data-id="${livro.id}">X</button>
                        <button id="botao_editar">✏️</button>
                    </div>
                `;
            const btnReserva = livroElement.querySelector('#botao_reserva');
            btnReserva.addEventListener('click', () => {
                window.location.href = `emprestimo.html?id=${livro.id}`;
            });
            const btnDeletar = livroElement.querySelector('#botao_deletar');
            btnDeletar.addEventListener('click', () => deletarLivro(livro.id));
            const btnEditar = livroElement.querySelector('#botao_editar');
            btnEditar.addEventListener('click', () => {
                window.location.href = `editar.html?id=${livro.id}`;
            });
        } else {
            livroElement.innerHTML += '<p id="emprestado">Não está disponível</p>';
        }
        document.querySelector('.catalogo').appendChild(livroElement);
    });
}

// Função para deletar um livro do catálogo
function deletarLivro(id) {
    if (!confirm('Tem certeza que deseja deletar este livro?')) return;

    const indice = livrosCadastrados.findIndex(l => String(l.id) === String(id));
    if (indice > -1) {
        livrosCadastrados.splice(indice, 1);
        localStorage.setItem('livros', JSON.stringify(livrosCadastrados));
        listarLivros();
    }
}

// Função para editar um livro do catálogo
function editarLivro() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const titulo = document.getElementById('titulo').value.trim();
    const autor = document.getElementById('autor').value.trim();
    const categoria = document.getElementById('categoria').value.trim();
    const ano = document.getElementById('ano').value.trim();
    const status = document.getElementById('status').value.trim();

    if (!titulo && !autor && !categoria && !ano && !status) {
        alert('Nenhum campo preenchido para edição. Preencha pelo menos um campo para atualizar o livro.');
        return;
    }

    const indice = livrosCadastrados.findIndex(l => String(l.id) === String(id));
    if (indice > -1) {
        livrosCadastrados[indice].titulo = titulo || livrosCadastrados[indice].titulo;
        livrosCadastrados[indice].autor = autor || livrosCadastrados[indice].autor;
        livrosCadastrados[indice].categoria = categoria || livrosCadastrados[indice].categoria;
        livrosCadastrados[indice].ano = ano || livrosCadastrados[indice].ano;
        livrosCadastrados[indice].status = status || livrosCadastrados[indice].status;
        localStorage.setItem('livros', JSON.stringify(livrosCadastrados));
        alert(`Livro ${livrosCadastrados[indice].titulo} editado com sucesso!`);
        listarLivros();
    } else {
        alert('Livro não encontrado para edição.');
    }
}

// Função para listar os livros emprestados
async function carregarLivrosEmprestados() {
    listarLivrosEmprestados();
}

document.addEventListener("DOMContentLoaded", carregarLivrosEmprestados);

function listarLivrosEmprestados() {
    const emprestimosAtivos = emprestimosCadastrados.filter(e => e.isAtivo);
    const catalogoLivros = (JSON.parse(localStorage.getItem('livros')) || [])
        .filter(livro => emprestimosAtivos.some(e => e.livro.id === livro.id));
    document.querySelector('.livros_para_devolucao').innerHTML = '';
    catalogoLivros.forEach(livro => {
        const livroElement = document.createElement('div');
        livroElement.className = 'livro';
        livroElement.innerHTML = `
            <h3>${livro.titulo}</h3>
            <p>Autor: ${livro.autor}</p>
            <p>Categoria: ${livro.categoria}</p>
            <p>Ano: ${livro.ano}</p>
            <p>Status: ${livro.status}</p>
            <p>Aluno: ${emprestimosAtivos.find(e => String(e.livro.id) === String(livro.id)).aluno}</p>
        `;

        livroElement.innerHTML += `
            <div class="botoes-container">
                <button id="botao_devolver">Devolver</button>
            </div>
        `;
        const btnDevolver = livroElement.querySelector('#botao_devolver');
        btnDevolver.addEventListener('click', () => devolverLivro(livro.id));
        document.querySelector('.livros_para_devolucao').appendChild(livroElement);
    });
}

function devolverLivro(id) {
    const indiceLivro = livrosCadastrados.findIndex(l => String(l.id) === String(id));
    const indiceEmprestimo = emprestimosCadastrados.findIndex(e => String(e.livro.id) === String(id) && e.isAtivo);
    if (indiceEmprestimo !== -1) {
        emprestimosCadastrados[indiceEmprestimo].isAtivo = false;
        localStorage.setItem('emprestimos', JSON.stringify(emprestimosCadastrados));
    }
    if (!confirm('Tem certeza que deseja devolver este livro?')) return;
    if (indiceLivro !== -1) {
        livrosCadastrados[indiceLivro].status = 'Disponível';
        localStorage.setItem('livros', JSON.stringify(livrosCadastrados));
        listarLivrosEmprestados();
        listarLivros();
        alert(`Livro ${livrosCadastrados[indiceLivro].titulo} devolvido com sucesso!`);
    } else {
        alert('Livro não encontrado para devolução.');
    }
}

// Função para cadastrar um empréstimo
async function carregarEmprestimo() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const livro = livrosCadastrados.find(l => String(l.id) === String(id));
    document.getElementById('livro').value = livro ? livro.titulo : '';
}
document.addEventListener("DOMContentLoaded", carregarEmprestimo);

function cadastrarEmprestimo() {
    const params = new URLSearchParams(window.location.search);
    const idLivro = params.get('id');
    const aluno = document.getElementById('aluno').value.trim();
    const livroIndice = livrosCadastrados.findIndex(l => String(l.id) === String(idLivro));
    const dataEmprestimo = document.getElementById('data_emprestimo').value.trim();
    const dataDevolucao = document.getElementById('data_devolucao').value.trim();

    if (!aluno || !dataEmprestimo || !dataDevolucao) {
        alert('Preencha os campos obrigatórios: Aluno, Data de Empréstimo e Data de Devolução!');
        return;
    }

    const emprestimoId = emprestimosCadastrados.length > 0 ? String(Math.max(...emprestimosCadastrados.map(item => Number(item.id))) + 1) : '1';
    const emprestimo = new Emprestimo(emprestimoId, aluno, livrosCadastrados[livroIndice], dataEmprestimo, dataDevolucao, true);
    emprestimosCadastrados.push(emprestimo);
    localStorage.setItem("emprestimos", JSON.stringify(emprestimosCadastrados));

    if (livroIndice > -1) {
        livrosCadastrados[livroIndice].status = 'Emprestado';
        localStorage.setItem('livros', JSON.stringify(livrosCadastrados));
    } else {
        alert('Livro não encontrado para empréstimo.');
    }
    alert(`Empréstimo do livro "${livrosCadastrados[livroIndice].titulo}" para o aluno "${emprestimo.aluno}" cadastrado com sucesso!`);

    document.getElementById('aluno').value = '';
    document.getElementById('livro').value = '';
    document.getElementById('data_emprestimo').value = '';
    document.getElementById('data_devolucao').value = '';
}

// Função para buscar livros no catálogo
function buscarLivro() {
    const termoBusca = document.getElementById('busca').value.toLowerCase();
    const livrosFiltrados = livrosCadastrados.filter(livro =>
        livro.titulo.toLowerCase().includes(termoBusca) ||
        livro.autor.toLowerCase().includes(termoBusca) ||
        livro.categoria.toLowerCase().includes(termoBusca) ||
        livro.ano.toString().includes(termoBusca) ||
        livro.status.toLowerCase().includes(termoBusca)
    );
    document.querySelector('.catalogo').innerHTML = '';
    livrosFiltrados.forEach(livro => {
        const livroElement = document.createElement('div');
        livroElement.className = 'livro';
        livroElement.innerHTML = `
            <h3>${livro.titulo}</h3>
            <p>Autor: ${livro.autor}</p>
            <p>Categoria: ${livro.categoria}</p>
            <p>Ano: ${livro.ano}</p>
            <p>Status: ${livro.status}</p>
        `;
        if (livro.status === 'Disponível') {
            livroElement.innerHTML += `
                    <div class="botoes-container">
                        <button id="botao_reserva">Empréstimo</button>
                        <button id="botao_deletar" data-id="${livro.id}">X</button>
                        <button id="botao_editar">✏️</button>
                    </div>
                `;
            const btnReserva = livroElement.querySelector('#botao_reserva');
            btnReserva.addEventListener('click', () => {
                window.location.href = `emprestimo.html?id=${livro.id}`;
            });
            const btnDeletar = livroElement.querySelector('#botao_deletar');
            btnDeletar.addEventListener('click', () => deletarLivro(livro.id));
            const btnEditar = livroElement.querySelector('#botao_editar');
            btnEditar.addEventListener('click', () => {
                window.location.href = `editar.html?id=${livro.id}`;
            });
        } else {
            livroElement.innerHTML += '<p id="emprestado">Não está disponível</p>';
        }
        document.querySelector('.catalogo').appendChild(livroElement);
    });
}

// Função para listar o histórico de empréstimos
async function carregarHistorico() {
    listarHistorico();
}

document.addEventListener("DOMContentLoaded", carregarHistorico);

function listarHistorico() {
    const emprestimosAtivos = emprestimosCadastrados
    const catalogoLivros = (JSON.parse(localStorage.getItem('livros')) || [])
    document.querySelector('.historico_emprestimos').innerHTML = '';
    emprestimosAtivos.forEach(emprestimo => {
        const livro = catalogoLivros.find(l => String(l.id) === String(emprestimo.livro.id));
        const emprestimoElement = document.createElement('div');
        emprestimoElement.className = 'livro';
        emprestimoElement.innerHTML = `
            <h3>${livro.titulo}</h3>
            <p>Autor: ${livro.autor}</p>
            <p>Aluno: ${emprestimo.aluno}</p>
            <p>Status: ${emprestimo.isAtivo ? 'Ativo' : 'Finalizado'}</p>
            <p>Data de Empréstimo: ${emprestimo.dataEmprestimo}</p>
            <p>Data de Devolução: ${emprestimo.dataDevolucao}</p>
        `;
        document.querySelector('.historico_emprestimos').appendChild(emprestimoElement);
    });
}

// Função para inserir o footer
document.addEventListener("DOMContentLoaded", () => {
    const footer = `
        <footer class="footer">
            <div class="footer-container">
                <h2>Contato</h2>

                <div class="contatos">
                    <a href="https://instagram.com/seuusuario" target="_blank" class="link">
                        <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram">
                        <span>Instagram</span>
                    </a>

                    <a href="https://wa.me/5599999999999" target="_blank" class="link">
                        <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp">
                        <span>WhatsApp</span>
                    </a>
                </div>
            </div>
        </footer>
    `;

    const container = document.getElementById("footer-container");
    if (container) {
        container.innerHTML = footer;
    }
});
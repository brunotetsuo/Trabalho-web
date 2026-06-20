function inserirDadosTeste() {

const livros = [
    new Livro("1", "Dom Casmurro", "Machado de Assis", "Romance", 1899, "Emprestado"),
    new Livro("2", "O Hobbit", "J.R.R. Tolkien", "Fantasia", 1937, "Emprestado"),
    new Livro("3", "Clean Code", "Robert C. Martin", "Tecnologia", 2008, "Emprestado"),
    new Livro("4", "1984", "George Orwell", "Ficção", 1949, "Emprestado"),
    new Livro("5", "A Revolução dos Bichos", "George Orwell", "Ficção", 1945, "Emprestado"),
    new Livro("6", "Harry Potter", "J.K. Rowling", "Fantasia", 1997, "Emprestado"),
    new Livro("7", "O Pequeno Príncipe", "Antoine de Saint-Exupéry", "Infantil", 1943, "Emprestado"),
    new Livro("8", "Código Limpo", "Robert C. Martin", "Tecnologia", 2008, "Emprestado"),
    new Livro("9", "Entendendo Algoritmos", "Aditya Bhargava", "Tecnologia", 2016, "Emprestado"),
    new Livro("10", "Sapiens", "Yuval Noah Harari", "História", 2011, "Emprestado"),

    new Livro("11", "O Senhor dos Anéis", "J.R.R. Tolkien", "Fantasia", 1954, "Disponível"),
    new Livro("12", "Duna", "Frank Herbert", "Ficção Científica", 1965, "Disponível"),
    new Livro("13", "A Arte da Guerra", "Sun Tzu", "Estratégia", -500, "Disponível"),
    new Livro("14", "Pai Rico Pai Pobre", "Robert Kiyosaki", "Finanças", 1997, "Disponível"),
    new Livro("15", "Java Efetivo", "Joshua Bloch", "Tecnologia", 2018, "Disponível"),
    new Livro("16", "O Código Da Vinci", "Dan Brown", "Suspense", 2003, "Disponível"),
    new Livro("17", "Sherlock Holmes", "Arthur Conan Doyle", "Mistério", 1892, "Disponível"),
    new Livro("18", "Memórias Póstumas", "Machado de Assis", "Romance", 1881, "Disponível"),
    new Livro("19", "A Metamorfose", "Franz Kafka", "Clássico", 1915, "Disponível"),
    new Livro("20", "Percy Jackson", "Rick Riordan", "Fantasia", 2005, "Disponível")
];

const emprestimos = [
    new Emprestimo("1", "João Silva", livros[0], "2026-06-01", "2026-06-15", true),
    new Emprestimo("2", "Maria Souza", livros[1], "2026-06-02", "2026-06-16", true),
    new Emprestimo("3", "Pedro Santos", livros[2], "2026-06-03", "2026-06-17", true),
    new Emprestimo("4", "Ana Costa", livros[3], "2026-06-04", "2026-06-18", true),
    new Emprestimo("5", "Lucas Lima", livros[4], "2026-06-05", "2026-06-19", true),
    new Emprestimo("6", "Juliana Rocha", livros[5], "2026-06-06", "2026-06-20", true),
    new Emprestimo("7", "Carlos Oliveira", livros[6], "2026-06-07", "2026-06-21", true),
    new Emprestimo("8", "Fernanda Alves", livros[7], "2026-06-08", "2026-06-22", true),
    new Emprestimo("9", "Bruno Pereira", livros[8], "2026-06-09", "2026-06-23", true),
    new Emprestimo("10", "Camila Martins", livros[9], "2026-06-10", "2026-06-24", true)
];

localStorage.setItem("livros", JSON.stringify(livros));
localStorage.setItem("emprestimos", JSON.stringify(emprestimos));

console.log("Dados de teste inseridos com sucesso!");
}

if (!localStorage.getItem("livros")) {
    inserirDadosTeste();
}
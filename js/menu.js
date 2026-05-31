function ativarLinkAtual() {
	const paginaAtual =
		window.location.pathname.split("/").pop() || "index.html";

	const links = document.querySelectorAll(".menu a");

	links.forEach(function (link) {
		const href = link.getAttribute("href");
		if (href === paginaAtual) {
			link.classList.add("ativo");
		}
	});
}

function configurarBotaoMenu() {
	const botao = document.getElementById("menuBotao");
	const menu = document.getElementById("menu");

	if (!botao || !menu) return;

	botao.addEventListener("click", function () {
		menu.classList.toggle("aberto");
	});
}

async function carregarMenu() {
	const menu_container = document.getElementById("menu-container");

	if (!menu_container) return;

	try {
		const resposta = await fetch("../components/menu.html");
		const html = await resposta.text();
		menu_container.innerHTML = html;
	} catch (erro) {
		menu_container.innerHTML = "<p>Erro ao carregar o menu.</p>";
	}

	configurarBotaoMenu();
	ativarLinkAtual();
}

document.addEventListener("DOMContentLoaded", carregarMenu);
import * as cookie from './cookieStore.js';
import * as idb from './indexedDB.js';
import * as local from './localStorage.js';
import { renderizarLista } from './contatos.js';
import { aplicarTema, salvarTema, carregarTema } from './tema.js';

const fontes = { cookie, idb, local };

const seletor = document.querySelector('#armazenamento');
const lista = document.querySelector('#lista');
const form = document.querySelector('#form');
const msg = document.querySelector('#msg');
const toggle = document.querySelector('#tema-toggle');
const btn_carregar = document.querySelector('#carregar');

/** Lista em memória. Sempre trabalha com objetos {nome, telefone}. */
let contatos = [];

function fonteAtual() {
  return fontes[seletor.value];
}

function mostrar(texto, erro = false) {
  msg.textContent = texto;
  msg.className = erro ? 'erro' : '';
}

function desenhar() {
  renderizarLista(lista, contatos, remover);
}

/** Lê JSON do armazenamento escolhido e converte em array. */
async function carregar() {
  try {
    const json = await fonteAtual().carregarJSON();
    const dados = JSON.parse(json);
    contatos = Array.isArray(dados) ? dados : [];
    mostrar(`Lista carregada de ${seletor.selectedOptions[0].text}.`);
  } catch (erro) {
    contatos = [];
    mostrar(`Não foi possível ler os dados: ${erro.message}`, true);
  }
  desenhar();
}

/** Converte o array em JSON e grava no armazenamento escolhido. */
async function gravar() {
  try {
    await fonteAtual().salvarJSON(JSON.stringify(contatos));
    mostrar(`Lista salva em ${seletor.selectedOptions[0].text}.`);
  } catch (erro) {
    mostrar(`Erro ao salvar: ${erro.message}`, true);
  }
}

async function remover(indice) {
  contatos.splice(indice, 1);
  desenhar();
  await gravar();
}

form.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  const nome = form.nome.value.trim();
  const telefone = form.telefone.value.trim();

  if (!nome || !/^[\d\s()+-]{8,}$/.test(telefone)) {
    mostrar('Informe um nome e um telefone válido (dígitos, espaços, parênteses, + e -).', true);
    return;
  }

  contatos.push({ nome, telefone });
  form.reset();
  desenhar();
  await gravar();
  form.nome.focus();
});

//seletor.addEventListener('change', carregar);

/* Tema */
aplicarTema(carregarTema());
toggle.checked = carregarTema() === 'escuro';
toggle.addEventListener('change', () => {
  const tema = toggle.checked ? 'escuro' : 'claro';
  aplicarTema(tema);
  salvarTema(tema);
});

carregar();

window.onload = () =>{
  btn_carregar.addEventListener("click", () =>{
    carregar();
  });
}

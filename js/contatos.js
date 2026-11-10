/**
 * Cria as tags da lista de contatos na página.
 */

/**
 * @param {{nome: string, telefone: string}} contato
 * @param {number} indice
 * @param {(indice: number) => void} onRemover
 * @returns {HTMLLIElement}
 */
export function criarItem(contato, indice, onRemover) {
  const li = document.createElement('li');
  li.className = 'contato';

  const info = document.createElement('div');

  const nome = document.createElement('strong');
  nome.textContent = contato.nome;

  const telefone = document.createElement('span');
  telefone.textContent = contato.telefone;

  info.append(nome, telefone);

  const botao = document.createElement('button');
  botao.type = 'button';
  botao.className = 'remover';
  botao.textContent = 'Remover';
  botao.addEventListener('click', () => onRemover(indice));

  li.append(info, botao);
  return li;
}

/**
 * Substitui o conteúdo de uma lista pelos contatos informados.
 * @param {HTMLUListElement} ul
 * @param {Array<{nome: string, telefone: string}>} contatos
 * @param {(indice: number) => void} onRemover
 */
export function renderizarLista(ul, contatos, onRemover) {
  if (contatos.length === 0) {
    const vazio = document.createElement('li');
    vazio.className = 'vazio';
    vazio.textContent = 'Nenhum contato cadastrado.';
    ul.replaceChildren(vazio);
    return;
  }

  ul.replaceChildren(...contatos.map((c, i) => criarItem(c, i, onRemover)));
}

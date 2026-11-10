/**
 * Persistência em localStorage.
 */

const CHAVE = 'contatos';

/**
 * @param {string} json  Texto JSON com a lista de contatos.
 */
export async function salvarJSON(json) {
  localStorage.setItem(CHAVE, json);
}

/**
 * @returns {Promise<string>} Texto JSON com a lista, ou '[]' se não houver dados.
 */
export async function carregarJSON() {
  return localStorage.getItem(CHAVE) ?? '[]';
}

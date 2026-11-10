/**
 * Persistência em cookies com a Cookie Store API (window.cookieStore).
 * Requer contexto seguro (https ou localhost) e navegador compatível (ex.: Chrome, Edge).
 * Limite prático: cerca de 4 KB por cookie.
 */

const NOME = 'contatos';
const DIAS = 365;

function verificarSuporte() {
  if (!('cookieStore' in window)) {
    throw new Error('Cookie Store API não disponível neste navegador.');
  }
}

/**
 * @param {string} json  Texto JSON com a lista de contatos.
 */
export async function salvarJSON(json) {
  verificarSuporte();
  await cookieStore.set({
    name: NOME,
    value: encodeURIComponent(json),
    expires: Date.now() + DIAS * 24 * 60 * 60 * 1000,
    path: '/',
    sameSite: 'strict'
  });
}

/**
 * @returns {Promise<string>} Texto JSON com a lista, ou '[]' se não houver dados.
 */
export async function carregarJSON() {
  verificarSuporte();
  const cookie = await cookieStore.get(NOME);
  return cookie ? decodeURIComponent(cookie.value) : '[]';
}

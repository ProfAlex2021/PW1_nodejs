/**
 * Persistência em IndexedDB.
 * Banco "agenda", loja "dados", chave "contatos" guarda o JSON da lista.
 */

const BANCO = 'agenda';
const LOJA = 'dados';
const CHAVE = 'contatos';
const VERSAO = 1;

function abrirBanco() {
  return new Promise((resolve, reject) => {
    const requisicao = indexedDB.open(BANCO, VERSAO);

    requisicao.onupgradeneeded = () => {
      requisicao.result.createObjectStore(LOJA);
    };
    requisicao.onsuccess = () => resolve(requisicao.result);
    requisicao.onerror = () => reject(requisicao.error);
  });
}

/**
 * @param {string} json  Texto JSON com a lista de contatos.
 */
export async function salvarJSON(json) {
  const db = await abrirBanco();
  return new Promise((resolve, reject) => {
    const transacao = db.transaction(LOJA, 'readwrite');
    transacao.objectStore(LOJA).put(json, CHAVE);
    transacao.oncomplete = () => {
      db.close();
      resolve();
    };
    transacao.onerror = () => {
      db.close();
      reject(transacao.error);
    };
  });
}

/**
 * @returns {Promise<string>} Texto JSON com a lista, ou '[]' se não houver dados.
 */
export async function carregarJSON() {
  const db = await abrirBanco();
  return new Promise((resolve, reject) => {
    const transacao = db.transaction(LOJA, 'readonly');
    const requisicao = transacao.objectStore(LOJA).get(CHAVE);
    requisicao.onsuccess = () => {
      db.close();
      resolve(requisicao.result ?? '[]');
    };
    requisicao.onerror = () => {
      db.close();
      reject(requisicao.error);
    };
  });
}

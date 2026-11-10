/**
 * Tema claro/escuro: aplica o atributo data-theme no <html> e salva a escolha.
 */

const CHAVE = 'tema';

/** @param {'claro' | 'escuro'} tema */
export function aplicarTema(tema) {
  document.documentElement.dataset.theme = tema;
}

/** @param {'claro' | 'escuro'} tema */
export function salvarTema(tema) {
  localStorage.setItem(CHAVE, tema);
}

/**
 * Retorna o tema salvo. Sem escolha salva, usa a preferência do sistema.
 * @returns {'claro' | 'escuro'}
 */
export function carregarTema() {
  const salvo = localStorage.getItem(CHAVE);
  if (salvo === 'claro' || salvo === 'escuro') return salvo;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'escuro' : 'claro';
}

# PW1_nodejs — Agenda de contatos (Programação Web I)

Projeto de exemplo com HTML, CSS e JavaScript (módulos ES) para manipular uma lista de contatos (nome e telefone), salva em `cookieStore`, `IndexedDB` ou `localStorage`, com alternância de tema claro/escuro.

Para executar o projeto é preciso ter o **Node.js** instalado. O Node.js traz o `npm` e o `npx`, usados aqui para subir um servidor web local.

---

## 1. Instalar o Node.js no Windows

1. Acesse https://nodejs.org e baixe a versão **LTS** (recomendada) para Windows (arquivo `.msi`).
2. Execute o instalador e avance em **Next** mantendo as opções padrão.
3. Ao final, feche e abra novamente o terminal (PowerShell ou Prompt de Comando).
4. Confirme a instalação:

```powershell
node -v
npm -v
npx -v
```

Se os três comandos mostrarem um número de versão, a instalação está correta.

---

## 2. Configurar o ExecutionPolicy do PowerShell

Por padrão, o Windows bloqueia a execução de scripts `.ps1`. Como o `npx` no PowerShell é um script (`npx.ps1`), ele pode ser bloqueado com a mensagem *"a execução de scripts está desabilitada neste sistema"*.

Para liberar a execução apenas para o seu usuário, abra o **PowerShell** e execute:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Bypass
```

Quando o PowerShell perguntar se deseja alterar a política, digite `S` (ou `A`) e pressione Enter.

Para verificar:

```powershell
Get-ExecutionPolicy -Scope CurrentUser
```

Deve mostrar `Bypass`.

> **Observação:** o `-Scope CurrentUser` altera a configuração somente para a sua conta, sem exigir permissão de administrador. Para desfazer, use `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Restricted`.

---

## 3. Obter o projeto

Clone o repositório ou baixe-o como ZIP:

```powershell
git clone https://github.com/ProfAlex2021/PW1_nodejs.git
cd PW1_nodejs
```

Também é possível baixar o ZIP pelo botão **Code → Download ZIP** no GitHub, extrair a pasta e abrir o terminal dentro dela.

---

## 4. Executar com `npx serve`

Na pasta do projeto (a mesma pasta onde está o `index.html`), execute:

```powershell
npx serve
```

Na primeira execução, o `npx` pergunta se deseja instalar o pacote `serve`. Digite `y` e pressione Enter. Ao final, o terminal mostra algo como:

```
Serving!
Local:  http://localhost:3000
```

Abra o endereço **http://localhost:3000** no navegador.

Para encerrar o servidor, pressione `Ctrl + C` no terminal.

### Dicas

- Para usar outra porta: `npx serve -l 8080` (depois acesse http://localhost:8080).
- Sempre execute o `npx serve` dentro da pasta do projeto; caso contrário, o servidor publica a pasta errada.
- Os módulos ES (`import`/`export`) só funcionam via servidor HTTP. Abrir o `index.html` diretamente com duplo clique (`file://`) não carrega os arquivos `.js`.

---

## 5. Estrutura do projeto

```
PW1_nodejs/
├── index.html          # Página principal (formulário, lista e controles)
├── css/
│   └── estilo.css      # Estilos e tokens de cor (tema claro/escuro)
└── js/
    ├── main.js         # Ponto de entrada (carregado como módulo)
    ├── contatos.js     # Criação dos itens da lista via DOM
    ├── cookieStore.js  # Persistência com cookieStore
    ├── indexedDB.js    # Persistência com IndexedDB
    ├── localStorage.js # Persistência com localStorage
    └── tema.js         # Tema claro/escuro (data-theme e localStorage)
```

---

## 6. Solução de problemas

| Problema | Causa provável | Solução |
|---|---|---|
| `npx : o arquivo npx.ps1 não pode ser carregado` | ExecutionPolicy restritiva | Execute o passo 2 (`Set-ExecutionPolicy ... Bypass`) |
| `'node' não é reconhecido como comando` | Terminal aberto antes da instalação | Feche e abra o terminal novamente; se persistir, reinstale o Node.js |
| Página em branco ou erro de módulo no console | Página aberta com duplo clique (`file://`) | Use `npx serve` e acesse http://localhost:3000 |
| `Port 3000 is already in use` | Outro servidor usando a porta | Use `npx serve -l 3001` ou encerre o processo anterior |

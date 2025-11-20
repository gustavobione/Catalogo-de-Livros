## 📚 Catálogo de Livros (React Intermediário)

Este projeto é uma aplicação de Catálogo de Livros desenvolvida como parte da atividade de React Intermediário. O objetivo foi praticar Hooks essenciais (``useState``, ``useEffect``, ``useRef``), Context API, validação de formulários e criação de Hooks customizados.

A interface foi construída com foco em usabilidade e estética moderna, utilizando Shadcn/ui e Tailwind CSS.

## 🚀 Como Rodar o Projeto

1. Clone ou baixe o projeto.

2. Instale as dependências:

```Bash
npm install
```

3. Execute o servidor de desenvolvimento:

```Bash
npm run dev
```

4. Abra no navegador ``http://localhost:5173``.

## 🛠️ Decisões de Projeto & Arquitetura

Para garantir um código limpo, escalável e de fácil manutenção, tomei as seguintes decisões técnicas:

**1. SPA (Single Page Application):** Optei por uma estrutura de página única (Dashboard) em vez de múltiplas rotas. Isso melhora a UX, permitindo filtrar, adicionar e remover livros sem recarregamentos ou navegação complexa.

**2. Componentização Granular:** Separei a lógica em componentes pequenos e focados (Header, BookList, BookStats, DeleteBookDialog), evitando um "God Component" no App.tsx.

**3. Mock de API (Public JSON):** O arquivo books.json foi alocado na pasta public e consumido via fetch nativo para simular fielmente uma requisição assíncrona REST API, incluindo tratamento de erros e loading states (Skeleton).

**4. Validação Robusta:** Implementei validações "inteligentes" no formulário:

 - **Duplicidade:** Impede adicionar o mesmo livro (ex: "O Hobbit" vs "o hobbit") normalizando strings e removendo acentos.

 - **Formatação:** O nome do autor é capitalizado automaticamente (ex: "j.r.r. tolkien" → "J.R.R. Tolkien").

 - **Integridade:** Impede anos negativos.

**5. UX Refinada:**

 - Feedback visual com Toasts (Sucesso/Erro/Aviso).

 - Confirmação de exclusão com Dialog Modal.

 - Ordenação "Tri-state" na tabela (Crescente, Decrescente, Original).

## 🎣 O Hook Customizado: useLocalStorage

**Onde foi aplicado?**

O hook useLocalStorage foi aplicado em dois pontos críticos da aplicação:

1. ``src/context/ThemeContext.tsx``: Para salvar a preferência de tema (Claro/Escuro).

2. ``src/App.tsx``: Para persistir a lista de livros adicionados e removidos pelo usuário.

**Por que foi utilizado?**

A persistência de dados é fundamental para que o usuário não perca seu trabalho ao atualizar a página (F5).

**Criei este hook para:**

**1. Abstrair a complexidade:** Ele encapsula a lógica de verificar se o ``window`` existe, ler do ``localStorage``, fazer o parsing do JSON e tratar erros de leitura/escrita.

**2. Sincronização Automática:** Ele combina ``useState`` com ``useEffect``. Assim que o estado da aplicação muda (ex: adicionou um livro), o hook automaticamente atualiza o navegador, mantendo UI e Storage sempre sincronizados sem código repetitivo.

**3. Lógica de "Seed":** No ``App.tsx``, usamos o hook para verificar: "Já existem dados do usuário? Se sim, use-os. Se não, carregue o JSON inicial".

## 🎨 Tecnologias Utilizadas

**React** (Vite + TypeScript)

**Tailwind CSS** (Estilização)

**Shadcn** (Componentes acessíveis)

**Lucide React** (Ícones)


Desenvolvido por [Gustavo Teixeira Bione](https://github.com/gustavobione) - 01250733
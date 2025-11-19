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

O hook useLocalStorage foi aplicado no arquivo src/context/ThemeContext.tsx.

**Por que foi utilizado?**

A persistência de dados é crucial para a experiência do usuário. Sem ela, toda vez que o usuário recarregasse a página, o tema voltaria para o padrão (Claro).

**Criei este hook para:**

**1. Abstrair a complexidade:** Ele encapsula a lógica de verificar se o window existe, ler do localStorage, fazer o parsing do JSON e tratar erros de leitura/escrita.

**2. Reutilização:** Embora usado aqui para o Tema (Dark/Light), ele é genérico e pode ser usado futuramente para persistir outros dados (como o termo de busca ou filtros) sem reescrever código.

**3. Sincronização:** Ele mantém o Estado do React (useState) sincronizado automaticamente com o armazenamento do navegador (useEffect), garantindo que a UI reflita sempre o dado persistido.

## 🎨 Tecnologias Utilizadas

**React** (Vite + TypeScript)

**Tailwind CSS** (Estilização)

**Shadcn** (Componentes acessíveis)

**Lucide React** (Ícones)


Desenvolvido por [Gustavo Teixeira Bione](https://github.com/gustavobione) - 01250733
## 📚 Catálogo de Livros V2.0 (React Avançado)

Este projeto é uma aplicação de Catálogo de Livros que evoluiu de um gerenciador de lista simples para uma **Single Page Application (SPA)** completa com roteamento, dashboard de insights e sistema de recomendações.

O objetivo desta versão (V2.0) foi expandir a aplicação utilizando **React Router DOM**, aprimorar a arquitetura separando componentes inteligentes de componentes visuais ("Smart vs Dumb Components") e criar uma experiência de usuário imersiva com Carrosséis e Dashboards.

A interface continua construída com foco em usabilidade e estética moderna, utilizando **Shadcn** e **Tailwind CSS**.

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

## 🔄 Evolução: Da V1.0 para a V2.0
Nesta etapa da atividade (AV2), a aplicação sofreu uma refatoração estrutural significativa para suportar novas funcionalidades:

**1. Implementação de Roteamento (Client-Side Routing)**

Diferente da V1.0, que era uma tela única, a V2.0 utiliza o React Router DOM para criar uma navegação fluida entre:

 **- Home (``/``):** Um dashboard visual com insights, carrossel "Continue Lendo" e "Hall da Fama".

 **- Catálogo (``/catalogo``):** A lista completa com filtros, busca e gestão.

 **- Detalhes (``/livros/:id``):** Uma página dinâmica para cada livro, com notas, resenhas e recomendações.

**2. Arquitetura de Componentes (Smart vs Dumb)**

Para manter o código limpo na V2.0, separei estritamente as responsabilidades:

 **- Pages (Smart):** (Ex: ``Home.tsx``, ``LivroDetalhe.tsx``) Gerenciam o estado, buscam dados no localStorage e contêm a lógica de negócio.

 **- Components (Dumb/UI):** (Ex: ``HomeBookCard.tsx``, ``BookStats.tsx``) Apenas recebem dados via props e renderizam a interface. Isso facilita a reutilização e testes.

**3. Algoritmos de Recomendação e Insights**

 **- Insights na Home:** Cálculo automático do "Gênero Favorito" e "Autor Mais Lido" baseado na biblioteca do usuário.

 **- Sistema "Veja Também":** Na página de detalhes, implementei um algoritmo que sugere até 5 livros não lidos do mesmo autor ou gênero, excluindo o livro atual.

**4. UI/UX Avançada**

 **- Carrosséis Infinitos:** Implementação de carrosséis (looping) para as seções de leitura atual e recomendações.

 **- Feedback de Erro 404:** Página visual de "Livro não encontrado" caso o usuário tente acessar um ID inexistente.

 **- Sistema de Favoritos e Notas:** Adição de persistência para livros favoritos e classificação por estrelas (0 a 10).

## 🛠️ Decisões de Projeto (Legado & Atualizações)

**1. SPA e Roteamento:** Optei por migrar da estrutura de "Dashboard Único" para rotas dedicadas. Isso permite que o usuário compartilhe o link de um livro específico (.../livros/123) e melhora a organização do código.

**2. Componentização Granular:** A lógica foi pulverizada. O que antes estava concentrado no App.tsx agora está distribuído. Por exemplo, o card do livro na Home (HomeBookCard) é diferente do card no Catálogo, pois atendem necessidades visuais distintas (destaque de capa vs. ações de edição).

**3. Mock de API (Public JSON):** Mantive o uso do books.json como seed inicial. Se o localStorage estiver vazio (primeiro acesso), a aplicação hidrata o estado com uma lista curada de 10 livros com capas e metadados reais.

**4. Validação Robusta:** Mantida a normalização de strings para evitar duplicidade e formatação automática de autores.

**5. UX Refinada:**

 **- Triple-State Button:** No catálogo, o status do livro (Ler depois, Lendo, Lido) pode ser alterado rapidamente com um clique, sem abrir o modo de edição.

 **- Skeletons e Loadings:** Prevenção de "layout shift" enquanto os dados são carregados do storage ou do JSON simulado.

## 🎣 O Hook Customizado: useLocalStorage
**Onde foi aplicado?** Continua sendo a espinha dorsal da persistência da aplicação, utilizado agora em múltiplas páginas (Home, Catalogo, LivroDetalhe) para garantir que qualquer alteração em uma rota reflita instantaneamente nas outras.

**Por que foi utilizado?** A persistência de dados é fundamental. Na V2.0, sua importância cresceu: ao editar uma nota na página de Detalhes e voltar para a Home, o Hook garante que os "Insights" sejam recalculados com os dados novos sem necessidade de recarregar a página.

**Funcionalidades do Hook:**

 **- Abstração:** Encapsula verificação de window e parsing JSON.

 **- Sincronização:** Combina useState com useEffect para manter UI e Storage sincronizados.

 **- Seed Automático:** Gerencia a carga inicial dos dados de exemplo caso o usuário seja novo.

## 🎨 Tecnologias Utilizadas

**React** (Vite + TypeScript)

**React Router DOM** (Navegação SPA)

**Tailwind CSS** (Estilização)

**Shadcn** (Componentes acessíveis)

**Lucide React** (Ícones)


Desenvolvido por [Gustavo Teixeira Bione](https://github.com/gustavobione) - 01250733
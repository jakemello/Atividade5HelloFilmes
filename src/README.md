# HelloFilmes 🎬

Projeto desenvolvido como parte da **Atividade 5** do curso **Desenvolvedor Fullstack Jr. 2025** do **+PraTi**, ministrado pela **Codifica Edu**.

O **HelloFilmes** é uma aplicação web moderna, construída com **ReactJS**, que permite aos usuários explorar o vasto mundo do cinema. Utilizando a **API do The Movie Database (TMDB)**, a plataforma oferece busca de filmes, visualização de detalhes completos e uma funcionalidade para criar uma lista de favoritos pessoal e persistente.

---

## ✨ Funcionalidades Implementadas

O projeto atende a todos os requisitos obrigatórios da atividade:

### 🔎 Página de Busca
- Campo de texto para buscar filmes por título.  
- Exibição dos resultados em uma grade, mostrando o pôster, título e ano de lançamento de cada filme.  
- Botão **"Ver Detalhes"** em cada item da lista para navegação.  

### 📄 Paginação
- Sistema de paginação funcional que permite ao usuário navegar entre as diferentes páginas de resultados da busca.  

### 🎬 Página de Detalhes
Ao clicar em um filme, o usuário é levado para uma página dedicada que exibe informações completas, como:  
- Pôster em destaque  
- Sinopse  
- Diretor e elenco principal  
- Avaliação dos usuários (nota)  
- Data de lançamento  

### ❤️ Lista de Favoritos
- Um botão na página de detalhes para **"Adicionar aos Favoritos"** ou **"Remover dos Favoritos"**.  
- A lista de filmes favoritos é salva no **localStorage** do navegador, garantindo que as escolhas persistam mesmo após fechar a página.  
- Uma página dedicada para visualizar todos os filmes favoritados.  

### 🔄 Tratamento de Erros e Loading
- Exibição de um indicador de carregamento (**loading spinner**) enquanto os dados da API estão sendo buscados.  
- Mensagens de erro claras são exibidas caso a busca não retorne resultados ou ocorra uma falha na comunicação com a API.  

---

## 🛠️ Tecnologias Utilizadas
- **ReactJS** → Biblioteca principal para a construção da interface de usuário.  
- **React Router Dom** → Criação e gerenciamento das rotas da aplicação (`/`, `/filme/:id`, `/favoritos`).  
- **Axios** → Cliente HTTP baseado em Promises para realizar as requisições à API do TMDB.  
- **Material UI** → Biblioteca de componentes de UI para um design consistente e moderno.  
- **CSS Modules / Styled Components** → Estilização dos componentes de forma escopada e organizada.  
- **LocalStorage API** → Persistência dos dados da lista de favoritos no navegador do usuário.  

---

## 🚀 Como Executar o Projeto Localmente

### 🔧 Pré-requisitos
- **Node.js** (versão 16 ou superior)  
- **NPM** ou **Yarn**  
- Uma **chave de API do TMDB** → [crie uma conta e obtenha sua chave gratuitamente aqui](https://www.themoviedb.org/documentation/api)  

### 📥 Passos para Instalação

1. Clone o repositório para sua máquina:
   ```bash
   git clone https://github.com/seu-usuario/hellofilmes.git
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd hellofilmes
   ```

3. Instale todas as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

4. Configure as Variáveis de Ambiente:  
   - Crie um arquivo chamado **`.env.local`** na raiz do projeto.  
   - Dentro dele, adicione sua chave da API do TMDB:  
     ```env
     REACT_APP_API_KEY="COLE_SUA_CHAVE_DA_API_AQUI"
     ```
   ⚠️ A variável **deve** começar com `REACT_APP_` para que o React a reconheça.  

### ▶️ Iniciando a Aplicação
Com tudo configurado, execute o seguinte comando para iniciar o servidor de desenvolvimento:  
```bash
npm start
# ou
yarn start
```

A aplicação será aberta automaticamente em seu navegador no endereço:  
👉 [http://localhost:3000](http://localhost:3000)

---

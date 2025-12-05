# Sistema de Feedback - IFPB

Sistema web para avaliação de professores e disciplinas desenvolvido em React + Vite.

## 🚀 Funcionalidades

### 👨‍🎓 Portal do Aluno
- Login com matrícula e senha
- Avaliar professores cadastrados no sistema
- Avaliar disciplinas
- Visualizar histórico de avaliações próprias
- Sistema de notas de 1 a 5 estrelas
- Comentários opcionais
- Avaliações anônimas

### 👨‍🏫 Portal do Professor
- Login com matrícula e senha
- Visualizar avaliações recebidas
- Estatísticas de desempenho
- Média geral e por disciplina
- Dashboard com métricas

### 👨‍💼 Painel Administrativo
- Gerenciar usuários (criar, editar, excluir)
- Gerenciar cursos (adicionar, remover)
- Gerenciar disciplinas (adicionar, remover, vincular a cursos)
- Visualizar todas as avaliações
- Buscar usuários por matrícula
- Controle completo do sistema

## 🛠️ Tecnologias

- **React 19.2.0** - Interface de usuário
- **Vite 7.2.4** - Build tool e dev server
- **CSS3** - Estilização com gradientes animados
- **JavaScript ES6+** - Lógica da aplicação

## 📦 Instalação

1. Clone o repositório
```bash
git clone [url-do-repositorio]
cd projeto-feedback-alunos
```

2. Instale as dependências
```bash
npm install
```

3. Execute o projeto
```bash
npm run dev
```

4. Acesse no navegador
```
http://localhost:5173
```

## 👥 Usuários de Teste

### Aluno
- **Matrícula:** 202315020035
- **Senha:** Aluno123!

### Professor
- **Matrícula:** 202015030025
- **Senha:** Prof123!

### Administrador
- **Matrícula:** 999999999999
- **Senha:** Admin123!

## 🎨 Design

- Interface moderna com gradientes animados
- Layout responsivo
- Navegação intuitiva dentro de painéis brancos centralizados
- Cores institucionais do IFPB (verde)
- Animações suaves e transições

## 📁 Estrutura do Projeto

```
src/
├── assets/          # Imagens e recursos
├── App.jsx          # Componente principal e login
├── HomeAluno.jsx    # Portal do aluno
├── HomeProfessor.jsx # Portal do professor
├── HomeAdmin.jsx    # Painel administrativo
├── CadastroUsuarios.jsx # Formulário de cadastro
├── App.css          # Estilos principais
└── main.jsx         # Ponto de entrada
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza build de produção
- `npm run lint` - Executa linter ESLint

## 📋 Funcionalidades Detalhadas

### Sistema de Avaliação
- Avaliação por professor ou disciplina
- Escala de 1 a 5 estrelas
- Comentários opcionais
- Opção de avaliação anônima
- Histórico completo de avaliações

### Gerenciamento de Usuários
- Cadastro com validação de dados
- Tipos: Aluno, Professor, Administrador
- Validação de matrícula (12 dígitos)
- Validação de senha segura
- Campos específicos por tipo de usuário

### Gerenciamento Acadêmico
- Cadastro de cursos com códigos
- Cadastro de disciplinas vinculadas a cursos
- Listagem e remoção de cursos/disciplinas
- Integração com sistema de avaliações

## 🎯 Próximas Melhorias

- Integração com banco de dados
- Sistema de notificações
- Relatórios em PDF
- Dashboard com gráficos
- API REST para mobile
- Sistema de backup

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais no IFPB.
# Sistema de Feedback - IFPB

Sistema web para avaliação de professores e disciplinas desenvolvido em React + Vite.

## 🚀 Funcionalidades

### 👨🎓 Portal do Aluno
- Login com matrícula e senha
- Avaliar professores cadastrados no sistema
- Avaliar disciplinas
- Visualizar histórico de avaliações próprias
- Sistema de notas de 1 a 5 estrelas
- Comentários opcionais
- Avaliações anônimas

### 👨🏫 Portal do Professor
- Login com matrícula e senha
- Visualizar avaliações recebidas
- Estatísticas de desempenho
- Média geral e por disciplina
- Dashboard com métricas

### 👨💼 Painel Administrativo
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
├── assets/              # Imagens e recursos
├── components/          # Componentes reutilizáveis
│   ├── common/          # Componentes comuns (Button, etc)
│   ├── courses/         # CRUD de cursos
│   ├── disciplines/     # CRUD de disciplinas
│   ├── forms/           # Componentes de formulário
│   ├── layout/          # Componentes de layout (Header, etc)
│   ├── users/           # CRUD de usuários
│   ├── Login.jsx        # Componente de login
│   ├── SearchUser.jsx   # Busca de usuários
│   ├── CourseManager.jsx # Gerenciador de cursos
│   ├── DisciplineManager.jsx # Gerenciador de disciplinas
│   ├── UserManager.jsx  # Gerenciador de usuários
│   └── index.js         # Exportações dos componentes
├── context/             # Context API
│   └── AuthContext.jsx  # Contexto de autenticação
├── data/                # Dados de teste
│   ├── testUsers.js     # Usuários de teste
│   ├── testCourses.js   # Cursos de teste
│   ├── testDisciplines.js # Disciplinas de teste
│   ├── testEvaluations.js # Avaliações de teste
│   ├── testProfessors.js  # Professores de teste
│   └── index.js         # Exportações dos dados
├── hooks/               # Custom hooks
│   └── useValidation.js # Hook de validação
├── main/                # Ponto de entrada
│   ├── App.jsx          # Componente principal
│   └── main.jsx         # Entry point
├── routes/              # Roteamento
│   └── AppRoutes.jsx    # Rotas da aplicação
├── screens/             # Páginas principais
│   ├── admin/           # Páginas do administrador
│   │   └── AdminPage.jsx
│   ├── student/         # Páginas do aluno
│   │   └── StudentPage.jsx
│   ├── teacher/         # Páginas do professor
│   │   └── TeacherPage.jsx
│   └── index.js         # Exportações das páginas
├── styles/              # Arquivos de estilo
│   └── App.css          # Estilos principais
├── utils/               # Funções utilitárias
│   ├── calculoAvaliacoes.js # Cálculos de avaliações
│   ├── filters.js       # Filtros
│   ├── formatters.js    # Formatadores
│   └── helpers.js       # Funções auxiliares
└── index.css            # Estilos globais
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
# Estrutura do Projeto - Feedback Alunos

## 📁 Nova Estrutura Organizada

```
src/
├── assets/              # Imagens e recursos estáticos
├── components/          # Componentes reutilizáveis
│   ├── common/          # Componentes básicos (Button, etc)
│   ├── courses/         # CRUD de cursos
│   ├── disciplines/     # CRUD de disciplinas
│   ├── forms/           # Componentes de formulário
│   ├── layout/          # Componentes de layout (Header, etc)
│   ├── users/           # CRUD de usuários
│   └── index.js         # Exportações dos componentes
├── context/             # Context API
│   └── AuthContext.jsx  # Contexto de autenticação
├── data/                # Dados de teste/mock
├── hooks/               # Custom hooks
├── pages/               # Páginas principais
│   ├── auth/
│   │   └── login/       # Página de login
│   ├── admin/           # Páginas do administrador
│   ├── student/         # Páginas do aluno
│   ├── teacher/         # Páginas do professor
│   └── index.js         # Exportações das páginas
├── routes/              # Roteamento
├── services/            # APIs e serviços
│   ├── AuthAPI.js       # Serviços de autenticação
│   ├── UserAPI.js       # Serviços de usuário
│   └── index.js         # Exportações dos serviços
├── styles/              # Arquivos de estilo
├── utils/               # Funções utilitárias
├── App.jsx              # Componente principal
├── index.css            # Estilos globais
└── main.jsx             # Entry point
```

## 🔄 Principais Mudanças

### 1. **screens/** → **pages/**
- Seguindo padrão do negocia-facil
- Nomes em minúsculo (kebab-case)
- Melhor organização semântica

### 2. **Nova pasta services/**
- Centraliza chamadas de API
- Facilita manutenção e testes
- Simula APIs reais com dados mock

### 3. **Reorganização de Login**
- Movido de `components/` para `pages/auth/login/`
- Separação clara entre componentes e páginas

### 4. **Estrutura de Exportação**
- Cada pasta tem seu `index.js`
- Imports mais limpos e organizados

## 🚀 Como Usar

### Importar Páginas:
```javascript
import { Login, AdminPage, StudentPage, TeacherPage } from '../pages';
```

### Importar Serviços:
```javascript
import { AuthAPI, UserAPI } from '../services';
```

### Importar Componentes:
```javascript
import { Header, Button, UserManager } from '../components';
```

## 📋 Benefícios da Nova Estrutura

1. **Escalabilidade**: Fácil adicionar novas páginas e serviços
2. **Manutenibilidade**: Código mais organizado e fácil de encontrar
3. **Padrão**: Segue convenções modernas de React
4. **Separação de Responsabilidades**: Clara distinção entre páginas, componentes e serviços
5. **Reutilização**: Componentes bem organizados para reuso

## 🔧 Próximos Passos

1. Implementar APIs reais substituindo mocks
2. Adicionar testes unitários por pasta
3. Implementar lazy loading para páginas
4. Adicionar interceptors nos serviços
5. Criar layouts reutilizáveis
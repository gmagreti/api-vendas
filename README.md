## Iniciando o projeto API_VENDAS

# Para iniciar o projeto com yarn utilize o comando.
  yarn init -y

# Agora segue a instalacao dos pacotes necessarios para o desenvolvimento da api.
  yarn add typescript ts-node-dev @types/node tsconfig-paths -D

# Iniciando o ts-config
  yarn tsc --init --rootDIr src --outDir build \
  --esModuleInterop --resolveJsonModule --lib es6 \
  --module commonjs --allowJs true --noImplicitAny true

# Configurando .gitignore
  .idea/
  .vscode/
  node_modules/
  build/
  temp/
  .env
  coverage
  ormconfig.json
  dist

  uploads/*
  !uploads/.gitkeep

# Iniciando a estrutura do projeto
  crie uma pasta src
    depois um server.ts

# Executando servidor em desenvolvimento
  package.json
  "scripts": {
    "dev": "ts-node-dev --inspect --transpile-only --ignore-watch node_modules src/server.ts"
  }

# Configurando o editorConfig
  root = true

  [*]
  indent_style = space
  indent_size = 2
  charset = utf-8
  trim_trailing_whitespace = false
  insert_final_newline = false

# Configurando ESlint
  yarn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

  Na raiz do seu projeto crie um arquivo .eslintrc com uma configuração inicial do ESLint:
  {
    "root": true,
    "parser": "@typescript-eslint/parser",
    "plugins": [
      "@typescript-eslint"
    ],
    "extends": [
      "eslint:recommended",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended"
    ],
    "rules": { 
      "no-console": "warn"
    }
  }

  Criar o arquivo .eslintignore:

  node_modules
  dist
  build
  /*.js

# Adicionando o prettier
  yarn add prettier -D

# vue-components-next

Design system components for Vue 3

## Overview

`vue-components-next` é uma biblioteca de componentes UI reutilizáveis e configuráveis para Vue 3, criada por Eduardo Neves. O projeto oferece componentes modernos e flexíveis com TypeScript, estilização com TailwindCSS e testes automatizados.

## Tech Stack

- **Vue 3** com `<script setup>` e Composition API
- **TypeScript** para tipagem segura
- **Vite** para desenvolvimento e build rápido
- **TailwindCSS 4** para estilização utilitária
- **Vitest** para testes unitários
- **ESLint** para qualidade de código
- **Sass** para pré-processamento CSS
- **@iconify/vue** para sistema de ícones

## Installation

```bash
npm install vue-components-next
```

## Usage

### Global Installation

```typescript
import { createApp } from 'vue';
import OtComponents from 'vue-components-next';

const app = createApp(App);
app.use(OtComponents);
```

### Individual Components

```vue
<template>
  <GButton variant="primary">Click me</GButton>
  <GIcon name="mdi:heart" />
</template>
```

## Available Components

Consulte a pasta `src/components` para ver os componentes disponíveis e suas propriedades.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Lint code
npm run lint

# Type checking
npm run typecheck
```

## License

MIT License

## 🔍 Algumas Escolhas Técnicas e Justificativas

### Bundler: Vite
  - Hot Module Replacement (HMR) extremamente rápido
  - Build otimizado para produção
  - Melhor performance em desenvolvimento comparado ao Create React App
  - E no mais para auxiliar na produtividade do desenvolvimento.

### Gerenciamento de Estado: Zustand
  - API minimalista e intuitiva, com menos configurações comparada ao Redux e Context API, permitindo trabalhar com estados globais de forma mais simples e eficiente.

### TypeScript
  - Type safety durante o desenvolvimento
  - Melhor tooling e autocomplete
  - Documentação implícita através de tipos
  - Refatoração mais segura
  - Ajuda no entendimento da estrutura do tipo dos dados transitados no projeto

### Estilização: CSS Modules
  - A escolha foi mais pra deixar o desenvolvimento mais cru e simples, sem muitas libs extras.

## 🎯 Decisões Arquiteturais

### Estrutura de Componentes
- Componentes funcionais com Hooks
- Separação clara de responsabilidades
- Componentização granular para reusabilidade

### Gerenciamento de Estado
- Estado global para chat e configurações
- Estados locais para UI e interações
- Persistência no localStorage

### Testes
- Testes unitários para lógica de negócio
- Testes de integração para fluxos principais
- Mocks para APIs externas (MediaRecorder, localStorage)

Esta stack foi escolhida visando demonstrar o desenvolvimento mais cru, simples, sem muitas libs extras.
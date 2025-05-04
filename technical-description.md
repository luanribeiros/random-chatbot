## 🔍 Algumas Escolhas Técnicas e Justificativas

### Bundler: Vite
- **Por quê?**
  - Hot Module Replacement (HMR) extremamente rápido
  - Build otimizado para produção
  - Configuração zero para TypeScript
  - Melhor performance em desenvolvimento comparado ao Create React App
  - E no mais para auxiliar na produtividade no desenvolvimento.

### Gerenciamento de Estado: Zustand
- **Por quê?**
  - API minimalista e intuitiva, com menos configurações comparada ao Redux e Context API, permitindo trabalhar com estados globais de forma mais simples e eficiente.

### TypeScript
- **Por quê?**
  - Type safety durante o desenvolvimento
  - Melhor tooling e autocomplete
  - Documentação implícita através de tipos
  - Refatoração mais segura e ajuda no entendimento da estrutura do tipo de dados transitados no projeto

### Estilização: CSS Modules
- **Por quê?**
  - A escolha foi mais pra deixar o desenvolvimento mais cru e simples, sem muitas libs extras.

## 🎯 Decisões Arquiteturais

### Estrutura de Componentes
- Componentes funcionais com Hooks
- Separação clara de responsabilidades
- Componentização granular para reusabilidade

### Gerenciamento de Estado
- Estado global para chat e configurações
- Estados locais para UI e interações
- Persistência seletiva no localStorage

### Testes
- Testes unitários para lógica de negócio
- Testes de integração para fluxos principais
- Mocks para APIs externas (MediaRecorder, localStorage)

Esta stack foi escolhida visando demonstrar o desenvolvimento mais cru, simples, sem muitas libs extras.
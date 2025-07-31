import type { Config } from "jest";

const config: Config = {
  bail: 0, // Pare de executar testes após `n` falhas

  clearMocks: true, // Limpe automaticamente chamadas simuladas, instâncias, contextos e resultados antes de cada teste

  coverageProvider: "v8", // Indica qual provedor deve ser usado para instrumentar o código de cobertura

  preset: "ts-jest", //Uma predefinição que é usada como base para a configuração do Jest

  testEnvironment: "node", // O ambiente de teste que será usado para testes

  testMatch: ["<rootDir>/src/**/*.test.ts"], // Os padrões globaos que Jest usa para detectar arquivos de teste

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Mapeamento de módulos com @ para importações
  },
};

export default config;

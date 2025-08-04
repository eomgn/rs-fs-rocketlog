import zod from "zod";

const envSchema = zod.object({
  DATABASE_URL: zod.string().url(),
  JWT_SECRET: zod.string(),
  PORT: zod.coerce.number().default(3333), // '.coerce' é para transformar em number caso seja passado string
});

// criando e exportando a variável env e passando o schema que recebe process.env que é por onde está passando todas as variáveis de ambiente e validando elas
export const env = envSchema.parse(process.env);

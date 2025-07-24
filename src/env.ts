import zod from "zod";

const envSchema = zod.object({
  DATABASE_URL: zod.string().url(),
  JWT_SECRET: zod.string(),
});

// exportando a variável env e passando o schema que recebe o process.env
export const env = envSchema.parse(process.env);

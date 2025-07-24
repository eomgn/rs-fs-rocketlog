import { env } from "@/env";

export const authConfig = {
  jwt: {
    secrets: env.JWT_SECRET,
    expiresIn: "1d",
  },
};

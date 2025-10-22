import type { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { privateEnv } from "../configuration/private-env.configuration";

export function getAuthorizationToken(user: User) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role,
    },
    privateEnv.jwt.secret,
    { expiresIn: privateEnv.jwt.expiresIn as any }
  );
}

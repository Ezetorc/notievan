import type { User } from "@prisma/client";
import { config } from "../configuration/private-env.configuration";
import jwt from "jsonwebtoken";

export function getAuthorizationToken(user: User) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role || "USER",
    },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn as any }
  );
}

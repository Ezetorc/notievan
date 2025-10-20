import jwt from "jsonwebtoken";
import { prisma } from "../configuration/prisma.configuration";
import { config } from "../configuration/private-env.configuration";

export async function getUserFromToken(authHeader: string | null) {
  if (!authHeader?.startsWith("Bearer ")) {
    throw new Error("No autorizado");
  }

  const token = authHeader.split(" ")[1];
  let payload: any;

  try {
  payload = jwt.verify(token, config.jwt.secret, { algorithms: ["HS256"] });
} catch (err: any) {
  console.error("JWT verification error:", err.name, err.message);
  throw new Error("Token inválido o expirado");
}


  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
    select: { id: true, role: true },
  });

  if (!user) throw new Error("Usuario no encontrado");

  return user;
}

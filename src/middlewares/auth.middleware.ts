import jwt from "jsonwebtoken";
import { prisma } from "../configuration/prisma.configuration";
import { privateEnv } from "../configuration/private-env.configuration";
import type { JWTUser } from "../models/jwt-user.model";
import { NotFoundError } from "../models/errors/not-found.error";
import { UnauthorizedError } from "../models/errors/unauthorized.error";

interface JwtPayload {
    sub: string;
    role: string;
    exp: number;
}

export async function authMiddleware(request: Request): Promise<JWTUser> {
    const authHeader = request.headers.get("Authorization") || request.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
        throw new UnauthorizedError("Token no proporcionado");
    }

    const token = authHeader.split(" ")[1];
    let payload: JwtPayload;

    try {
        payload = jwt.verify(token, privateEnv.jwt.secret, { algorithms: ["HS256"] }) as JwtPayload;
    } catch (err: any) {
        if (err.name === "TokenExpiredError") {
            throw new UnauthorizedError("Token expirado");
        }
        throw new UnauthorizedError("Token inválido");
    }

    const user = await prisma.user.findUnique({
        where: { id: payload.sub },
        select: { id: true, role: true },
    });

    if (!user) {
        throw new NotFoundError("Usuario no encontrado");
    }

    return { id: user.id, role: user.role };
}

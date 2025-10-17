import type { APIRoute } from "astro";
import jwt from "jsonwebtoken";
import { prisma } from "../../../configuration/prisma.configuration";
import { JWT_SECRET } from "../../../configuration/backend-env.configuration";

export const GET: APIRoute = async ({ request }) => {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Token no proporcionado" }), {
        status: 401,
      });
    }

    const token = authHeader.split(" ")[1];

    let payload: any;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return new Response(
        JSON.stringify({ error: "Token inválido o expirado" }),
        {
          status: 401,
        }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "Usuario no encontrado" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (err: any) {
    console.error("Error en /auth/profile:", err);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500 }
    );
  }
};

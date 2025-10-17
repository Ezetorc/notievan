import type { APIRoute } from "astro";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../../configuration/prisma.configuration";
import {
  JWT_SECRET,
  JWT_EXPIRES_IN,
} from "../../../configuration/backend-env.configuration";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email y contraseña requeridos" }),
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "Credenciales inválidas" }), {
        status: 401,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: "Credenciales inválidas" }), {
        status: 401,
      });
    }

    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        role: "USER",
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN as any }
    );

    return new Response(
      JSON.stringify({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        token,
      }),
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error en /auth/login:", err);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500 }
    );
  }
};

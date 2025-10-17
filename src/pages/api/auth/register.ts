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
    const { email, password, name } = body;

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email y contraseña requeridos" }),
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(JSON.stringify({ error: "El usuario ya existe" }), {
        status: 409,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      {
        sub: newUser.id,
        email: newUser.email,
        role: "USER",
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN as any }
    );

    return new Response(
      JSON.stringify({
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
        },
        token,
      }),
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Error en /auth/register:", err);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500 }
    );
  }
};

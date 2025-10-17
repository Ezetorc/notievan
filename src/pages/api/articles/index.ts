import type { APIRoute } from "astro";
import { prisma } from "../../../configuration/prisma.configuration";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../../configuration/backend-env.configuration";
import cloudinary from "../../../configuration/cloudinary.configuration";

export const POST: APIRoute = async ({ request }) => {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
      });
    }

    const token = authHeader.split(" ")[1];
    let payload: any;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch {
      return new Response(
        JSON.stringify({ error: "Token inválido o expirado" }),
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, role: true },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "Usuario no encontrado" }), {
        status: 404,
      });
    }

    console.log(user)

    if (user.role !== "AUTHOR") {
      return new Response(
        JSON.stringify({ error: "No tienes permisos para crear artículos" }),
        { status: 403 }
      );
    }

    // Parse FormData
    const formData = await request.formData();
    const title = String(formData.get("title"));
    const subtitle = String(formData.get("subtitle"));
    const description = String(formData.get("description"));
    const content = String(formData.get("content"));
    const thumbnailAlt = String(formData.get("thumbnailAlt"));
    const file = formData.get("thumbnailFile") as File | null;

    console.log(title, subtitle, description, content, file)

    if (!title || !subtitle || !description || !content || !file) {
      return new Response(
        JSON.stringify({ error: "Faltan campos obligatorios" }),
        { status: 400 }
      );
    }

    // Subir a Cloudinary
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "articles" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });

    // Guardar artículo en DB
    const article = await prisma.article.create({
      data: {
        title,
        subtitle,
        description,
        content,
        author: user.id,
        thumbnailUrl: uploadResult.secure_url,
        thumbnailAlt,
      },
    });

    return new Response(JSON.stringify(article), { status: 201 });
  } catch (error) {
    console.error("Error creando artículo:", error);

    return new Response(
      JSON.stringify({ error: "No se pudo crear el artículo" }),
      { status: 500 }
    );
  }
};

export const GET: APIRoute = async ({ params }) => {
  try {
    const { amount } = params;

    const articles = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
      take: amount ? parseInt(amount) : 4,
    });
    return new Response(JSON.stringify(articles), { status: 200 });
  } catch (error) {
    console.error("Error obteniendo artículos:", error);
    return new Response(
      JSON.stringify({ error: "No se pudieron obtener los artículos" }),
      { status: 500 }
    );
  }
};

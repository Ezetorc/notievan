import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

async function main() {
  await prisma.article.deleteMany();
  // await prisma.user.deleteMany();

  const user = await prisma.user.update({
    where: {
      id: "cmgy1sc9q0000ljpoap9tl673",
    },
    data: {
      role: "AUTHOR",
    },
  });

  await prisma.article.create({
    data: {
      authorId: user.id,
      content: "Contenido",
      description: "Descripción",
      subtitle: "Subtitulo",
      title: "Título",
      thumbnailAlt: "Alt",
      thumbnailUrl: "https://stock.adobe.com/search?k=%22n+alphabet%22",
    },
  });

  await prisma.article.create({
    data: {
      authorId: user.id,
      content: "Contenido",
      description: "Descripción",
      subtitle: "Subtitulo",
      title: "Título",
      thumbnailAlt: "Alt",
      thumbnailUrl: "https://stock.adobe.com/search?k=%22n+alphabet%22",
    },
  });

  await prisma.article.create({
    data: {
      authorId: user.id,
      content: "Contenido",
      description: "Descripción",
      subtitle: "Subtitulo",
      title: "Título",
      thumbnailAlt: "Alt",
      thumbnailUrl: "https://stock.adobe.com/search?k=%22n+alphabet%22",
    },
  });

  await prisma.article.create({
    data: {
      authorId: user.id,
      content: "Contenido",
      description: "Descripción",
      subtitle: "Subtitulo",
      title: "Título",
      thumbnailAlt: "Alt",
      thumbnailUrl: "https://stock.adobe.com/search?k=%22n+alphabet%22",
    },
  });

  await prisma.article.create({
    data: {
      authorId: user.id,
      content: "Contenido",
      description: "Descripción",
      subtitle: "Subtitulo",
      title: "Título",
      thumbnailAlt: "Alt",
      thumbnailUrl: "https://stock.adobe.com/search?k=%22n+alphabet%22",
    },
  });

  await prisma.article.create({
    data: {
      authorId: user.id,
      content: "Contenido",
      description: "Descripción",
      subtitle: "Subtitulo",
      title: "Título",
      thumbnailAlt: "Alt",
      thumbnailUrl: "https://stock.adobe.com/search?k=%22n+alphabet%22",
    },
  });

  await prisma.article.create({
    data: {
      authorId: user.id,
      content: "Contenido",
      description: "Descripción",
      subtitle: "Subtitulo",
      title: "Título",
      thumbnailAlt: "Alt",
      thumbnailUrl: "https://stock.adobe.com/search?k=%22n+alphabet%22",
    },
  });

  await prisma.article.create({
    data: {
      authorId: user.id,
      content: "Contenido",
      description: "Descripción",
      subtitle: "Subtitulo",
      title: "Título",
      thumbnailAlt: "Alt",
      thumbnailUrl: "https://stock.adobe.com/search?k=%22n+alphabet%22",
    },
  });

  await prisma.article.create({
    data: {
      authorId: user.id,
      content: "Contenido",
      description: "Descripción",
      subtitle: "Subtitulo",
      title: "Título",
      thumbnailAlt: "Alt",
      thumbnailUrl: "https://stock.adobe.com/search?k=%22n+alphabet%22",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);

    await prisma.$disconnect();

    process.exit(1);
  });

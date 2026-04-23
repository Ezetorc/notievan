import { PrismaClient } from "./generated/prisma/index.js";

const prisma = new PrismaClient();

async function main() {
  let articles = await prisma.article.findMany();

  console.log("articles: ", articles);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seeds completed");
  })
  .catch(async (error) => {
    console.error(error);

    await prisma.$disconnect();

    process.exit(1);
  });

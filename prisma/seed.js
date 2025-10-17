import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

async function main() {
  await prisma.article.deleteMany()

  await prisma.user.update({
    where: {
      email: "ezetorc@gmail.com",
    },
    data: {
      role: "AUTHOR",
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

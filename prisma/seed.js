import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

async function main() {
  // await prisma.user.deleteMany();

  await prisma.user.update({
    where: {
      id: "cmh3m35q00000l104ppv7qeoz",
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

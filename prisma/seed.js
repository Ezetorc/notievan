import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

async function main() {
  // await prisma.user.deleteMany();

  await prisma.user.update({
    where: {
      id: "cmh2e2v1x0000lja0qm2o5ivq",
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

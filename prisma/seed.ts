import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  [...Array.from(Array(500).keys())].forEach(async (item) => {
    await prisma.stream.create({
      data: {
        name: `Fake Stream ${item}`,
        description: `Fake description ${item}`,
        user: {
          connect: {
            id: 8,
          },
        },
      },
    });
    console.log(`${item}/500`);
  });
};

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());

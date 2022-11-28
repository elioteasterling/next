import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      email: 'test@gmail.com',
      role: 'ADMIN',
    },
  });

  await prisma.user.createMany({
      data: {
        email: "",
        image: ""
      }
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect);

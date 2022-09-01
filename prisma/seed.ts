import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create reservation object
  const reservation1 = await prisma.reservation.upsert({
    where: { id: 1 },
    update: {},
    create: {
      firstName: 'Haris',
      lastName: 'Shoaib',
      email: "hs@gmail.com",
      numGuests: 2,
      checkInDate: new Date(),
      checkOutDate: new Date()
    },
  });

  console.log({ reservation1 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
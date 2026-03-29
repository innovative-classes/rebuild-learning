import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function cleanup() {
  const oldEmails = [
    "admin@nbvsubbarao.com",
    "student@demo.com",
    "student1@demo.com",
    "student2@demo.com",
    "student3@demo.com",
    "student4@demo.com",
    "student5@demo.com",
  ];
  const result = await prisma.user.deleteMany({
    where: { email: { in: oldEmails } },
  });
  console.log(`Deleted ${result.count} old accounts`);

  const remaining = await prisma.user.findMany({
    select: { name: true, email: true, role: true },
  });
  remaining.forEach((u) =>
    console.log(`${u.role}: ${u.email} (${u.name})`)
  );
  await prisma.$disconnect();
}

cleanup();

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL?.toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.log("Skip seed: set ADMIN_EMAIL and ADMIN_PASSWORD in .env");
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: {
      role: "ADMIN",
      passwordHash,
      emailVerified: new Date(),
    },
    create: {
      email,
      name: "Admin",
      role: "ADMIN",
      passwordHash,
      emailVerified: new Date(),
    },
  });

  console.log(`Admin user ready: ${email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

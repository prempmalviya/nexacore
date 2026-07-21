// prisma/seed.ts
import "dotenv/config";
import { PrismaClient, SystemRole } from "@prisma/client";
import bcrypt from "bcryptjs";

// No options needed – Prisma reads datasource from prisma.config.ts
const prisma = new PrismaClient();

async function main() {
  const existingSuperAdmin = await prisma.user.findFirst({
    where: { systemRole: SystemRole.SUPER_ADMIN },
  });

  if (!existingSuperAdmin) {
    const passwordHash = await bcrypt.hash("SuperAdmin123!", 12);
    await prisma.user.create({
      data: {
        email: "premmalviya02897+sa@gmail.com",
        passwordHash,
        name: "Super Admin",
        systemRole: SystemRole.SUPER_ADMIN,
        mustChangePassword: false,
      },
    });
    console.log("Super Admin created: premmalviya02897+sa@gmail.com / SuperAdmin123!");
  } else {
    console.log("Super Admin already exists.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
import { PrismaClient } from "@prisma/client";
const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Desain Karakter" },
        { name: "Desain Background" },
        { name: "Desain Enviroment" },
      ],
    });
    console.log("Database categories seeded successfully!");
  } catch (error) {
    console.log("Error seeding the database categories:", error);
  } finally {
    await database.$disconnect();
  }
}

main();
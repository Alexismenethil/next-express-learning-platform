import { PrismaClient } from '@prisma/client';

import { seedCategories, seedProducts } from '../src/db/seed-data.js';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  for (const category of seedCategories) {
    await prisma.category.create({
      data: category,
    });
  }

    for (const product of seedProducts) {
      await prisma.product.create({
        data: {
          id: product.id,
          slug: product.slug,
          name: product.name,
          shortDescription: product.shortDescription,
          description: product.description,
          price: product.price,
          inventory: product.inventory,
          status: product.status,
          featured: product.featured,
          categoryId: product.categoryId,
          learningNotes: product.learningNotes,
          imageUrl: product.imageUrl,
        },
      });
    }
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

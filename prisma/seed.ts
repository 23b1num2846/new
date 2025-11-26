import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // ---------------------------------------------------------
  // 1. USERS
  // ---------------------------------------------------------
  await prisma.user.createMany({
    data: [
      { name: "Бат", password: "hashedpass1" },
      { name: "Сараа", password: "hashedpass2" },
    ],
    skipDuplicates: true,
  });

  const users = await prisma.user.findMany();
  console.log("✅ Users created:", users.length);

  // ---------------------------------------------------------
  // 2. CATEGORY
  // ---------------------------------------------------------
  const food = await prisma.category.create({
    data: { name: "Хоол" },
  });

  console.log("✅ Category created:", food.name);

  // ---------------------------------------------------------
  // 3. BUSINESSES
  // ---------------------------------------------------------
  const businessData = [
    {
      name: "Modern Nomads",
      description: "Монгол үндэсний хоолны сүлжээ ресторан",
      address: "УБ, СБД, 1-р хороо",
      phone: "99112233",
      email: "info@modernnomads.mn",
      website: "https://modernnomads.mn",
      location: "Улаанбаатар",
      facebookUrl: "https://facebook.com/modernnomads",
      instagramUrl: "https://instagram.com/modernnomads",
      timetable: "10:00–22:00",
      logoUrl:
        "https://yellowbook-assets.s3.ap-southeast-1.amazonaws.com/nomads_logo.png",
      categoryId: food.id,
    },
    {
      name: "BD’s Mongolian BBQ",
      description: "Mongolian grill стильтэй ресторан",
      address: "УБ, ХУД, Чингисийн өргөн чөлөө",
      phone: "99001122",
      email: "info@bdsmongolia.mn",
      website: "https://bdsmongolia.mn",
      location: "Улаанбаатар",
      facebookUrl: "https://facebook.com/bdsmongolia",
      instagramUrl: "https://instagram.com/bdsmongolia",
      timetable: "11:00–23:00",
      logoUrl:
        "https://yellowbook-assets.s3.ap-southeast-1.amazonaws.com/8c0058533b75d83074fb2d54b41789f8.jpg",
      categoryId: food.id,
    },
    {
      name: "Khaan Deli",
      description: "Барууны болон Монгол хоолны ресторан",
      address: "УБ, БГД, 4-р хороо",
      phone: "99115566",
      email: "contact@khaandeli.mn",
      website: "https://khaandeli.mn",
      location: "Улаанбаатар",
      facebookUrl: "https://facebook.com/khaandeli",
      instagramUrl: "https://instagram.com/khaandeli",
      timetable: "09:00–22:00",
      logoUrl:
        "https://yellowbook-assets.s3.ap-southeast-1.amazonaws.com/300786139_533820001877874_8270612961028424860_n.jpg",
      categoryId: food.id,
    },
  ];

  for (const b of businessData) {
    await prisma.business.create({ data: b });
  }

  const businesses = await prisma.business.findMany();
  console.log("✅ Businesses created:", businesses.length);

  // ---------------------------------------------------------
  // 4. REVIEW CATEGORIES
  // ---------------------------------------------------------
  await prisma.reviewCategory.createMany({
    data: [
      { name: "Food", order: 1 },
      { name: "Service", order: 2 },
      { name: "Ambience", order: 3 },
      { name: "Cleanliness", order: 4 },
      { name: "Price", order: 5 },
    ],
  });

  const categories = await prisma.reviewCategory.findMany();
  console.log("✅ Review categories created:", categories.length);

  // ---------------------------------------------------------
  // 5. REVIEWS
  // ---------------------------------------------------------
  await prisma.review.create({
    data: {
      rating: 5,
      text: "Modern Nomads үнэхээр таалагдлаа! Хоол амттай, үйлчилгээ хурдан.",
      userId: users[0].id,
      businessId: businesses[0].id,

      photos: {
        create: [
          { url: "https://yellowbook-assets.s3.../nomads-food1.jpg" },
          { url: "https://yellowbook-assets.s3.../nomads-interior.jpg" },
        ],
      },

      ratings: {
        create: [
          { categoryId: categories[0].id, score: 5 },
          { categoryId: categories[1].id, score: 5 },
          { categoryId: categories[2].id, score: 4 },
          { categoryId: categories[3].id, score: 4 },
          { categoryId: categories[4].id, score: 3 },
        ],
      },
    },
  });

  await prisma.review.create({
    data: {
      rating: 4,
      text: "Хоол нь боломжийн, үнэ арай өндөр.",
      userId: users[1].id,
      businessId: businesses[0].id,

      ratings: {
        create: [
          { categoryId: categories[0].id, score: 4 },
          { categoryId: categories[1].id, score: 5 },
          { categoryId: categories[2].id, score: 4 },
          { categoryId: categories[3].id, score: 3 },
          { categoryId: categories[4].id, score: 3 },
        ],
      },
    },
  });

  console.log("✅ Reviews created");

  console.log("🎉 SEED COMPLETED SUCCESSFULLY!");
}

main()
  .catch((err) => {
    console.error("❌ Seed Error:", err);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());

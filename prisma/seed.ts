import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("💡 Seed эхэллээ...");

  // Цэвэрлэх
  await prisma.reviewRating.deleteMany();
  await prisma.reviewPhoto.deleteMany();
  await prisma.review.deleteMany();
  await prisma.business.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  await prisma.reviewCategory.deleteMany();

  // 1. Хэрэглэгчид
  await prisma.user.createMany({
    data: [
      { name: "Бат", password: "hashedpass1" },
      { name: "Сараа", password: "hashedpass2" },
    ],
  });
  const users = await prisma.user.findMany();

  // 2. Ангилал
  const food = await prisma.category.create({
    data: { name: "Хоол" },
  });

  // 3. Бизнесүүд (lat,lng)
  const businessData = [
    {
      name: "Modern Nomads",
      description: "Монгол үндэсний хоолны сүлжээ ресторан.",
      address: "УБ, СБД, 1-р хороо",
      phone: "99112233",
      email: "info@modernnomads.mn",
      website: "https://modernnomads.mn",
      location: "47.9223, 106.9170",
      facebookUrl: "https://facebook.com/modernnomads",
      instagramUrl: "https://instagram.com/modernnomads",
      timetable: "10:00–22:00",
      logoUrl: "https://yellowbook-assets.s3.ap-southeast-1.amazonaws.com/nomads_logo.png",
      categoryId: food.id,
    },
    {
      name: "BDS Mongolian BBQ",
      description: "Монгол грилл, олон улсын сонирхолтой хоолтой.",
      address: "УБ, ХУД, 15-р хороо",
      phone: "99001122",
      email: "info@bdsmongolia.mn",
      website: "https://bdsmongolia.mn",
      location: "47.9145, 106.9150",
      facebookUrl: "https://facebook.com/bdsmongolia",
      instagramUrl: "https://instagram.com/bdsmongolia",
      timetable: "11:00–23:00",
      logoUrl:
        "https://yellowbook-assets.s3.ap-southeast-1.amazonaws.com/8c0058533b75d83074fb2d54b41789f8.jpg",
      categoryId: food.id,
    },
    {
      name: "Khaan Deli",
      description: "Орчин үеийн монгол болон европ хоолны ресторан.",
      address: "УБ, БЗД, 4-р хороо",
      phone: "99115566",
      email: "contact@khaandeli.mn",
      website: "https://khaandeli.mn",
      location: "47.9260, 106.9300",
      facebookUrl: "https://facebook.com/khaandeli",
      instagramUrl: "https://instagram.com/khaandeli",
      timetable: "09:00–22:00",
      logoUrl:
        "https://yellowbook-assets.s3.ap-southeast-1.amazonaws.com/300786139_533820001877874_8270612961028424860_n.jpg",
      categoryId: food.id,
    },
  ];

  await prisma.business.createMany({ data: businessData });
  const businesses = await prisma.business.findMany({ orderBy: { name: "asc" } });

  // 4. Сэтгэгдлийн ангиллууд
  await prisma.reviewCategory.createMany({
    data: [
      { name: "Хоол", order: 1 },
      { name: "Үйлчилгээ", order: 2 },
      { name: "Уур амьсгал", order: 3 },
      { name: "Цэвэрлэгээ", order: 4 },
      { name: "Үнэ", order: 5 },
    ],
  });
  const categories = await prisma.reviewCategory.findMany({ orderBy: { order: "asc" } });

  // 5. Сэтгэгдлүүд
  if (businesses.length > 0) {
    await prisma.review.create({
      data: {
        rating: 5,
        text: "Modern Nomads үнэхээр таалагдлаа! Хоол амттай, үйлчилгээ хурдан.",
        userId: users[0].id,
        businessId: businesses[0].id,
        photos: {
          create: [
            { url: "https://yellowbook-assets.s3.ap-southeast-1.amazonaws.com/nomads_logo.png" },
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
        text: "Хоол нь боломжийн, үнэ арай өндөр байна.",
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
  }

  console.log("✅ Seed дууслаа!");
}

main()
  .catch((err) => {
    console.error("❌ Seed алдаа:", err);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());

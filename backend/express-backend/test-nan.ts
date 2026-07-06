import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  try {
    const listingData = { latitude: "", longitude: "" };
    
    let latForDb: number | null = null;
    let lngForDb: number | null = null;
    
    if (listingData.latitude) latForDb = parseFloat(listingData.latitude);
    else if (listingData.lat) latForDb = parseFloat(listingData.lat);

    if (listingData.longitude) lngForDb = parseFloat(listingData.longitude);
    else if (listingData.lng) lngForDb = parseFloat(listingData.lng);

    console.log({ latForDb, lngForDb });

    let priceForDb = null;
    let price = "1000";
    if (price) priceForDb = parseInt(price, 10);
    if (isNaN(priceForDb)) priceForDb = null;

    console.log({ priceForDb });

  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}
main();

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  try {
    const listingId = "LST-TEST-123";
    const newListing = await prisma.listing.create({
      data: {
        id: listingId,
        propertyType: "residential",
        dataUrl: "https://example.com/data.json",
        isVerified: true,
        name: "Test Listing",
        location: "Test Location",
        price: 1000,
        subtype: "Flat",
        listingAction: "Rent",
        lat: 20.123,
        lng: 73.123,
      },
    });
    console.log("Created successfully:", newListing);
  } catch (e) {
    console.error("Error creating listing:", e);
  } finally {
    await prisma.$disconnect();
  }
}
main();

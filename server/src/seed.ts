import * as dotenv from 'dotenv';
import * as path from 'path';
import mongoose from 'mongoose';
import { hashPassword } from './common/crypto';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/smugsafaris';
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'admin@smugsafaris.com').toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const ADMIN_NAME = process.env.ADMIN_NAME || 'Smugs Safari Admin';

async function main() {
  const { TOURS_DATA, DESTINATIONS_DATA } = await import('../../src/data/safariData');

  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db!;
  const now = new Date();

  for (const tour of TOURS_DATA) {
    await db.collection('tours').updateOne(
      { id: tour.id },
      { $set: { ...tour, updatedAt: now }, $setOnInsert: { createdAt: now } },
      { upsert: true },
    );
  }

  for (const destination of DESTINATIONS_DATA) {
    await db.collection('destinations').updateOne(
      { id: destination.id },
      { $set: { ...destination, updatedAt: now }, $setOnInsert: { createdAt: now } },
      { upsert: true },
    );
  }

  await db.collection('admins').updateOne(
    { email: ADMIN_EMAIL },
    {
      $set: { email: ADMIN_EMAIL, name: ADMIN_NAME, updatedAt: now },
      $setOnInsert: { passwordHash: hashPassword(ADMIN_PASSWORD), createdAt: now },
    },
    { upsert: true },
  );

  const existingBookings = await db.collection('bookings').countDocuments();
  if (existingBookings === 0) {
    const sampleBookings = [
      {
        reference: 'SMUG-824190',
        fullName: 'Elena Rostova',
        email: 'elena.rostova@travelers.com',
        phone: '+44 7911 123456',
        travelDate: '2026-11-15',
        adults: 2,
        children: 0,
        tier: 'Luxury Tented Camp',
        tourId: 'classic-kenya-big-five',
        tourTitle: '7-Day Classic Kenya Big Five Safari',
        specialRequests: 'Interested in hot air balloon safari in Maasai Mara. Vegetarian meals required.',
        source: 'website',
        status: 'new',
        notes: 'First-time safari traveler, requested brochure via WhatsApp.',
        priceQuotedUSD: 3700,
        createdAt: new Date(Date.now() - 3600000 * 2),
        updatedAt: now,
      },
      {
        reference: 'SMUG-653912',
        fullName: 'Marcus Vance',
        email: 'marcus.vance@adventures.net',
        phone: '+1 415 555 0192',
        travelDate: '2026-10-24',
        adults: 4,
        children: 1,
        tier: 'Mid-Range Comfort',
        tourId: 'maasai-mara-great-migration',
        tourTitle: '4-Day Maasai Mara Great Migration Spectacle',
        specialRequests: 'Family trip. Would love two adjoining tents and private 4x4 land cruiser.',
        source: 'website',
        status: 'contacted',
        notes: 'Spoke on phone, sent custom PDF itinerary with child rates.',
        priceQuotedUSD: 6900,
        createdAt: new Date(Date.now() - 3600000 * 18),
        updatedAt: now,
      },
      {
        reference: 'SMUG-741208',
        fullName: 'Sarah Jenkins',
        email: 'sjenkins@globalnomad.org',
        phone: '+61 491 570 156',
        travelDate: '2026-12-05',
        adults: 2,
        children: 0,
        tier: 'Luxury Tented Camp',
        tourId: 'bush-and-beach-mara-zanzibar',
        tourTitle: '10-Day Bush & Beach Safari: Mara & Zanzibar',
        specialRequests: 'Honeymoon package with beachfront villa in Kendwa, Zanzibar.',
        source: 'website',
        status: 'quoted',
        notes: 'Sent quote including internal bush flights Wilson to Mara and Mara to Zanzibar.',
        priceQuotedUSD: 5780,
        createdAt: new Date(Date.now() - 3600000 * 48),
        updatedAt: now,
      },
      {
        reference: 'SMUG-918234',
        fullName: 'David & Claire Dubois',
        email: 'claire.dubois@wanderlust.fr',
        phone: '+33 6 12 34 56 78',
        travelDate: '2026-10-18',
        adults: 2,
        children: 2,
        tier: 'Mid-Range Comfort',
        tourId: 'amboseli-tsavo-kilimanjaro',
        tourTitle: '6-Day Amboseli & Tsavo Kilimanjaro Views',
        specialRequests: 'Deposit paid. Requesting English speaking senior wildlife guide.',
        source: 'website',
        status: 'confirmed',
        notes: '50% deposit received. Vouchers issued for Ol Tukai Lodge.',
        priceQuotedUSD: 5960,
        createdAt: new Date(Date.now() - 3600000 * 96),
        updatedAt: now,
      },
      {
        reference: 'SMUG-539011',
        fullName: 'Kenji Sato',
        email: 'kenji.sato@tokyophoto.jp',
        phone: '+81 90 1234 5678',
        travelDate: '2026-09-10',
        adults: 1,
        children: 0,
        tier: 'Luxury Tented Camp',
        tourId: 'luxury-flying-safari-mara-samburu',
        tourTitle: '5-Day Luxury Flying Safari: Mara & Samburu',
        specialRequests: 'Professional wildlife photography permit, window seat on light aircraft.',
        source: 'website',
        status: 'completed',
        notes: 'Client completed safari successfully. Left 5-star review.',
        priceQuotedUSD: 2450,
        createdAt: new Date(Date.now() - 3600000 * 400),
        updatedAt: now,
      },
    ];
    for (const b of sampleBookings) {
      await db.collection('bookings').updateOne(
        { reference: b.reference },
        { $set: b },
        { upsert: true },
      );
    }
  }

  const [tourCount, destinationCount, adminCount, bookingCount] = await Promise.all([
    db.collection('tours').countDocuments(),
    db.collection('destinations').countDocuments(),
    db.collection('admins').countDocuments(),
    db.collection('bookings').countDocuments(),
  ]);

  console.log(`Seeded ${tourCount} tours, ${destinationCount} destinations, ${bookingCount} bookings, ${adminCount} admin(s).`);
  console.log(`Admin login -> ${ADMIN_EMAIL}`);
  await mongoose.disconnect();
}

main().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});

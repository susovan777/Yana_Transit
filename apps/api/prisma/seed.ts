// Path: apps/api/prisma/seed.ts
//
// Seeds the database with:
//   1. YAANA_ADMIN user         — your internal admin account (login immediately)
//   2. One test Company         — "Infosys Limited" as a sample corporate client
//   3. CORPORATE_ADMIN user     — company admin (PENDING, must activate via email)
//   4. CORPORATE_USER           — regular employee (PENDING, must activate via email)
//   5. Cities                   — 8 cities Yana Transit operates in
//   6. Sample vehicles          — 5 vehicles across categories
//
// Run with:
//   pnpm db:seed
//
// SAFE TO RE-RUN — uses upsert, so running twice won't duplicate data.
// To reset completely: pnpm db:reset (wipes DB + re-migrates + re-seeds)

import 'dotenv/config';
import { PrismaClient, Role, UserStatus, CompanyStatus } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';

// ── Prisma client (matches your apps/api/src/lib/prisma.ts pattern) ──
const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// ── Seed data — change these before running in production ─────────────

const YAANA_ADMIN = {
  name: 'Yana Admin',
  email: 'admin@yanatransit.in',
  password: 'Admin@1234', // Change immediately after first login
};

const TEST_COMPANY = {
  name: 'Infosys Limited',
  gstNumber: '29AABCI1681G1ZA',
  pan: 'AABCI1681G',
  email: 'travel@infosys.com',
  phone: '+918041204000',
  address: 'Electronics City, Hosur Road',
  city: 'Bengaluru',
  state: 'Karnataka',
  pincode: '560100',
};

const CORP_ADMIN = {
  name: 'Rahul Sharma',
  email: 'rahul.sharma@infosys.com',
};

const CORP_USER = {
  name: 'Priya Mehta',
  email: 'priya.mehta@infosys.com',
};

// ── Cities ────────────────────────────────────────────────────────────

const CITIES = [
  { name: 'Bengaluru', state: 'Karnataka', slug: 'bengaluru', hasOffice: true },
  { name: 'Mumbai', state: 'Maharashtra', slug: 'mumbai', hasOffice: true },
  { name: 'New Delhi', state: 'Delhi', slug: 'new-delhi', hasOffice: true },
  {
    name: 'Hyderabad',
    state: 'Telangana',
    slug: 'hyderabad',
    hasOffice: false,
  },
  { name: 'Chennai', state: 'Tamil Nadu', slug: 'chennai', hasOffice: false },
  { name: 'Pune', state: 'Maharashtra', slug: 'pune', hasOffice: false },
  { name: 'Goa', state: 'Goa', slug: 'goa', hasOffice: false },
  { name: 'Jaipur', state: 'Rajasthan', slug: 'jaipur', hasOffice: false },
];

// ── Main seed function ────────────────────────────────────────────────

async function main() {
  console.log('\n🌱  Starting Yana Transit database seed...\n');

  // ── 1. Cities ──────────────────────────────────────────────────────
  console.log('📍  Seeding cities...');

  for (const city of CITIES) {
    await prisma.city.upsert({
      where: { slug: city.slug },
      update: {},
      create: {
        name: city.name,
        state: city.state,
        slug: city.slug,
        isActive: true,
        hasOffice: city.hasOffice,
      },
    });
  }

  console.log(`    ✓ ${CITIES.length} cities seeded`);

  // ── 2. YAANA_ADMIN user ────────────────────────────────────────────
  // This user logs in immediately — no invitation flow needed.
  console.log('\n👤  Seeding Yana Admin user...');

  const adminPasswordHash = await bcrypt.hash(YAANA_ADMIN.password, 12);

  const admin = await prisma.user.upsert({
    where: { email: YAANA_ADMIN.email },
    update: {},
    create: {
      name: YAANA_ADMIN.name,
      email: YAANA_ADMIN.email,
      passwordHash: adminPasswordHash,
      role: Role.YAANA_ADMIN,
      status: UserStatus.ACTIVE,
      companyId: null,
    },
  });

  console.log(
    `    ✓ Admin: ${admin.email}  |  Password: ${YAANA_ADMIN.password}`
  );

  // ── 3. Test company ────────────────────────────────────────────────
  console.log('\n🏢  Seeding test company...');

  const company = await prisma.company.upsert({
    where: { id: 'seed-company-infosys' },
    update: {},
    create: {
      id: 'seed-company-infosys',
      name: TEST_COMPANY.name,
      gstNumber: TEST_COMPANY.gstNumber,
      pan: TEST_COMPANY.pan,
      email: TEST_COMPANY.email,
      phone: TEST_COMPANY.phone,
      address: TEST_COMPANY.address,
      city: TEST_COMPANY.city,
      state: TEST_COMPANY.state,
      pincode: TEST_COMPANY.pincode,
      status: CompanyStatus.ACTIVE,
    },
  });

  console.log(`    ✓ Company: ${company.name} (id: ${company.id})`);

  // ── 4. Corporate Admin (PENDING) ───────────────────────────────────
  console.log('\n👔  Seeding corporate admin user...');

  const corpAdmin = await prisma.user.upsert({
    where: { email: CORP_ADMIN.email },
    update: {},
    create: {
      name: CORP_ADMIN.name,
      email: CORP_ADMIN.email,
      passwordHash: null,
      role: Role.CORPORATE_ADMIN,
      status: UserStatus.PENDING,
      companyId: company.id,
      createdById: admin.id,
    },
  });

  console.log(`    ✓ Corp Admin: ${corpAdmin.email}  |  Status: PENDING`);

  // ── 5. Corporate User (PENDING) ────────────────────────────────────
  console.log('\n🧑  Seeding corporate user...');

  const corpUser = await prisma.user.upsert({
    where: { email: CORP_USER.email },
    update: {},
    create: {
      name: CORP_USER.name,
      email: CORP_USER.email,
      passwordHash: null,
      role: Role.CORPORATE_USER,
      status: UserStatus.PENDING,
      companyId: company.id,
      createdById: admin.id,
    },
  });

  console.log(`    ✓ Corp User: ${corpUser.email}  |  Status: PENDING`);

  // ── 6. Sample vehicles ─────────────────────────────────────────────
  console.log('\n🚗  Seeding sample vehicles...');

  const bengaluru = await prisma.city.findUnique({
    where: { slug: 'bengaluru' },
    select: { id: true },
  });

  const mumbai = await prisma.city.findUnique({
    where: { slug: 'mumbai' },
    select: { id: true },
  });

  const vehicles = [
    {
      id: 'seed-vehicle-dzire',
      name: 'Maruti Suzuki Dzire',
      category: 'SEDAN' as const,
      seats: 4,
      year: 2024,
      color: 'White',
      baseCityId: bengaluru!.id,
    },
    {
      id: 'seed-vehicle-ertiga',
      name: 'Maruti Suzuki Ertiga',
      category: 'MUV' as const,
      seats: 7,
      year: 2024,
      color: 'Silver',
      baseCityId: bengaluru!.id,
    },
    {
      id: 'seed-vehicle-innova',
      name: 'Toyota Innova Crysta',
      category: 'SUV' as const,
      seats: 7,
      year: 2023,
      color: 'Pearl White',
      baseCityId: mumbai!.id,
    },
    {
      id: 'seed-vehicle-hycross',
      name: 'Toyota Innova HyCross',
      category: 'PREMIUM_SUV' as const,
      seats: 7,
      year: 2024,
      color: 'Platinum White',
      baseCityId: mumbai!.id,
    },
    {
      id: 'seed-vehicle-carnival',
      name: 'Kia Carnival',
      category: 'PREMIUM' as const,
      seats: 8,
      year: 2024,
      color: 'Aurora Black',
      baseCityId: bengaluru!.id,
    },
  ];

  for (const v of vehicles) {
    await prisma.vehicle.upsert({
      where: { id: v.id },
      update: {},
      create: {
        id: v.id,
        name: v.name,
        category: v.category,
        seats: v.seats,
        year: v.year,
        color: v.color,
        isActive: true,
        baseCityId: v.baseCityId,
      },
    });
  }

  console.log(`    ✓ ${vehicles.length} vehicles seeded`);

  // ── Summary ────────────────────────────────────────────────────────
  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅  Seed complete!

🔑  Login credentials (ready to use):
    Email    : ${YAANA_ADMIN.email}
    Password : ${YAANA_ADMIN.password}
    Role     : YAANA_ADMIN

🏢  Test company created:
    Name     : ${TEST_COMPANY.name}
    ID       : ${company.id}

👥  Corporate users (PENDING — activate via API):
    ${CORP_ADMIN.email}  →  CORPORATE_ADMIN
    ${CORP_USER.email}    →  CORPORATE_USER

⚠️   Change the admin password after first login!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `);
}

// ── Run ───────────────────────────────────────────────────────────────

main()
  .catch((e) => {
    console.error('\n🔴  Seed failed:\n', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// ─── Seed Output ─────────────────────────────────────────────────

//   🌱  Starting Yana Transit database seed...

// 📍  Seeding cities...
//     ✓ 8 cities seeded

//     👤  Seeding Yana Admin user...
//     ✓ Admin: admin@yanatransit.in  |  Password: Admin@1234

// 🏢  Seeding test company...
//     ✓ Company: Infosys Limited (id: seed-company-infosys)

// 👔  Seeding corporate admin user...
//     ✓ Corp Admin: rahul.sharma@infosys.com  |  Status: PENDING

// 🧑  Seeding corporate user...
// ✓ Corp User: priya.mehta@infosys.com  |  Status: PENDING

// 🚗  Seeding sample vehicles...
//     ✓ 5 vehicles seeded

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ✅  Seed complete!

// 🔑  Login credentials (ready to use):
//     Email    : admin@yanatransit.in
//     Password : Admin@1234
//     Role     : YAANA_ADMIN

//     🏢  Test company created:
//     Name     : Infosys Limited
//     ID       : seed-company-infosys

//     👥  Corporate users (PENDING — activate via API):
//     rahul.sharma@infosys.com  →  CORPORATE_ADMIN
//     priya.mehta@infosys.com    →  CORPORATE_USER

// ⚠️   Change the admin password after first login!
// ──────────────────────────────────────────────────────────────────

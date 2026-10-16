import * as dotenv from 'dotenv';
import * as path from 'path';

const candidates = [
  path.resolve(process.cwd(), '.env'),
  path.resolve(__dirname, '../.env'),
  path.resolve(__dirname, '../../.env'),
];

for (const file of candidates) {
  dotenv.config({ path: file });
}

export const ENV = {
  port: Number(process.env.PORT || 4000),
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/smugsafaris',
  jwtSecret: process.env.JWT_SECRET || 'smugsafaris-local-dev-secret-change-me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '12h',
  adminEmail: (process.env.ADMIN_EMAIL || 'admin@smugsafaris.com').toLowerCase(),
  adminPassword: process.env.ADMIN_PASSWORD || 'admin123',
  adminName: process.env.ADMIN_NAME || 'Smugs Safari Admin',
  corsOrigins: (process.env.CORS_ORIGINS || 'http://localhost:3000,http://127.0.0.1:3000')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean),
};

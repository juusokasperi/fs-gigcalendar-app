import dotenv from 'dotenv';

dotenv.config();

if (!process.env.GOOGLE_URL || !process.env.POSTGRES_URL) {
	throw new Error("Required environment variables are missing.");
  }

export const POSTGRES_URL = process.env.POSTGRES_URL as string;
export const GOOGLE_URL = process.env.GOOGLE_URL as string;
export const PORT = (process.env.port || 3001) as number;
export const SECRET = process.env.SECRET;

// Nile database client setup for Next.js app
import { Nile } from '@niledatabase/server';

// Nile initialization with secure cookies for Vercel
export async function getNile() {
  return Nile({
    api: {
      secureCookies: process.env.VERCEL === '1',
    },
  });
}


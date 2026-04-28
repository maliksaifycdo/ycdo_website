/** Base URL for server-side fetches (includes `/api` prefix). */
export function getServerApiBaseUrl(): string {
  // Prefer explicit env when provided (works on all platforms).
  const explicit = process.env.NEXT_PUBLIC_API_URL;
  if (explicit) return explicit.replace(/\/$/, '');

  // Platform fallbacks for SSR where relative `/api` won't work.
  // Netlify provides URL, Vercel provides VERCEL_URL (without protocol).
  const netlifyUrl = process.env.URL;
  if (netlifyUrl) return `${netlifyUrl.replace(/\/$/, '')}/api`;

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) return `https://${vercelUrl.replace(/\/$/, '')}/api`;

  return 'http://localhost:10000/api';
}

/** Base URL for server-side fetches (includes `/api` prefix). */
export function getServerApiBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
  return raw.replace(/\/$/, '');
}

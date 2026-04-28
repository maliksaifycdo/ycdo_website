import type { Locale, MessagesRoot } from '@/constants/messages';

export function interpolate(
  template: string,
  vars?: Record<string, string | number>,
): string {
  if (!vars) return template;
  let out = template;
  for (const [k, v] of Object.entries(vars)) {
    out = out.split(`{{${k}}}`).join(String(v));
  }
  return out;
}

function getNested(obj: unknown, path: string): unknown {
  const parts = path.split('.');
  let cur: unknown = obj;
  for (const p of parts) {
    if (cur === null || typeof cur !== 'object') return undefined;
    cur = (cur as Record<string, unknown>)[p];
  }
  return cur;
}

export function translate(
  messages: MessagesRoot,
  locale: Locale,
  path: string,
  vars?: Record<string, string | number>,
): string {
  const localized = getNested(messages[locale], path);
  const fallback =
    locale !== 'en' ? getNested(messages.en, path) : undefined;
  const raw =
    typeof localized === 'string'
      ? localized
      : typeof fallback === 'string'
        ? fallback
        : undefined;
  if (raw === undefined) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[i18n] Missing translation: ${path}`);
    }
    return path;
  }
  return interpolate(raw, vars);
}

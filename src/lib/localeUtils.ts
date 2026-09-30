import { LocalizedText } from '@/types/builder';

export function getLocalizedText(
  textObj: LocalizedText | undefined,
  locale: string,
  defaultLocale = 'ru',
  fallback = ''
): string {
  if (!textObj) return fallback;
  if (textObj[locale]) return textObj[locale];
  if (textObj[defaultLocale]) return textObj[defaultLocale];
  const keys = Object.keys(textObj);
  if (keys.length > 0 && textObj[keys[0]]) return textObj[keys[0]];
  return fallback;
}

import { Breakpoint, ResponsiveValue } from '@/types/builder';

export function resolveResponsiveValue<T>(
  value: ResponsiveValue<T> | undefined,
  breakpoint: Breakpoint
): T | undefined {
  if (!value) return undefined;

  switch (breakpoint) {
    case 'mobile':
      return value.mobile ?? value.tablet ?? value.desktop;
    case 'tablet':
      return value.tablet ?? value.desktop;
    case 'desktop':
    default:
      return value.desktop;
  }
}

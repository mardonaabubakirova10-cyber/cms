import { GlobalStyles } from '@/types/builder';

export function generateGlobalCssVariables(globals: GlobalStyles): string {
  return `
    :root {
      --color-primary: ${globals.colors.primary};
      --color-secondary: ${globals.colors.secondary};
      --color-text: ${globals.colors.text};
      --color-background: ${globals.colors.background};
      --font-heading: '${globals.typography.headingFont}', sans-serif;
      --font-body: '${globals.typography.bodyFont}', sans-serif;
      --radius-sm: ${globals.radius.sm}px;
      --radius-md: ${globals.radius.md}px;
      --radius-lg: ${globals.radius.lg}px;
      --container-max-width: ${globals.containerMaxWidth}px;
    }
  `;
}

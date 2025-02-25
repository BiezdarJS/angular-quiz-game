import { TranslocoConfig, translocoConfig } from '@ngneat/transloco';

export const translocoConfigOptions: TranslocoConfig = translocoConfig({
  availableLangs: ['en', 'pl'],
  defaultLang: 'pl',
  fallbackLang: 'en',
  reRenderOnLangChange: true,
  prodMode: false, // Set to true in production
});

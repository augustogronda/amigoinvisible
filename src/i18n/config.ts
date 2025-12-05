import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { es } from './es';

export type Translations = typeof es;

const resources = {
  es: { translation: es }
} satisfies Record<string, { translation: Translations }>;

export const SUPPORTED_LANGUAGES = Object.keys(resources);

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es',
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false
    }
  });

// Type augmentation for useTranslation hook
declare module 'i18next' {
  interface CustomTypeOptions {
    resources: typeof resources['es'];
  }
}

export default i18n; 
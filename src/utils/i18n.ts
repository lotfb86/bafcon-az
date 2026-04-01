export type Lang = 'az' | 'ru' | 'en';
export const defaultLang: Lang = 'az';
export const languages: Lang[] = ['az', 'ru', 'en'];

import azStrings from '../content/i18n/az.json';
import ruStrings from '../content/i18n/ru.json';
import enStrings from '../content/i18n/en.json';

const strings: Record<Lang, typeof azStrings> = { az: azStrings, ru: ruStrings, en: enStrings };

export function getLang(url: string | URL): Lang {
  const pathname = typeof url === 'string' ? url : url.pathname;
  const seg = pathname.split('/').filter(Boolean)[0];
  if (seg === 'ru' || seg === 'en' || seg === 'az') return seg;
  return defaultLang;
}

export function getStrings(lang: Lang) {
  return strings[lang] || strings[defaultLang];
}

export function switchLang(currentUrl: string, targetLang: Lang): string {
  const parts = currentUrl.split('/').filter(Boolean);
  if (languages.includes(parts[0] as Lang)) {
    parts[0] = targetLang;
  } else {
    parts.unshift(targetLang);
  }
  return '/' + parts.join('/') + '/';
}

export function getAlternateLinks(currentUrl: string) {
  return languages.map(lang => ({
    lang,
    url: switchLang(currentUrl, lang)
  }));
}

export const pageRoutes: Record<string, Record<Lang, string>> = {
  home: { az: '/az/', ru: '/ru/', en: '/en/' },
  about: { az: '/az/haqqimizda/', ru: '/ru/o-nas/', en: '/en/about/' },
  services: { az: '/az/xidmetler/', ru: '/ru/uslugi/', en: '/en/services/' },
  projects: { az: '/az/layiheler/', ru: '/ru/proekty/', en: '/en/projects/' },
  contact: { az: '/az/elaqe/', ru: '/ru/kontakty/', en: '/en/contact/' },
};

export function getNavLinks(lang: Lang) {
  const t = getStrings(lang);
  return [
    { label: t.nav.home, href: pageRoutes.home[lang] },
    { label: t.nav.about, href: pageRoutes.about[lang] },
    { label: t.nav.services, href: pageRoutes.services[lang] },
    { label: t.nav.projects, href: pageRoutes.projects[lang] },
    { label: t.nav.contact, href: pageRoutes.contact[lang] },
  ];
}

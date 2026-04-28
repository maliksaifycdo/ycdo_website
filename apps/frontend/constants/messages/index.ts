import { aboutBundle } from './bundles/about';
import { extrasBundle } from './bundles/extras';
import { footerBundle } from './bundles/footer';
import { homeBundle } from './bundles/home';
import { miscBundle } from './bundles/misc';
import { navCommonBundle } from './bundles/navCommon';
import { pageHeroesBundle } from './bundles/pageHeroes';
import { projectsBundle } from './bundles/projects';

export type Locale = 'en' | 'ur';

export type MessagesRoot = Record<Locale, Record<string, unknown>>;

export const messages: MessagesRoot = {
  en: {
    ...navCommonBundle.en,
    ...footerBundle.en,
    ...homeBundle.en,
    ...miscBundle.en,
    ...aboutBundle.en,
    ...pageHeroesBundle.en,
    ...projectsBundle.en,
    ...extrasBundle.en,
  },
  ur: {
    ...navCommonBundle.ur,
    ...footerBundle.ur,
    ...homeBundle.ur,
    ...miscBundle.ur,
    ...aboutBundle.ur,
    ...pageHeroesBundle.ur,
    ...projectsBundle.ur,
    ...extrasBundle.ur,
  },
};

export type CmsSectionType = 'hero' | 'richText' | 'stats' | 'cards' | 'cta';

export type BaseSection = {
  id: string;
  type: CmsSectionType;
};

export type HeroSection = BaseSection & {
  type: 'hero';
  title: string;
  subtitle: string;
  body: string;
  imageUrl: string;
  cta: { label: string; href: string };
};

export type RichTextSection = BaseSection & {
  type: 'richText';
  heading: string;
  paragraphs: string[];
};

export type StatsSection = BaseSection & {
  type: 'stats';
  heading: string;
  items: Array<{ label: string; value: string }>;
};

export type CardsSection = BaseSection & {
  type: 'cards';
  heading: string;
  items: Array<{ title: string; description: string; imageUrl: string }>;
};

export type CtaSection = BaseSection & {
  type: 'cta';
  heading: string;
  text: string;
  button: { label: string; href: string };
};

export type EditableSection = HeroSection | RichTextSection | StatsSection | CardsSection | CtaSection;

export type EditablePage = {
  slug: string;
  title: string;
  seo: { title: string; description: string };
  sections: EditableSection[];
};


import Image from 'next/image';
import Link from 'next/link';
import { CmsSection } from '@/types/cms.types';

function HeroSection({ section }: { section: CmsSection }) {
  const title = String(section.title ?? '');
  const subtitle = String(section.subtitle ?? '');
  const body = String(section.body ?? '');
  const imageUrl = String(section.imageUrl ?? '');
  const cta = (section.cta ?? {}) as { label?: string; href?: string };

  return (
    <section className="relative overflow-hidden bg-[#0F2F75] text-white">
      {imageUrl ? (
        <div className="absolute inset-0 opacity-25">
          <Image src={imageUrl} alt={title || 'Hero image'} fill className="object-cover" />
        </div>
      ) : null}
      <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-10 lg:px-12">
        {subtitle ? <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">{subtitle}</p> : null}
        {title ? <h1 className="mt-4 max-w-3xl text-4xl font-black md:text-5xl">{title}</h1> : null}
        {body ? <p className="mt-6 max-w-3xl text-base text-white/90 md:text-lg">{body}</p> : null}
        {cta?.label && cta?.href ? (
          <Link
            href={cta.href}
            className="mt-8 inline-flex rounded-lg bg-[#C0272D] px-6 py-3 font-bold text-white transition-colors hover:bg-[#9B1B20]"
          >
            {cta.label}
          </Link>
        ) : null}
      </div>
    </section>
  );
}

function RichTextSection({ section }: { section: CmsSection }) {
  const heading = String(section.heading ?? '');
  const paragraphs = Array.isArray(section.paragraphs) ? section.paragraphs : [];
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-12">
        {heading ? <h2 className="text-3xl font-black text-[#0F2F75]">{heading}</h2> : null}
        <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
          {paragraphs.map((paragraph, idx) => (
            <p key={`${heading}-p-${idx}`}>{String(paragraph)}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection({ section }: { section: CmsSection }) {
  const heading = String(section.heading ?? '');
  const items = Array.isArray(section.items) ? section.items : [];
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
        {heading ? <h2 className="text-center text-3xl font-black text-[#0F2F75]">{heading}</h2> : null}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {items.map((item, idx) => {
            const typedItem = (item ?? {}) as { value?: string; label?: string };
            return (
              <article key={`stat-${idx}`} className="rounded-2xl bg-white p-6 text-center shadow-sm">
                <p className="text-3xl font-black text-[#C0272D]">{typedItem.value}</p>
                <p className="mt-2 text-sm font-semibold uppercase text-slate-600">{typedItem.label}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CardsSection({ section }: { section: CmsSection }) {
  const heading = String(section.heading ?? '');
  const items = Array.isArray(section.items) ? section.items : [];
  return (
    <section className="bg-[#f8fbff] py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
        {heading ? <h2 className="text-3xl font-black text-[#0F2F75]">{heading}</h2> : null}
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => {
            const typedItem = (item ?? {}) as { title?: string; text?: string; imageUrl?: string };
            return (
              <article key={`card-${idx}`} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                {typedItem.imageUrl ? (
                  <div className="relative h-44">
                    <Image src={typedItem.imageUrl} alt={typedItem.title || 'Card image'} fill className="object-cover" />
                  </div>
                ) : null}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#0F2F75]">{typedItem.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{typedItem.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CtaSection({ section }: { section: CmsSection }) {
  const heading = String(section.heading ?? '');
  const text = String(section.text ?? '');
  const button = (section.button ?? {}) as { label?: string; href?: string };
  return (
    <section className="bg-[#0F2F75] py-16 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center md:px-10 lg:px-12">
        <div>
          <h2 className="text-3xl font-black">{heading}</h2>
          <p className="mt-3 max-w-3xl text-white/90">{text}</p>
        </div>
        {button?.label && button?.href ? (
          <Link
            href={button.href}
            className="inline-flex rounded-lg bg-[#C0272D] px-6 py-3 font-bold text-white transition-colors hover:bg-[#9B1B20]"
          >
            {button.label}
          </Link>
        ) : null}
      </div>
    </section>
  );
}

function ImageSection({ section }: { section: CmsSection }) {
  const imageUrl = String(section.imageUrl ?? '');
  const alt = String(section.alt ?? 'Content image');
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
        {imageUrl ? (
          <div className="relative h-[300px] overflow-hidden rounded-2xl md:h-[420px]">
            <Image src={imageUrl} alt={alt} fill className="object-cover" />
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ListSection({ section }: { section: CmsSection }) {
  const heading = String(section.heading ?? '');
  const items = Array.isArray(section.items) ? section.items : [];
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-12">
        {heading ? <h2 className="text-3xl font-black text-[#0F2F75]">{heading}</h2> : null}
        <ul className="mt-6 space-y-3">
          {items.map((item, idx) => (
            <li key={`list-${idx}`} className="rounded-xl bg-slate-50 px-4 py-3 text-slate-700">
              {String(item)}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const SECTION_COMPONENTS: Record<string, ({ section }: { section: CmsSection }) => JSX.Element> = {
  hero: HeroSection,
  richText: RichTextSection,
  stats: StatsSection,
  cards: CardsSection,
  cta: CtaSection,
  image: ImageSection,
  list: ListSection,
};

export default function DynamicSectionRenderer({ section }: { section: CmsSection }) {
  const Component = SECTION_COMPONENTS[section.type];
  if (!Component) return null;
  return <Component section={section} />;
}

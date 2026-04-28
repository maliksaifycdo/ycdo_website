import type { EditableSection } from './types';
import HeroSectionEditor from './sections/HeroSectionEditor';
import RichTextSectionEditor from './sections/RichTextSectionEditor';
import StatsSectionEditor from './sections/StatsSectionEditor';
import CardsSectionEditor from './sections/CardsSectionEditor';
import CtaSectionEditor from './sections/CtaSectionEditor';

export default function SectionEditor({
  section,
  onChange,
}: {
  section: EditableSection;
  onChange: (next: EditableSection) => void;
}) {
  switch (section.type) {
    case 'hero':
      return <HeroSectionEditor value={section} onChange={(v) => onChange(v)} />;
    case 'richText':
      return <RichTextSectionEditor value={section} onChange={(v) => onChange(v)} />;
    case 'stats':
      return <StatsSectionEditor value={section} onChange={(v) => onChange(v)} />;
    case 'cards':
      return <CardsSectionEditor value={section} onChange={(v) => onChange(v)} />;
    case 'cta':
      return <CtaSectionEditor value={section} onChange={(v) => onChange(v)} />;
  }
}


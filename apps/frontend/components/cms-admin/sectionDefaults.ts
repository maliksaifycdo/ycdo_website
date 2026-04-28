import { nanoid } from 'nanoid/non-secure';
import type { CmsSectionType, EditableSection } from './types';

export function createSection(type: CmsSectionType): EditableSection {
  const id = nanoid();
  switch (type) {
    case 'hero':
      return {
        id,
        type,
        title: '',
        subtitle: '',
        body: '',
        imageUrl: '',
        cta: { label: '', href: '' },
      };
    case 'richText':
      return {
        id,
        type,
        heading: '',
        paragraphs: [''],
      };
    case 'stats':
      return {
        id,
        type,
        heading: '',
        items: [{ label: '', value: '' }],
      };
    case 'cards':
      return {
        id,
        type,
        heading: '',
        items: [{ title: '', description: '', imageUrl: '' }],
      };
    case 'cta':
      return {
        id,
        type,
        heading: '',
        text: '',
        button: { label: '', href: '' },
      };
  }
}


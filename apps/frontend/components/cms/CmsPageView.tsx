import DynamicSectionRenderer from '@/components/cms/DynamicSectionRenderer';
import { CmsPage } from '@/types/cms.types';

export default function CmsPageView({ page }: { page: CmsPage }) {
  return (
    <main>
      {page.sections.map((section, index) => (
        <DynamicSectionRenderer key={section.id || `${page.slug}-${section.type}-${index}`} section={section} />
      ))}
    </main>
  );
}

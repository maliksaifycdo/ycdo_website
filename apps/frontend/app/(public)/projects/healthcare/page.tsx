import type { Metadata } from 'next';
import { getCmsMetadata, renderCmsPage } from '@/lib/cmsPage';

export async function generateMetadata(): Promise<Metadata> {
  return getCmsMetadata('projects-healthcare');
}

export default async function Page() {
  return renderCmsPage('projects-healthcare');
}

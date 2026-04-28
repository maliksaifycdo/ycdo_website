import type { Metadata } from 'next';
import { getCmsMetadata, renderCmsPage } from '@/lib/cmsPage';

export async function generateMetadata(): Promise<Metadata> {
  return getCmsMetadata('projects-education');
}

export default async function Page() {
  return renderCmsPage('projects-education');
}

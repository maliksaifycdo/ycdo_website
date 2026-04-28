import type { Metadata } from 'next';
import { getCmsMetadata, renderCmsPage } from '@/lib/cmsPage';

export async function generateMetadata(): Promise<Metadata> {
  return getCmsMetadata('projects-food-services');
}

export default async function Page() {
  return renderCmsPage('projects-food-services');
}

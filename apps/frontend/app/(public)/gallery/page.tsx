import type { Metadata } from 'next';
import { getCmsMetadata, renderCmsPage } from '@/lib/cmsPage';

export async function generateMetadata(): Promise<Metadata> {
  return getCmsMetadata('gallery');
}

export default async function Page() {
  return renderCmsPage('gallery');
}

import type { Metadata } from 'next';
import { getCmsMetadata, renderCmsPage } from '@/lib/cmsPage';

export async function generateMetadata(): Promise<Metadata> {
  return getCmsMetadata('donate');
}

export default async function Page() {
  return renderCmsPage('donate');
}

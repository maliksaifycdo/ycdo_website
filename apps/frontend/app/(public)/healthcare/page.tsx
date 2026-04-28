import type { Metadata } from 'next';
import { getCmsMetadata, renderCmsPage } from '@/lib/cmsPage';

export async function generateMetadata(): Promise<Metadata> {
  return getCmsMetadata('healthcare');
}

export default async function Page() {
  return renderCmsPage('healthcare');
}

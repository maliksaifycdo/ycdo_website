import type { Metadata } from 'next';
import { getCmsMetadata, renderCmsPage } from '@/lib/cmsPage';

export async function generateMetadata(): Promise<Metadata> {
  return getCmsMetadata('education');
}

export default async function Page() {
  return renderCmsPage('education');
}

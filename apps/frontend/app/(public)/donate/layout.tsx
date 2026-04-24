import type { Metadata } from 'next';
import { donatePageMetadata } from './metadata';

export const metadata: Metadata = donatePageMetadata;

export default function DonateLayout({ children }: { children: React.ReactNode }) {
  return children;
}

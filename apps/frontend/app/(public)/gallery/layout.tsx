import type { Metadata } from 'next';
import { metadata as galleryMetadata } from './metadata';

export const metadata: Metadata = galleryMetadata;

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}

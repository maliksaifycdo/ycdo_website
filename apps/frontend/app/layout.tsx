import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from '@/components/Providers';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
  preload: true,
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ycdo.org.pk'),
  title: {
    default: 'YCDO – Serve Humanity',
    template: '%s | YCDO',
  },
  description:
    'Youth Community Development Organization — 30+ years of free healthcare, education and community service in Pakistan.',
  keywords: [
    'YCDO',
    'NGO Pakistan',
    'free hospital Multan',
    'healthcare Pakistan',
    'humanitarian',
    'donate Pakistan',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    url: 'https://ycdo.org.pk',
    siteName: 'YCDO',
    title: 'YCDO – Serve Humanity',
    description: '30+ years serving Pakistan',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YCDO – Serve Humanity',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-background`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

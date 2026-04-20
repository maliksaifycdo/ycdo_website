import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from '@/components/Providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'YCDO – Serve Humanity | Youth Community Development Organization',
  description: 'YCDO provides free healthcare, education, food security and community services across Multan, Pakistan. 30+ years of serving humanity.',
  keywords: 'YCDO, free hospital Multan, NGO Pakistan, healthcare, education, donation',
  openGraph: {
    title: 'YCDO – Serve Humanity',
    description: '30+ years of healthcare, education & community service in Pakistan',
    type: 'website',
  },
};

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}


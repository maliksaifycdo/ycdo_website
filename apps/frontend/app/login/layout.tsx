import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Login | YCDO',
  description: 'YCDO Admin Portal Login',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}

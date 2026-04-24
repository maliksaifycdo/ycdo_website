'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from '@/components/common/MotionDiv';
import { Menu, Globe, Share2, Users, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { NAV_LINKS } from '@/constants/brand';
import { ROUTES } from '@/constants/routes';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 z-50 w-full bg-[#1A3A8F]/90 backdrop-blur-md transition-shadow dark:bg-[#001a4d] ${
        isScrolled ? 'shadow-xl shadow-[#0b1c30]/20' : ''
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-8 lg:px-12">
        <Link href={ROUTES.HOME} className="text-2xl font-black tracking-tighter text-white">
          YCDO
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium tracking-tight text-sm uppercase pb-1 transition-colors ${
                  isActive
                    ? 'text-white border-b-2 border-[#C0272D]'
                    : 'text-[#e5eeff]/80 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button className="rounded-lg px-3 py-1 text-lg text-[#f8f9ff] transition-all duration-300 hover:bg-white/10">
            اردو
          </button>
          <Link href={ROUTES.DONATE} className="hidden rounded-lg bg-[#C0272D] px-6 py-2 font-bold text-white transition-all hover:bg-[#9B1B20] md:inline-flex">
            Donate Now
          </Link>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 md:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <AnimatePresence>
              {mobileOpen ? (
                <SheetContent side="right" className="w-80 border-none bg-[#001a4d] p-0 text-white">
                  <motion.div
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 40, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex h-full flex-col"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 p-5">
                      <span className="text-xl font-black">YCDO</span>
                      <button onClick={() => setMobileOpen(false)} className="rounded p-1 hover:bg-white/10" aria-label="Close menu">
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-5">
                      {NAV_LINKS.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className={`rounded-lg px-4 py-3 text-sm font-semibold uppercase tracking-wide ${
                              isActive ? 'bg-white/15 text-white' : 'text-[#e5eeff]/80 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            {link.label}
                          </Link>
                        );
                      })}
                    </div>
                    <div className="border-t border-white/10 p-5">
                      <Link
                        href={ROUTES.DONATE}
                        onClick={() => setMobileOpen(false)}
                        className="inline-flex w-full items-center justify-center rounded-lg bg-[#C0272D] px-5 py-3 font-bold text-white hover:bg-[#9B1B20]"
                      >
                        Donate Now
                      </Link>
                      <div className="mt-4 flex items-center justify-center gap-3 text-white/70">
                        <Globe className="h-4 w-4" />
                        <Share2 className="h-4 w-4" />
                        <Users className="h-4 w-4" />
                      </div>
                    </div>
                  </motion.div>
                </SheetContent>
              ) : null}
            </AnimatePresence>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}

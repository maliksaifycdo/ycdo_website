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
import { useLocale } from '@/contexts/LocaleContext';

export default function Navbar() {
  const pathname = usePathname();
  const { locale, setLocale, t } = useLocale();
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
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8 lg:px-12">
        <Link href={ROUTES.HOME} className="mr-3 shrink-0 text-2xl font-black tracking-tighter text-white lg:mr-6">
          YCDO
        </Link>

        <div className="hidden flex-1 items-center justify-center gap-4 md:flex lg:gap-6 xl:gap-7">
          {NAV_LINKS.map((link) => {
            const isHashLink = link.href.includes('#');
            const normalizedHref = link.href.split('#')[0];
            const isActive = pathname === link.href || (isHashLink && pathname === normalizedHref);
            const openInNewTab = 'newTab' in link && link.newTab;
            const label = t(`nav.${link.key}`);
            return (
              <Link
                key={link.href}
                href={link.href}
                target={openInNewTab ? '_blank' : undefined}
                rel={openInNewTab ? 'noopener noreferrer' : undefined}
                className={`px-1.5 py-1 text-[12px] font-semibold tracking-tight transition-colors lg:text-[13px] xl:text-sm ${
                  locale === 'en' ? 'uppercase' : ''
                } ${
                  isActive
                    ? 'text-white border-b-2 border-[#C0272D]'
                    : 'text-[#e5eeff]/80 hover:text-white'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <div className="flex shrink-0 items-center gap-2 md:gap-3">
          <button
            type="button"
            onClick={() => setLocale(locale === 'en' ? 'ur' : 'en')}
            className="rounded-lg px-3 py-1 text-lg text-[#f8f9ff] transition-all duration-300 hover:bg-white/10"
            aria-label={locale === 'en' ? 'Switch to Urdu' : 'Switch to English'}
          >
            {locale === 'en' ? 'اردو' : 'English'}
          </button>
          <Link href={ROUTES.DONATE} className="hidden rounded-lg bg-[#C0272D] px-6 py-2 font-bold text-white transition-all hover:bg-[#9B1B20] md:inline-flex">
            {t('common.donateNow')}
          </Link>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 md:hidden" aria-label={t('common.openMenu')}>
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
                      <button onClick={() => setMobileOpen(false)} className="rounded p-1 hover:bg-white/10" aria-label={t('common.closeMenu')}>
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-5">
                      {NAV_LINKS.map((link) => {
                        const isHashLink = link.href.includes('#');
                        const normalizedHref = link.href.split('#')[0];
                        const isActive = pathname === link.href || (isHashLink && pathname === normalizedHref);
                        const openInNewTab = 'newTab' in link && link.newTab;
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            target={openInNewTab ? '_blank' : undefined}
                            rel={openInNewTab ? 'noopener noreferrer' : undefined}
                            className={`rounded-lg px-4 py-3 text-sm font-semibold tracking-wide ${
                              locale === 'en' ? 'uppercase' : ''
                            } ${
                              isActive ? 'bg-white/15 text-white' : 'text-[#e5eeff]/80 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            {t(`nav.${link.key}`)}
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
                        {t('common.donateNow')}
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

'use client';

import { motion } from '@/components/common/MotionDiv';
import { cn } from '@/utils/helpers';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: SectionHeaderProps) {
  const isCenter = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(isCenter ? 'mx-auto text-center' : 'text-left')}
    >
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 text-3xl font-bold text-secondary md:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-3 max-w-2xl text-gray-500">{subtitle}</p> : null}
    </motion.div>
  );
}


'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from '@/components/common/MotionDiv';
import { ArrowRight } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { staggerContainer, staggerItem } from '@/utils/motion';

interface Program {
  title: string;
  description: string;
  borderColor: string;
  titleColor: string;
  linkColor: string;
  href: string;
  image: string;
}

const programs: Program[] = [
  {
    title: 'Scholarship Fund',
    description: 'Financial aid for tuition, books, and uniforms for high-achieving students.',
    borderColor: 'border-t-8 border-[#C0272D]',
    titleColor: 'text-[#C0272D]',
    linkColor: 'text-[#C0272D]',
    href: ROUTES.DONATE,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC1beBw2T6VSDArGPCc9dQxgprMx-H3rYwe0WlrVGhbZK0bU5AzTi6dr7LClaJlYGC_BwyBr04-CDoo8UcfIUs_1435yh09iUNb8PAtrKhQjpKLNGVdSyO_2c7JVEz4GaVf9mQL8sW-06yutgcTxYIZYRKePjwF0DYh4hvKVQsI8QG_TShCgrpbqp31C7rgvqkHq2lGTQX_azZGycPc3HqgKsmwp334GMH9S5LbESGpqX8md5pVLVho7ccTGyKzyqhL1sg2R_4PkRcf',
  },
  {
    title: 'Child Protection',
    description: 'Safe environments through community awareness to prevent child labor.',
    borderColor: 'border-t-8 border-[#1A3A8F]',
    titleColor: 'text-[#1A3A8F]',
    linkColor: 'text-[#1A3A8F]',
    href: ROUTES.PROJECTS,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC4kuSFmaV70RVo0ScDILnv-PzaFOeV75yGAxfxcxjwi11-T_3i0qoYCVBVxtRXPqGAOK9fjaC_8CFXwRRKX6uuu_FrzO9tNMScDkl4u2vfSNLExj-kxA8bj--L8omzMQgenHEpeftd44lmewnp-nA1tRLv6QZ0T3DT3bbh-sInbIEr_U-_BeiX0SCa9zeOohoNXJWEyWDoiGwWTXZRxbpJP7pTXGiLHeW53JudbWpAJA4459iJ2AViBv0bTBf4kOM6spj0_FBRfLQQ',
  },
  {
    title: 'Skills Development',
    description: 'Vocational training in IT, tailoring, electrical works for rural youth.',
    borderColor: 'border-t-8 border-[#1A7A3C]',
    titleColor: 'text-[#1A7A3C]',
    linkColor: 'text-[#1A7A3C]',
    href: ROUTES.PROJECTS,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAtUmHQUEUZpquqUIAanFfVv_Vxyu2R7b11qfnA-qmxeHyj4AKjviCQJA8fYVyVs0ep8R1QgZFJPfUdVJ4vz2DeukEgsbq6MmEu9_gzkWIes7Lh4ZoBWQ8L8Y9Mm2h17KzpeCZfGzBKMYd4fOpYgJ_WidmOfEgMMysIazMSqg691tzM3G8s02wJR9cYPZ0B-grCu8fwXHIQCgYc5-uq8BAbVRWEckH-hSzq0wL7tAmtxpEWxqc3d-WH3K-z0JF6a6OVqhJo4T__jFTU',
  },
];

export default function ProgramCards() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-12">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-black tracking-tighter text-[#1A3A8F]">Impact Programs</h2>
          <div className="mx-auto h-1 w-24 bg-[#C0272D]" />
        </div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {programs.map((program) => (
            <motion.article
              key={program.title}
              variants={staggerItem}
              className="group overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-900/5 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="h-48 overflow-hidden">
                <div className="relative h-full w-full">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={80}
                    loading="lazy"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className={`p-8 ${program.borderColor}`}>
                <h3 className={`mb-4 text-2xl font-bold ${program.titleColor}`}>{program.title}</h3>
                <p className="mb-6 leading-relaxed text-slate-600">{program.description}</p>
                <Link href={program.href} className={`inline-flex items-center font-bold transition-all hover:gap-2 ${program.linkColor}`}>
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

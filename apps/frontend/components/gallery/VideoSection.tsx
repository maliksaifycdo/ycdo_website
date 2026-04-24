import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';

const videos = [
  {
    title: "Changing Lives: Ahmed's Story",
    category: 'Education Impact',
    duration: '4:20',
    thumbnail:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDWRZr562ikSjtVt0X6c6Q4P6xEMBWIeECpnrnqgGpE2pT7bUWu9MC6zxDC-ZmTA3CsRnnc7elduOasVvnn7gvds2sViK1gSoda8iu2eOCnrBuder_QqXst2z522sHL8jnpaIffAP583Brdc3BH93A_o8oDyfUzyZjAhm0VsYuK49x_KyPwCnvfOc9Kqk-11LgD9C5mBZ9Xyu38tAOxZi2hl7shBNo3AvjpB9ACMysZAY6sHTGrMvKKqkajremiT7Zf2lgnxsw3B9Oy',
  },
  {
    title: '2023 Annual Impact Report',
    category: 'Corporate',
    duration: '12:45',
    thumbnail:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC9rdiPGArsjuL2gG2GV1VcTR40XteRVmBRQV9I4Hafo9IwwcA5xJb5XtiOH0o0ubl4Vv5S7IzEE-9j2lQoY-QKXe4Vx-buyiXXEv-8smUUuYZ5BSW-BThCHJ4-TgUCqA6XZ3mvBgBVzIreGfc8QPN3qRhbPmx2HLKYn82CHlTyRJPExB_VE5XIfviJ17ckrVOT_iCH2z448cjawQTjMHUFQxkjQe5gJo163IwqSm7WXe812S05xhWguYYmFdu4V7Yk2jJZ3RbJqk_S',
  },
  {
    title: 'The Heart of Community',
    category: 'Healthcare',
    duration: '6:15',
    thumbnail:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDvO6ueSX1Ibli_4GGKG2rbn_wvtxQJVV7d6_DZn5x7fzJYOygW_FUOu9nbFypY7jmvsFVXrjz-v24oS6XoU4FCE5Lf4QPSBSRWfgzNdJ3nGmyDXFyb3c-Oyllubvah9LRK4HoIn2drYErbTDvlTcyN2uVrv8I4ISaSleQKzwEBH5zvOZRKaNfpFTvxqaGgbHiVuqKQFaSKweHkizJGs3eezc1b9okcG3vhASLONwr2IunrvXdeIrutH6LOsQ59zgmvahwphoT5sDQv',
  },
];

export default function VideoSection() {
  return (
    <section className="bg-slate-100 py-24">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="mb-2 text-4xl font-black uppercase tracking-tighter text-[#1A3A8F]">Impact Stories in Motion</h2>
            <div className="h-1.5 w-24 bg-[#C0272D]" />
          </div>
          <Link href="https://youtube.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 font-bold text-[#1A3A8F] transition-all hover:gap-4">
            View YouTube Channel
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {videos.map((video) => (
            <article key={video.title} className="group">
              <div className="relative mb-6 aspect-video overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={75}
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/20 transition-colors group-hover:bg-slate-900/40">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#C0272D] text-white shadow-lg transition-transform group-hover:scale-110">
                    <Play className="h-8 w-8 fill-current" />
                  </div>
                </div>
              </div>
              <h4 className="mb-2 text-xl font-bold text-slate-900">{video.title}</h4>
              <p className="text-sm text-slate-600">{video.category} • {video.duration}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


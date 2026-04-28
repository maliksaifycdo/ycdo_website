'use client';

import Image from 'next/image';
import { motion } from '@/components/common/MotionDiv';
import { useLocale } from '@/contexts/LocaleContext';
import { fadeIn } from '@/utils/motion';

const partnerLogos = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAJ9rJMjuY6W1Ryf3ctWK5OP1Ivr9Ca14aB449QuWyby8PE3LgPFQw_5f4nrKUC2Z8WFI45CFdGS4cIuO0lLTmNRLJLSLsQXVAzRgx0nE8C33rqVO6MIGQzxZIJvjOmH3rdp-wmjCE7kcwkELgwc1OkvbQpisXVc0hiS-qHJt8U7oBRC2N09RLqXv3XrPOwre3kc7ow5_qdUgSkdMYmOqv387FBwq7d26ZAtv9rpBjF1LRgWcj5eVlfRYQwp7-8-6hL2HrufkcNbotQ',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDNhV2mGL-kEzgQVjLvjGf7UK6Ad8cSCO_gA6jhk7dBUJ3G83hKUb70wtu0O9hYMzRG_BKlIv29FnFGTkqSOE5kmaJvkdW9Tk6u74dOL9FhTk0Iknev5CmwSxKscfpyFvIin2Kn9GIKCzCsa-rr6rXnLax_-TbZQ8MNYuL_D914DKXSigIG_LBhrO9Iy3QPNBI_UZ168xM5sDrkdkUIPFr_6gHCZUt5U3FIGsJ4s5Fx-RA3K2R4UBhVobI8k3a0Hj02JXHpZQTSf1n',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAtis5EMWQF5HZsloFfU9J8H4M3q_qJZ-0Ognx18D9C4dS458cbxX3f3TY_c8BpmN99QQ1jMqqNPYELXRdN9ku3swe5ssUUQObZ-YMvMIq1ygo4aCHS11udlrVrAXr5KgGMXfaDSAoPxgyZHXvccZ-AFD_6PmUbwJKq8ouHrT22dE5voml6MzcnHQGWL3YBreiO9rRXidd53uqYxClkcnA8ptYe_yjz4vJ2ooOlgspVgeHGbiwa8n-GdJvLYnO8m24_8ti3jEIOv6cF',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuATNh2rcWsm5VD8WMHN4ozRxVhhXqDoOd_g8ZpKg2CMCfrpxEh3BdXevHk-ddixvjwXk3E4wbGOn9gVsB9ObrtPuMn4seNsyp7aVMswRPb1TeOI7yWKS6hOMaQq3peh1qj9oYn0UivUWoqJD3Yy_HL8IVORPUOca86_vYMVQFFDcthGx6bvZjq0czUzzkf_r8Kp0dZlimGrd_VrckypyP6Ix_VKlZFHLWsj1pvRHdgShjVVLUSvZ0odU3NqQAh7JF2P9fxS-A2LjUoj',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAsRv9YyYtq0zYodVxr2zUXrdr_s8DURoPSre_nrgNFKcWhWqd_r0-QAN5FlXui1wdia2PvwnBAlSNbb_RQAjibjs3hFwv0pvC4qM_pJmvN_sncOzTDiXock-GXD315gMBB1W_zKFgIc0y1pnudzxEwZfOOQKooM9YQccxzBEa4VZI6wdtsDUNeuI0p2npT5zK0VhgDCzdig9sC42SORgCn3qRSc_hUkYusuxRUAQhSnqRTyQ9_q58diWh0abUGtthVSXXNum1WeG1K',
];

export default function PartnersStrip() {
  const { t, locale } = useLocale();

  return (
    <motion.section
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="px-8 pb-24"
    >
      <div className="mx-auto max-w-7xl border-t border-slate-300/40 pt-16">
        <p className={`mb-12 text-center text-xs font-bold tracking-widest text-slate-500 ${locale === 'en' ? 'uppercase' : ''}`}>
          {t('home.partners.caption')}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-16 grayscale opacity-50 transition-all hover:opacity-100">
          {partnerLogos.map((logo, idx) => (
            <div key={`${logo}-${idx}`} className="relative h-10 w-36">
              <Image src={logo} alt={`Partner logo ${idx + 1}`} fill sizes="(max-width: 768px) 100vw, 180px" quality={85} loading="lazy" className="object-contain" />
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

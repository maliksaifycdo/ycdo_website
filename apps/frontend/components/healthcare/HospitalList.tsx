'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { hospitalCards } from '@/components/healthcare/data';
import { staggerContainer, staggerItem } from '@/utils/motion';

export default function HospitalList() {
  const scrollToBooking = () => {
    document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hospital-list" className="bg-white py-24">
      <div className="container mx-auto px-12">
        <div className="mb-12">
          <h2 className="mb-2 text-3xl font-bold text-[#1A3A8F]">Network Locations</h2>
          <p className="text-slate-600">Explore our full list of healthcare centers and available departments.</p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {hospitalCards.map((hospital) => (
            <motion.article
              key={hospital.name}
              variants={staggerItem}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-2"
            >
              <h3 className="mb-2 text-xl font-bold text-[#1A3A8F]">{hospital.name}</h3>
              <p className="mb-4 flex items-center gap-2 text-sm text-slate-600">
                <MapPin className="h-4 w-4" /> {hospital.address}
              </p>
              <div className="mb-6 flex flex-wrap gap-2">
                {hospital.services.map((service) => (
                  <span key={service} className="rounded bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase text-[#1A3A8F]">
                    {service}
                  </span>
                ))}
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Timing</span>
                  <span className={`font-semibold ${hospital.timingColor}`}>{hospital.timing}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={scrollToBooking}
                    className="w-full rounded-lg bg-[#C0272D] py-3 text-sm font-bold text-white transition-colors hover:bg-[#9B1B20]"
                  >
                    Book Appointment
                  </button>
                  <Link
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full rounded-lg bg-[#1A3A8F] py-3 text-center text-sm font-bold text-white transition-colors hover:bg-[#0F1F5C]"
                  >
                    Get Directions
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-8 text-center">
          <Link href={ROUTES.CONTACT} className="text-sm font-medium text-slate-500 hover:text-[#1A3A8F]">
            Need help choosing a clinic? Contact support.
          </Link>
        </div>
      </div>
    </section>
  );
}

'use client';

import toast from 'react-hot-toast';
import { Copy, Shield } from 'lucide-react';

const bankDetails = [
  { label: 'Account Title', value: 'Youth Community Dev. Org.' },
  { label: 'Bank Name', value: 'Bank Alfalah - Main Branch' },
  { label: 'Account Number', value: '0123-456789-012' },
  { label: 'IBAN', value: 'PK12ALFA0123000456789012' },
] as const;

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success('Copied!');
  } catch {
    toast.error('Could not copy');
  }
}

export default function BankDetails() {
  const primaryBlock = bankDetails.slice(0, 3);
  const iban = bankDetails[3];

  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <div className="relative overflow-hidden rounded-[2rem] bg-[#1a3a8f] p-12 text-white">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
        <div className="relative z-10 grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-4xl font-black uppercase tracking-tight">Direct Bank Transfer</h2>
            <p className="mb-8 text-lg leading-relaxed text-[#91a9ff]">
              Prefer traditional banking? You can transfer directly to our foundation accounts across Pakistan.
            </p>
            <div className="flex items-center gap-4 rounded-xl bg-white/10 p-4">
              <Shield className="h-10 w-10 shrink-0 text-[#fe5553]" aria-hidden />
              <div>
                <p className="font-bold">Verified Account</p>
                <p className="text-sm opacity-80">Reg. NGO Account under Gov. of Pakistan</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-md">
              <div className="flex justify-between gap-4">
                <div className="space-y-4">
                  {primaryBlock.map((row) => (
                    <div key={row.label}>
                      <p className="text-[10px] uppercase tracking-[0.2em] opacity-60">{row.label}</p>
                      <p
                        className={
                          row.label === 'Account Number'
                            ? 'text-2xl font-black tracking-widest'
                            : row.label === 'Account Title'
                              ? 'text-xl font-bold'
                              : 'text-lg font-semibold'
                        }
                      >
                        {row.value}
                      </p>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => copyText(primaryBlock.map((r) => `${r.label}: ${r.value}`).join('\n'))}
                  className="h-fit shrink-0 rounded-lg bg-white p-2 text-[#00236f] shadow-lg transition-colors hover:bg-[#fe5553] hover:text-white"
                  aria-label="Copy account details"
                >
                  <Copy className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-md">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] opacity-60">{iban.label}</p>
                <p className="text-lg font-bold tracking-tight">{iban.value}</p>
              </div>
              <button
                type="button"
                onClick={() => copyText(iban.value)}
                className="shrink-0 rounded-lg bg-white p-2 text-[#00236f] shadow-lg transition-colors hover:bg-[#fe5553] hover:text-white"
                aria-label="Copy IBAN"
              >
                <Copy className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

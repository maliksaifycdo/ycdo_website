'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { hospitalCards } from '@/components/healthcare/data';
import { HOSPITAL_DEPARTMENTS } from '@/constants/brand';
import { appointmentsService } from '@/services/appointments.service';

const bookingSchema = z.object({
  hospital: z.string().min(1, 'Select a hospital'),
  department: z.string().min(1, 'Select department'),
  preferredDate: z.string().min(1, 'Select date'),
  patientName: z.string().min(2, 'Name required'),
  phone: z.string().min(10, 'Valid phone required'),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function BookingForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      hospital: '',
      department: '',
      preferredDate: '',
      patientName: '',
      phone: '',
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    try {
      await appointmentsService.create({
        hospitalId: data.hospital,
        department: data.department,
        preferredDate: data.preferredDate,
        patientName: data.patientName,
        phone: data.phone,
      });
      toast.success('Appointment request submitted successfully');
      reset();
    } catch {
      toast.error('Unable to submit booking. Please try again.');
    }
  };

  return (
    <section id="booking-form" className="bg-slate-100 py-24">
      <div className="container mx-auto px-12">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] bg-white p-12 shadow-2xl">
          <div className="absolute -mr-16 -mt-16 right-0 top-0 h-32 w-32 rounded-full bg-[#1A3A8F]/5" />
          <div className="relative z-10">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-bold text-[#1A3A8F]">Book a Free Consultation</h2>
              <p className="text-slate-600">Fill in the details below and our medical coordinator will contact you shortly.</p>
            </div>

            <form className="grid grid-cols-1 gap-8 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-[#1A3A8F]">Select Hospital</label>
                <select {...register('hospital')} className="w-full rounded-xl border-none bg-slate-100 px-4 py-4 text-slate-900 focus:ring-2 focus:ring-[#1A3A8F]">
                  <option value="">Select hospital</option>
                  {hospitalCards.map((hospital) => (
                    <option key={hospital.name} value={hospital.name}>
                      {hospital.name}
                    </option>
                  ))}
                </select>
                {errors.hospital ? <p className="text-xs text-red-600">{errors.hospital.message}</p> : null}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-[#1A3A8F]">Department</label>
                <select {...register('department')} className="w-full rounded-xl border-none bg-slate-100 px-4 py-4 text-slate-900 focus:ring-2 focus:ring-[#1A3A8F]">
                  <option value="">Select department</option>
                  {HOSPITAL_DEPARTMENTS.map((dep) => (
                    <option key={dep} value={dep}>
                      {dep}
                    </option>
                  ))}
                </select>
                {errors.department ? <p className="text-xs text-red-600">{errors.department.message}</p> : null}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-[#1A3A8F]">Preferred Date</label>
                <input type="date" {...register('preferredDate')} className="w-full rounded-xl border-none bg-slate-100 px-4 py-4 text-slate-900 focus:ring-2 focus:ring-[#1A3A8F]" />
                {errors.preferredDate ? <p className="text-xs text-red-600">{errors.preferredDate.message}</p> : null}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-[#1A3A8F]">Full Name</label>
                <input type="text" placeholder="John Doe" {...register('patientName')} className="w-full rounded-xl border-none bg-slate-100 px-4 py-4 text-slate-900 focus:ring-2 focus:ring-[#1A3A8F]" />
                {errors.patientName ? <p className="text-xs text-red-600">{errors.patientName.message}</p> : null}
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold uppercase tracking-wider text-[#1A3A8F]">Phone Number</label>
                <input type="tel" placeholder="+92 3XX XXXXXXX" {...register('phone')} className="w-full rounded-xl border-none bg-slate-100 px-4 py-4 text-slate-900 focus:ring-2 focus:ring-[#1A3A8F]" />
                {errors.phone ? <p className="text-xs text-red-600">{errors.phone.message}</p> : null}
              </div>

              <div className="mt-4 md:col-span-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-2xl bg-[#C0272D] py-5 text-xl font-black text-white shadow-xl transition-all hover:bg-[#9B1B20] disabled:opacity-70"
                >
                  {isSubmitting ? 'SUBMITTING...' : 'CONFIRM BOOKING'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

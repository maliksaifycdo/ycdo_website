import LoginForm from '@/components/admin/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* LEFT SIDE - 60% */}
      <div className="relative hidden flex-col items-center justify-center overflow-hidden bg-[#1A3A8F] p-12 lg:flex lg:w-3/5">
        {/* SVG Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="login-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#login-grid)" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-md text-center text-white">
          <div className="mb-8">
            <h1 className="mb-2 text-6xl font-black tracking-tighter text-white">YCDO</h1>
            <div className="mx-auto h-1 w-16 rounded-full bg-[#C0272D]" />
          </div>

          <p className="mb-12 text-xl text-white/80">Admin Portal</p>

          <div className="mb-12 flex justify-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-black">16+</div>
              <div className="text-xs uppercase tracking-widest text-white/60">Hospitals</div>
            </div>
            <div className="w-px bg-white/20" />
            <div className="text-center">
              <div className="text-3xl font-black">22+</div>
              <div className="text-xs uppercase tracking-widest text-white/60">Programs</div>
            </div>
            <div className="w-px bg-white/20" />
            <div className="text-center">
              <div className="text-3xl font-black">30+</div>
              <div className="text-xs uppercase tracking-widest text-white/60">Years</div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 p-6">
            <p className="text-lg italic text-white/80">&ldquo;Empowering those who serve humanity&rdquo;</p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#C0272D]" />
      </div>

      {/* RIGHT SIDE - 40% (full width on small screens) */}
      <div className="flex w-full items-center justify-center bg-gradient-to-b from-[#0F2F75] to-[#001a4d] p-8 lg:w-2/5">
        <LoginForm />
      </div>
    </div>
  );
}

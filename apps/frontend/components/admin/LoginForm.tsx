'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/authStore';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const loginSchema = z.object({
  email: z.string().email('Valid email required'),
  password: z.string().min(6, 'Min 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

function decodeJwtPayload(token: string): { exp?: number } | null {
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  try {
    let base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const pad = base64.length % 4;
    if (pad) base64 += '='.repeat(4 - pad);
    return JSON.parse(atob(base64)) as { exp?: number };
  } catch {
    return null;
  }
}

export default function LoginForm() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isChecking, setIsChecking] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema) as Resolver<LoginFormData>,
  });

  useEffect(() => {
    const checkAuth = () => {
      const { isAuthenticated, token, logout: clearAuth } = useAuthStore.getState();

      if (!isAuthenticated || !token) {
        setIsChecking(false);
        return;
      }

      const payload = decodeJwtPayload(token);
      if (!payload) {
        clearAuth();
        setIsChecking(false);
        return;
      }

      if (payload.exp != null && payload.exp * 1000 < Date.now()) {
        clearAuth();
        setIsChecking(false);
        return;
      }

      router.replace(ROUTES.ADMIN.ROOT);
    };

    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setAuthError('');

    try {
      const response = await authService.login(data);
      
      // Store auth data first
      login(response.token, response.user);
      
      // Show success toast
      toast.success('Welcome back!');
      
      // Force hard redirect so middleware sees cookie token immediately
      window.location.href = ROUTES.ADMIN.ROOT;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      const message = err?.response?.data?.message || err?.message || 'Invalid email or password';
      setAuthError(message);
      toast.error(message);
      setIsLoading(false);
    }
  };

  if (isChecking) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <div
          className="h-8 w-8 animate-spin rounded-full border-4 border-[#1A3A8F] border-t-[#C0272D]"
          aria-label="Checking session"
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <Card className="border border-white/10 bg-white/95 shadow-xl backdrop-blur-sm">
        <CardHeader className="pb-6 text-center">
          <CardTitle className="text-3xl font-black text-[#1A3A8F]">Welcome Back</CardTitle>
          <CardDescription className="text-gray-500">Sign in to your admin account</CardDescription>
          <div className="mt-4 h-px bg-gray-200" />
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-slate-900">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@ycdo.org.pk"
                  className="bg-white pl-10 text-slate-900 placeholder:text-slate-400"
                  {...register('email')}
                />
              </div>
              {errors.email ? <p className="text-xs text-red-500">{errors.email.message}</p> : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-slate-900">
                Password
              </Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="bg-white pl-10 pr-10 text-slate-900 placeholder:text-slate-400"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password ? <p className="text-xs text-red-500">{errors.password.message}</p> : null}
            </div>

            {authError ? (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">{authError}</div>
            ) : null}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-[#C0272D] py-3 font-bold text-white transition-all hover:bg-[#9B1B20] active:scale-95"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span
                    className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
                    aria-hidden
                  />
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <div className="mt-8 space-y-2 text-center">
            <Link href={ROUTES.HOME} className="flex items-center justify-center gap-1 text-sm font-semibold text-[#0F2F75] hover:underline">
              ← Back to Website
            </Link>
            <p className="text-xs text-gray-400">YCDO Admin Portal v1.0</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

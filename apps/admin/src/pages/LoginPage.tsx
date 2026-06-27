// Path: apps/admin/src/pages/LoginPage.tsx
import { z } from 'zod';
import { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useAuth } from '../store/auth.store';
import { Car, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

export function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Already logged in → go to dashboard
  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.email, data.password);
      // Save access token for axios interceptor
      // (auth store sets it in context, we also persist to sessionStorage)
      navigate('/dashboard', { replace: true });
      toast.success('Welcome back!');
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { error?: { message?: string } } } })
          ?.response?.data?.error?.message ?? 'Invalid email or password.';
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#F7F9FC' }}>
      {/* Left panel — navy brand side */}
      <div
        className="hidden lg:flex flex-col justify-between w-[420px] shrink-0 p-10"
        style={{ background: '#0B1F3A' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[#2E6FD8] flex items-center justify-center">
            <Car size={18} className="text-white" />
          </div>
          <span
            className="text-white font-semibold text-lg"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Yana Transit
          </span>
        </div>

        {/* Middle copy */}
        <div>
          <p className="text-white/30 text-xs tracking-[2px] uppercase font-medium mb-4">
            B2B Corporate Transport
          </p>
          <h2
            className="text-white text-3xl font-bold leading-snug mb-4"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Manage your fleet,
            <br />
            <span className="text-[#7EB3FF]">effortlessly.</span>
          </h2>
          <p className="text-white/45 text-sm leading-relaxed max-w-xs">
            The operations hub for Yana Transit — bookings, invoices, fleet and
            corporate client management in one place.
          </p>
        </div>

        {/* Bottom stats */}
        <div className="flex gap-8 border-t border-white/10 pt-6">
          {[
            { value: '50+', label: 'Cities' },
            { value: '200+', label: 'Vehicles' },
            { value: '4.9★', label: 'Avg. Rating' },
          ].map((s) => (
            <div key={s.label}>
              <p
                className="text-white text-xl font-bold"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {s.value}
              </p>
              <p className="text-white/35 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — login form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[400px]">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-[#0B1F3A] flex items-center justify-center">
              <Car size={16} className="text-white" />
            </div>
            <span
              className="text-[#0B1F3A] font-semibold text-base"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Yana Transit
            </span>
          </div>

          <h1
            className="text-2xl font-bold text-[#0B1F3A] mb-1"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Sign in
          </h1>
          <p className="text-[#6B7A90] text-sm mb-8">
            Admin access only. Contact your administrator if you need access.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-[#0B1F3A] mb-1.5 tracking-wide uppercase">
                Email address
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder="you@company.in"
                autoComplete="email"
                className="w-full px-3.5 py-2.5 rounded-lg border text-sm text-[#0B1F3A] placeholder-[#A0AEC0] outline-none transition-all"
                style={{
                  borderColor: errors.email ? '#EF4444' : '#E2E8F2',
                  background: '#fff',
                  boxShadow: errors.email
                    ? '0 0 0 3px rgba(239,68,68,0.08)'
                    : undefined,
                }}
                onFocus={(e) => (e.target.style.borderColor = '#2E6FD8')}
                onBlur={(e) =>
                  (e.target.style.borderColor = errors.email
                    ? '#EF4444'
                    : '#E2E8F2')
                }
              />
              {errors.email && (
                <p className="text-[#EF4444] text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-[#0B1F3A] mb-1.5 tracking-wide uppercase">
                Password
              </label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full px-3.5 py-2.5 pr-10 rounded-lg border text-sm text-[#0B1F3A] placeholder-[#A0AEC0] outline-none transition-all"
                  style={{
                    borderColor: errors.password ? '#EF4444' : '#E2E8F2',
                    background: '#fff',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#2E6FD8')}
                  onBlur={(e) =>
                    (e.target.style.borderColor = errors.password
                      ? '#EF4444'
                      : '#E2E8F2')
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A0AEC0] hover:text-[#6B7A90] transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[#EF4444] text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot password */}
            <div className="flex justify-end">
              <a
                href="/forgot-password"
                className="text-xs text-[#2E6FD8] hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{
                background: isSubmitting ? '#6B9EE8' : '#2E6FD8',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

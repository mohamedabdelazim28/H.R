'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAppStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);

    if (success) {
      if (email === 'admin123@filed.com') {
        router.push('/admin');
      } else {
        router.back();
      }
    } else {
      setError('بيانات الدخول غير صحيحة. يرجى المحاولة مرة أخرى.');
    }
  };

  return (
    <main className="min-h-screen bg-[#edf6f0] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-10 text-center">

        <div className="mb-8">
          <Link href="/" className="inline-block bg-[#4caf50] text-white font-black text-xl tracking-wider px-6 py-2.5 rounded-full mb-8">
            FILED
          </Link>
          <h1 className="text-[28px] font-black text-gray-900 mb-3">تسجيل الدخول</h1>
          <p className="text-gray-400 font-medium text-sm">سجل دخولك لحجز الملاعب وإدارة حجوزاتك</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 font-bold text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 text-right">
          <div>
            <label className="block text-[13px] font-bold text-gray-600 mb-2">البريد الإلكتروني</label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <span className="text-xl">✉️</span>
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-4 pr-12 py-3.5 bg-[#f4f7fb] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4caf50]/20 transition-all font-medium text-center dir-ltr text-gray-700"
                placeholder="rowida189@filed.com"
                dir="ltr"
              />
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-bold text-gray-600 mb-2">كلمة المرور</label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <span className="text-xl">🔒</span>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-4 pr-12 py-3.5 bg-[#f4f7fb] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4caf50]/20 transition-all font-black text-center tracking-[0.3em] dir-ltr text-gray-900"
                placeholder="••••••••••"
                dir="ltr"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#4caf50] hover:bg-[#43a047] text-white font-bold py-4 rounded-2xl transition-all shadow-sm flex items-center justify-center gap-2 mt-4"
          >
            <span>دخول</span>
            <span className="text-lg">←</span>
          </button>
        </form>

      </div>
    </main>
  );
}

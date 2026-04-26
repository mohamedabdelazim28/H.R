'use client';

import { LogOut } from 'lucide-react'
import Link from 'next/link'
import { useAppStore } from '@/lib/store'

export default function Header() {
  const { user, logout } = useAppStore();

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="block">
          <span className="text-2xl font-black text-[#1e5eea] tracking-wider uppercase">FIELD</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6 items-center">
          {user?.role === 'admin' && (
            <Link href="/admin" className="text-sm font-bold text-gray-800 hover:text-blue-600 transition-colors">
              لوحة التحكم
            </Link>
          )}

          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-gray-500 bg-[#f4f7fb] px-4 py-1.5 rounded-lg hidden sm:block">
                {user.email}
              </span>
              <button
                onClick={logout}
                className="bg-white border border-red-200 hover:bg-red-50 text-red-500 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors flex items-center gap-1.5"
                title="تسجيل الخروج"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">خروج</span>
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link href="/login" className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-5 py-2 rounded-xl text-sm font-bold transition-colors">
                دخول
              </Link>
              <Link href="/login" className="bg-[#4caf50] hover:bg-[#43a047] text-white px-5 py-2 rounded-xl text-sm font-bold transition-colors shadow-sm hidden sm:block">
                حساب جديد
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

'use client';

import { use, useState, useEffect } from 'react';
import { useAppStore, type Booking, type TrainingSession } from '@/lib/store';
import Header from '@/components/header';
import { MapPin, Info, ArrowRight, Calendar as CalendarIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function FieldPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { user, fields, bookings, trainingSessions, addBooking, cancelBooking } = useAppStore();
  const field = fields.find(f => String(f.id) === String(resolvedParams.id));

  // Date selection state
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const dateString = selectedDate.toISOString().split('T')[0];

  if (!field) {
    return (
      <main className="min-h-screen bg-[#f4f8fb] flex flex-col font-sans" dir="rtl">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <p className="text-xl text-gray-500 mb-6">لم يتم العثور على الملعب</p>
          <Link href="/" className="bg-green-600 text-white px-6 py-2 rounded-xl font-bold">العودة للرئيسية</Link>
        </div>
      </main>
    );
  }

  // Predefined working hours (e.g., 18:00 to 23:00)
  const availableHours = ['18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

  const getSlotStatus = (time: string): 'Available' | 'Booked' | 'Training' | 'BookedByOther' => {
    // Check if training
    const isTraining = trainingSessions.some(
      ts => String(ts.fieldId) === String(field.id) && ts.date === dateString && ts.time === time
    );
    if (isTraining) return 'Training';

    // Check if booked or pending
    const booking = bookings.find(
      b => String(b.fieldId) === String(field.id) && b.date === dateString && b.time === time && (b.status === 'Pending' || b.status === 'Confirmed')
    );
    if (booking) {
      if (booking.userEmail === user?.email) return 'Booked'; // Can be cancelled by user
      return 'BookedByOther'; // Cannot be interacted with
    }

    return 'Available';
  };

  const handleSlotClick = (time: string) => {
    if (!user) {
      alert('يجب تسجيل الدخول أولاً لتتمكن من الحجز');
      router.push('/login');
      return;
    }

    const status = getSlotStatus(time);
    if (status === 'Available') {
      if (confirm(`هل تريد حجز هذا الملعب الساعة ${time}؟`)) {
        addBooking({
          fieldId: field.id,
          userEmail: user.email,
          date: dateString,
          time,
          status: 'Pending'
        });
        alert(`تم حجز ${field.name} الساعة ${time} بنجاح! في انتظار التأكيد.`);
      }
    } else if (status === 'Booked') {
      const bookingToCancel = bookings.find(
        b => String(b.fieldId) === String(field.id) && b.date === dateString && b.time === time && (b.status === 'Pending' || b.status === 'Confirmed') && b.userEmail === user.email
      );
      if (bookingToCancel && confirm('هذا الموعد محجوز مسبقاً. هل تريد إلغاء الحجز الخاص بك؟')) {
        cancelBooking(bookingToCancel.id);
        alert('تم إلغاء الحجز.');
      }
    } else if (status === 'BookedByOther') {
      alert('هذا الموعد محجوز لشخص آخر.');
    } else if (status === 'Training') {
      alert('هذا الموعد محجوز لجلسة تدريبية.');
    }
  };

  const getSlotColor = (status: 'Available' | 'Booked' | 'Training' | 'BookedByOther') => {
    switch (status) {
      case 'Available': return 'bg-[#eef8f0] text-[#388e3c] border-[#4caf50]/30 hover:bg-[#4caf50] hover:text-white hover:border-[#4caf50] shadow-sm cursor-pointer';
      case 'Booked': return 'bg-red-50 text-red-700 border-red-200 cursor-pointer'; // red but clickable to cancel in mock app
      case 'BookedByOther': return 'bg-red-50 text-red-700 border-red-200 cursor-not-allowed opacity-75'; // non-interactable
      case 'Training': return 'bg-yellow-50 text-yellow-700 border-yellow-200 cursor-not-allowed opacity-75';
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f8fb] pb-20 font-sans" dir="rtl">
      <Header />

      {/* Banner */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full text-white transition-colors">
              <ArrowRight className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-white">{field.name}</h1>
              <div className="flex items-center gap-2 text-gray-400 mt-2 font-medium">
                <MapPin className="w-4 h-4 text-green-500" />
                <span>{field.location}</span>
                <span className="mx-2">•</span>
                <span className="bg-gray-800 text-white px-2 py-0.5 rounded text-sm uppercase">{field.type}</span>
              </div>
            </div>
          </div>
          <div className="text-left md:text-right">
            <div className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-1">السعر في الساعة</div>
            <div className="text-4xl font-black text-[#4caf50] flex items-baseline gap-1 dir-ltr justify-end">
              {field.price} <span className="text-xl text-gray-400">ج.م</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-10">
          {/* Gallery */}
          <div className="rounded-3xl overflow-hidden bg-gray-200 shadow-sm border border-gray-200 aspect-video relative">
            <img
              src={field.images[0] || "/placeholder.svg"}
              alt={field.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Description */}
          <div className="bg-white rounded-[32px] p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Info className="w-6 h-6 text-[#4caf50]" />
              عن الملعب
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              {field.description}
            </p>
            {field.map && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <a
                  href={field.map}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-bold transition-colors"
                >
                  <MapPin className="w-5 h-5" />
                  عرض الموقع على الخريطة
                </a>
              </div>
            )}
            {field.phone && field.phone !== 'غير متوفر' && (
              <div className="mt-4 text-gray-700 font-bold flex items-center gap-2">
                <span>رقم التواصل:</span>
                <span className="dir-ltr">{field.phone}</span>
              </div>
            )}
          </div>

          {/* Subscriptions Section for specific fields */}
          {['7', '8', '9'].includes(String(field.id)) && (
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <CalendarIcon className="w-6 h-6 text-green-600" />
                الاشتراكات
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-[#4caf50]/30 bg-[#eef8f0] p-6 rounded-2xl flex flex-col gap-3 relative overflow-hidden group hover:border-[#4caf50] transition-colors">
                  <div className="absolute top-0 right-0 w-2 h-full bg-[#4caf50]"></div>
                  <h3 className="font-bold text-lg text-[#388e3c]">اشتراك لمدة سنة</h3>
                  <div className="text-3xl font-black text-[#4caf50] flex items-baseline gap-1 dir-ltr justify-end">
                    1200 <span className="text-base text-[#4caf50]/70">ج.م</span>
                  </div>
                  <button className="w-full py-3 bg-[#4caf50] hover:bg-[#43a047] text-white rounded-xl font-bold transition-colors mt-2" onClick={() => alert('تم طلب الاشتراك بنجاح سيتم التواصل معك')}>
                    اشترك الآن
                  </button>
                </div>

                <div className="border border-blue-200 bg-blue-50 p-6 rounded-2xl flex flex-col gap-3 relative overflow-hidden group hover:border-blue-400 transition-colors">
                  <div className="absolute top-0 right-0 w-2 h-full bg-blue-500"></div>
                  <h3 className="font-bold text-lg text-blue-900">اشتراك لمدة ٣ سنوات</h3>
                  <div className="text-3xl font-black text-blue-600 flex items-baseline gap-1 dir-ltr justify-end">
                    3000 <span className="text-base text-blue-700/70">ج.م</span>
                  </div>
                  <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors mt-2" onClick={() => alert('تم طلب الاشتراك بنجاح سيتم التواصل معك')}>
                    اشترك الآن
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Booking */}
        <div className="space-y-6">
          <div className="bg-white rounded-[32px] p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 sticky top-28">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <CalendarIcon className="w-6 h-6 text-[#4caf50]" />
              احجز موعداً
            </h2>

            {/* Date Picker */}
            <div className="mb-8">
              <label htmlFor="booking-date" className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">اختر التاريخ</label>
              <input
                id="booking-date"
                title="التاريخ"
                type="date"
                value={dateString}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3.5 bg-[#f4f7fb] focus:outline-none focus:ring-4 focus:ring-[#4caf50]/20 focus:border-[#4caf50] font-semibold text-gray-900"
              />
            </div>

            {/* Slots Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">المواعيد المتاحة</label>
                <div className="flex gap-3 text-xs font-bold text-gray-500">
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-green-500"></span> متاح</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> محجوز</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {availableHours.map(time => {
                  const status = getSlotStatus(time);
                  return (
                    <button
                      key={time}
                      onClick={() => handleSlotClick(time)}
                      disabled={status === 'Training' || status === 'BookedByOther'}
                      className={`py-3 px-4 rounded-xl border-2 font-bold transition-all text-center flex flex-col items-center gap-1 ${getSlotColor(status)}`}
                    >
                      <span className="text-lg dir-ltr">{time}</span>
                      <span className="text-[10px] uppercase tracking-wider">
                        {status === 'Available' ? 'متاح' : (status === 'Booked' || status === 'BookedByOther') ? 'محجوز' : 'تدريب'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-start gap-3 bg-[#f4f7fb] text-gray-700 p-4 rounded-xl text-sm font-medium">
                <Info className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-500" />
                <p>اضغط على أي موعد <span className="font-bold text-[#4caf50]">متاح</span> للحجز فوراً. اضغط على موعد <span className="font-bold text-red-500">محجوز</span> لإلغاء حجزك.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}

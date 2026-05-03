'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import Header from '@/components/header';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, Plus, Trash2, Edit2, Calendar, CheckCircle2, XCircle, Users } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const { user, fields, bookings, trainingSessions, coaches, addField, deleteField, confirmBooking, cancelBooking, deleteBooking, addTrainingSession, removeTrainingSession, addCoach, removeCoach } = useAppStore();

  const [activeTab, setActiveTab] = useState<'fields' | 'bookings' | 'training' | 'coaches'>('bookings');

  // Create Field form state
  const [isAddingField, setIsAddingField] = useState(false);
  const [newField, setNewField] = useState({ name: '', location: 'مدينة العبور', price: 0, type: '5v5', description: '', image: '', map: '', phone: '' });

  // Training form state
  const [newTraining, setNewTraining] = useState({ fieldId: '', date: '', time: '18:00', coachName: '', ageGroup: '2013' });

  // Coach form state
  const [newCoach, setNewCoach] = useState({ name: '', fieldId: '' });

  // Security check
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!user) {
        router.replace('/');
      } else if (user.role !== 'admin') {
        router.replace('/');
      }
    }
  }, [user, router]);

  if (user?.role !== 'admin') {
    return null;
  }

  const handleAddField = (e: React.FormEvent) => {
    e.preventDefault();
    addField({
      name: newField.name,
      location: newField.location,
      price: Number(newField.price),
      type: newField.type,
      description: newField.description,
      images: [newField.image || 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop'],
      map: newField.map,
      phone: newField.phone,
    });
    setIsAddingField(false);
    setNewField({ name: '', location: 'مدينة العبور', price: 0, type: '5v5', description: '', image: '', map: '', phone: '' });
    alert('تم إضافة الملعب بنجاح');
  };

  const handleAddTraining = (e: React.FormEvent) => {
    e.preventDefault();
    addTrainingSession({
      fieldId: newTraining.fieldId,
      date: newTraining.date,
      time: newTraining.time,
      coachName: newTraining.coachName,
      ageGroup: newTraining.ageGroup,
    });
    alert('تم إضافة جلسة التدريب بنجاح');
  };

  const handleAddCoach = (e: React.FormEvent) => {
    e.preventDefault();
    addCoach({
      name: newCoach.name,
      fieldId: newCoach.fieldId,
    });
    setNewCoach({ name: '', fieldId: '' });
    alert('تم إضافة المدرب بنجاح');
  };

  return (
    <main className="min-h-screen bg-[#f4f8fb] pb-20 font-sans" dir="rtl">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-end gap-3 mb-8">
          <h1 className="text-[28px] font-black text-[#0f172a] tracking-tight">لوحة تحكم المدير</h1>
          <div className="bg-[#2f55d4] p-2 rounded-xl">
            <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
            <div className="flex items-center gap-2 mb-4 text-gray-500 font-bold text-[15px]">
              <Users className="w-5 h-5" />
              <span>إجمالي الحجوزات</span>
            </div>
            <div className="text-4xl font-black text-[#2f55d4] text-right">{bookings.length}</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
            <div className="flex items-center gap-2 mb-4 text-gray-500 font-bold text-[15px]">
              <CheckCircle2 className="w-5 h-5" />
              <span>تم التأكيد</span>
            </div>
            <div className="text-4xl font-black text-[#22c55e] text-right">{bookings.filter(b => b.status === 'Confirmed').length}</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
            <div className="flex items-center gap-2 mb-4 text-gray-500 font-bold text-[15px]">
              <XCircle className="w-5 h-5" />
              <span>ملغي</span>
            </div>
            <div className="text-4xl font-black text-[#ef4444] text-right">{bookings.filter(b => b.status === 'Cancelled').length}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-end gap-3 mb-8">
          <button
            onClick={() => setActiveTab('coaches')}
            className={`px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'coaches' ? 'bg-[#2f55d4] text-white shadow-md shadow-blue-500/20' : 'bg-white border border-gray-200 text-gray-500 hover:text-gray-900'}`}
          >
            المدربين
          </button>
          <button
            onClick={() => setActiveTab('training')}
            className={`px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'training' ? 'bg-[#2f55d4] text-white shadow-md shadow-blue-500/20' : 'bg-white border border-gray-200 text-gray-500 hover:text-gray-900'}`}
          >
            جلسات التدريب
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'bookings' ? 'bg-[#2f55d4] text-white shadow-md shadow-blue-500/20' : 'bg-white border border-gray-200 text-gray-500 hover:text-gray-900'}`}
          >
            الحجوزات
          </button>
          <button
            onClick={() => setActiveTab('fields')}
            className={`px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'fields' ? 'bg-[#2f55d4] text-white shadow-md shadow-blue-500/20' : 'bg-white border border-gray-200 text-gray-500 hover:text-gray-900'}`}
          >
            إدارة الملاعب
          </button>
        </div>

        {/* Fields Tab */}
        {activeTab === 'fields' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">سجل الملاعب ({fields.length})</h2>
              <button
                onClick={() => setIsAddingField(!isAddingField)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> إضافة ملعب
              </button>
            </div>

            {isAddingField && (
              <form onSubmit={handleAddField} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="field-name" className="block text-xs font-bold text-gray-500 uppercase mb-1">اسم الملعب</label>
                  <input id="field-name" title="اسم الملعب" required value={newField.name} onChange={e => setNewField({ ...newField, name: e.target.value })} className="w-full border p-2 rounded-lg" placeholder="اسم الملعب أو الأرينا" />
                </div>
                <div>
                  <label htmlFor="field-location" className="block text-xs font-bold text-gray-500 uppercase mb-1">المدينة</label>
                  <select id="field-location" title="المدينة" required value={newField.location} onChange={e => setNewField({ ...newField, location: e.target.value })} className="w-full border p-2 rounded-lg">
                    <option value="مدينة العبور">مدينة العبور</option>
                    <option value="الخانكة">الخانكة</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="field-price" className="block text-xs font-bold text-gray-500 uppercase mb-1">السعر (ج.م/ساعة)</label>
                  <input id="field-price" title="السعر" required type="number" value={newField.price} onChange={e => setNewField({ ...newField, price: Number(e.target.value) })} className="w-full border p-2 rounded-lg" />
                </div>
                <div>
                  <label htmlFor="field-type" className="block text-xs font-bold text-gray-500 uppercase mb-1">النوع</label>
                  <select id="field-type" title="النوع" required value={newField.type} onChange={e => setNewField({ ...newField, type: e.target.value })} className="w-full border p-2 rounded-lg">
                    <option value="5v5">5v5</option>
                    <option value="7v7">7v7</option>
                    <option value="11v11">11v11</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="field-image" className="block text-xs font-bold text-gray-500 uppercase mb-1">رابط الصورة</label>
                  <input id="field-image" title="رابط الصورة" value={newField.image} onChange={e => setNewField({ ...newField, image: e.target.value })} className="w-full border p-2 rounded-lg dir-ltr text-left" placeholder="https://..." />
                </div>
                <div>
                  <label htmlFor="field-map" className="block text-xs font-bold text-gray-500 uppercase mb-1">رابط اللوكيشن (Map)</label>
                  <input id="field-map" title="رابط اللوكيشن" value={newField.map} onChange={e => setNewField({ ...newField, map: e.target.value })} className="w-full border p-2 rounded-lg dir-ltr text-left" placeholder="https://maps.google.com/..." />
                </div>
                <div>
                  <label htmlFor="field-phone" className="block text-xs font-bold text-gray-500 uppercase mb-1">رقم التليفون</label>
                  <input id="field-phone" title="رقم التليفون" value={newField.phone} onChange={e => setNewField({ ...newField, phone: e.target.value })} className="w-full border p-2 rounded-lg dir-ltr text-left" placeholder="010..." />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="field-description" className="block text-xs font-bold text-gray-500 uppercase mb-1">الوصف</label>
                  <textarea id="field-description" title="الوصف" required value={newField.description} onChange={e => setNewField({ ...newField, description: e.target.value })} className="w-full border p-2 rounded-lg" rows={3}></textarea>
                </div>
                <div className="md:col-span-2 flex justify-end gap-2">
                  <button type="button" onClick={() => setIsAddingField(false)} className="px-4 py-2 bg-gray-100 rounded-lg font-bold text-gray-600">إلغاء</button>
                  <button type="submit" className="px-4 py-2 bg-green-600 rounded-lg font-bold text-white">حفظ الملعب</button>
                </div>
              </form>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">الملعب</th>
                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">المدينة</th>
                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">السعر</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {fields.map(field => (
                    <tr key={field.id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={field.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                          <div>
                            <div className="font-bold text-gray-900">{field.name}</div>
                            <div className="text-xs text-gray-500">{field.type}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{field.location}</td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-900">{field.price} ج.م</td>
                      <td className="px-6 py-4 text-left text-sm font-medium">
                        <button onClick={() => { if (confirm('هل أنت متأكد من مسح الملعب؟')) deleteField(String(field.id)) }} className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-lg inline-flex" title="مسح الملعب">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {fields.length === 0 && <div className="p-8 text-center text-gray-500 font-medium">لا توجد ملاعب مضافة بعد.</div>}
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-50 flex items-center justify-end gap-2">
                <h2 className="text-xl font-bold text-gray-900">سجل الحجوزات</h2>
                <Calendar className="w-5 h-5 text-gray-500" />
              </div>
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-[#f8fafc]">
                  <tr>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider w-[30%]">الملعب</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider w-[20%]">التاريخ والوقت</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider w-[20%]">العميل</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider w-[15%]">الحالة</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-[15%]">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-50">
                  {bookings.map(booking => {
                    const field = fields.find(f => String(f.id) === String(booking.fieldId));
                    // User name derived from booking or fallback to email
                    const displayName = booking.userName || (booking.userEmail || '').split('@')[0].replace(/[0-9]/g, '') || 'غير معروف';
                    const avatarLetter = displayName.charAt(0).toUpperCase() || 'م';

                    return (
                      <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-5 text-sm font-bold text-gray-900">{field?.name || 'غير معروف'}</td>
                        <td className="px-6 py-5 text-[13px] text-gray-500 dir-ltr text-right font-medium">{booking.time} • {booking.date}</td>
                        <td className="px-6 py-5">
                          <div className="flex items-center justify-end gap-3">
                            <div className="flex flex-col items-end">
                              <span className="text-sm font-bold text-gray-700">{displayName}</span>
                              {booking.userPhone && <span className="text-xs text-gray-500 dir-ltr">{booking.userPhone}</span>}
                            </div>
                            <div className="w-8 h-8 rounded-full bg-[#2f55d4] text-white flex items-center justify-center font-bold text-sm">
                              {avatarLetter}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border
                            ${booking.status === 'Confirmed' ? 'bg-[#f0fdf4] text-[#16a34a] border-[#bbf7d0]' :
                              booking.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                'bg-[#fef2f2] text-[#ef4444] border-[#fecaca]'}`}
                          >
                            {booking.status === 'Pending' ? 'قيد الانتظار' : booking.status === 'Confirmed' ? '✓ تم التأكيد' : '• ملغي'}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-left flex justify-end gap-2">
                          {booking.status === 'Pending' && (
                            <button onClick={() => confirmBooking(booking.id)} className="text-[#16a34a] hover:bg-[#f0fdf4] border border-[#bbf7d0] p-1.5 rounded-lg transition-colors" title="تأكيد الحجز">
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                          )}
                          {(booking.status === 'Pending' || booking.status === 'Confirmed') && (
                            <button onClick={() => cancelBooking(booking.id)} className="text-[#ef4444] hover:bg-[#fef2f2] border border-[#fecaca] p-1.5 rounded-lg transition-colors" title="إلغاء الحجز">
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}
                          {booking.status === 'Cancelled' && (
                            <button onClick={() => { if (confirm('هل أنت متأكد من مسح الحجز؟')) deleteBooking(booking.id) }} className="text-[#ef4444] hover:bg-[#fef2f2] border border-[#fecaca] p-1.5 rounded-lg transition-colors" title="مسح الحجز">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {bookings.length === 0 && <div className="p-12 text-center text-gray-500 font-medium text-sm">لا يوجد حجوزات بعد.</div>}
            </div>
          </div>
        )}

        {/* Training Tab */}
        {activeTab === 'training' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">سجل التدريبات ({trainingSessions.length})</h2>
            </div>

            <form onSubmit={handleAddTraining} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-[200px]">
                <label htmlFor="training-field" className="block text-xs font-bold text-gray-500 uppercase mb-1">اختر الملعب</label>
                <select id="training-field" title="اختر الملعب" required value={newTraining.fieldId} onChange={e => setNewTraining({ ...newTraining, fieldId: e.target.value })} className="w-full border p-2.5 rounded-xl">
                  <option value="">اختار الملعب...</option>
                  {fields.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                </select>
              </div>
              <div className="flex-none">
                <label htmlFor="training-date" className="block text-xs font-bold text-gray-500 uppercase mb-1">التاريخ</label>
                <input id="training-date" title="التاريخ" required type="date" value={newTraining.date} onChange={e => setNewTraining({ ...newTraining, date: e.target.value })} className="w-full border p-2.5 rounded-xl" />
              </div>
              <div className="flex-none">
                <label htmlFor="training-time" className="block text-xs font-bold text-gray-500 uppercase mb-1">الوقت</label>
                <select id="training-time" title="الوقت" required value={newTraining.time} onChange={e => setNewTraining({ ...newTraining, time: e.target.value })} className="w-full border p-2.5 rounded-xl">
                  {['18:00', '19:00', '20:00', '21:00', '22:00', '23:00'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="flex-none min-w-[120px]">
                <label htmlFor="training-age" className="block text-xs font-bold text-gray-500 uppercase mb-1">مواليد (الدفعة)</label>
                <select id="training-age" title="مواليد" required value={newTraining.ageGroup} onChange={e => setNewTraining({ ...newTraining, ageGroup: e.target.value })} className="w-full border p-2.5 rounded-xl">
                  {Array.from({ length: 20 }, (_, i) => 2005 + i).map(year => <option key={year} value={year}>{year}</option>)}
                </select>
              </div>
              <div className="flex-none min-w-[150px]">
                <label htmlFor="training-coach" className="block text-xs font-bold text-gray-500 uppercase mb-1">المدرب</label>
                <select id="training-coach" title="المدرب" required value={newTraining.coachName} onChange={e => setNewTraining({ ...newTraining, coachName: e.target.value })} className="w-full border p-2.5 rounded-xl">
                  <option value="">اختر المدرب...</option>
                  {coaches.filter(c => String(c.fieldId) === String(newTraining.fieldId)).map(coach => (
                    <option key={coach.id} value={coach.name}>{coach.name}</option>
                  ))}
                  {/* Fallback if no coaches exist for this field */}
                  {coaches.filter(c => String(c.fieldId) === String(newTraining.fieldId)).length === 0 && newTraining.fieldId !== '' && (
                    <option value="مدرب عام">مدرب عام</option>
                  )}
                </select>
              </div>
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl font-bold transition-colors">
                إضافة تدريب
              </button>
            </form>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">الملعب</th>
                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">التاريخ والوقت</th>
                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">المدرب</th>
                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">مواليد</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {trainingSessions.map(session => {
                    const field = fields.find(f => String(f.id) === String(session.fieldId));
                    return (
                      <tr key={session.id}>
                        <td className="px-6 py-4 text-xs font-medium text-gray-400 dir-ltr text-right">{session.id}</td>
                        <td className="px-6 py-4 text-sm font-bold text-gray-900">{field?.name || 'غير معروف'}</td>
                        <td className="px-6 py-4 text-[13px] text-gray-500 dir-ltr text-right font-medium">{session.time} • {session.date}</td>
                        <td className="px-6 py-4 text-sm font-bold text-gray-700">{session.coachName || '-'}</td>
                        <td className="px-6 py-4 text-sm text-gray-500 dir-ltr text-right">{session.ageGroup || '-'}</td>
                        <td className="px-6 py-4 text-left">
                          <button onClick={() => removeTrainingSession(session.id)} className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-lg inline-flex" title="إلغاء التدريب">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {trainingSessions.length === 0 && <div className="p-8 text-center text-gray-500 font-medium">لا توجد تدريبات مضافة.</div>}
            </div>
          </div>
        )}

        {/* Coaches Tab */}
        {activeTab === 'coaches' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">إدارة المدربين ({coaches.length})</h2>
            </div>

            <form onSubmit={handleAddCoach} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-[200px]">
                <label htmlFor="coach-name" className="block text-xs font-bold text-gray-500 uppercase mb-1">اسم المدرب</label>
                <input id="coach-name" title="اسم المدرب" required value={newCoach.name} onChange={e => setNewCoach({ ...newCoach, name: e.target.value })} className="w-full border p-2.5 rounded-xl" placeholder="مثال: كابتن محمد" />
              </div>
              <div className="flex-1 min-w-[200px]">
                <label htmlFor="coach-field" className="block text-xs font-bold text-gray-500 uppercase mb-1">يتبع ملعب</label>
                <select id="coach-field" title="الملعب" required value={newCoach.fieldId} onChange={e => setNewCoach({ ...newCoach, fieldId: e.target.value })} className="w-full border p-2.5 rounded-xl">
                  <option value="">اختار الملعب...</option>
                  {fields.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                </select>
              </div>
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition-colors">
                إضافة مدرب
              </button>
            </form>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">اسم المدرب</th>
                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">الملعب</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {coaches.map(coach => {
                    const field = fields.find(f => String(f.id) === String(coach.fieldId));
                    return (
                      <tr key={coach.id}>
                        <td className="px-6 py-4 text-sm font-bold text-gray-900">{coach.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{field?.name || 'غير معروف'}</td>
                        <td className="px-6 py-4 text-left">
                          <button onClick={() => removeCoach(coach.id)} className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-lg inline-flex" title="مسح المدرب">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {coaches.length === 0 && <div className="p-8 text-center text-gray-500 font-medium">لا يوجد مدربين.</div>}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}

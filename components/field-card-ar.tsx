'use client';

import Link from 'next/link';
import { Field } from '@/lib/store';
import { MapPin } from 'lucide-react';

interface FieldCardProps {
  field: Field;
}

export default function FieldCard({ field }: FieldCardProps) {
  const { id, name, type, location, price, images, description } = field;
  const image = images[0];

  return (
    <Link href={`/field/${id}`} className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 flex flex-col h-full border border-gray-100 hover:border-[#4caf50]/30 group cursor-pointer block">

      <div className="relative h-52 overflow-hidden bg-gray-100">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="text-4xl text-gray-200 mb-2">⚽</div>
            </div>
          </div>
        )}

        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-xl text-xs font-bold text-gray-900 border border-gray-100 shadow-sm">
          {type}
        </div>
      </div>

      <div className="flex flex-col flex-grow p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{name}</h3>

        <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
          <MapPin className="w-4 h-4 text-[#4caf50]" />
          <span className="font-medium">{location}</span>
        </div>

        <p className="text-sm text-gray-500 line-clamp-2 mb-6 flex-grow">{description}</p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <div className="text-xs text-gray-400 font-bold uppercase mb-0.5">السعر/ساعة</div>
            <div className="font-black text-gray-900">{price} <span className="text-sm text-gray-500 font-bold">ج.م</span></div>
          </div>
          <div className="bg-[#eef8f0] text-[#388e3c] px-4 py-2 rounded-xl text-sm font-bold group-hover:bg-[#4caf50] group-hover:text-white transition-colors">
            التفاصيل
          </div>
        </div>
      </div>
    </Link>
  );
}

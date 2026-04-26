'use client';

import FieldCard from '@/components/field-card-ar';
import { Field } from '@/lib/store';

interface FieldsGridProps {
  fields: Field[];
}

export default function FieldsGrid({ fields }: FieldsGridProps) {
  return (
    <section className="py-20 px-4 bg-transparent">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-12">
          <h2 className="text-3xl font-black text-gray-900 mb-3">الملاعب المتاحة</h2>
          <p className="text-gray-500 font-medium text-[15px]">
            {fields.length === 0 
              ? 'لا توجد ملاعب تطابق معاييرك. حاول تغيير المرشحات.' 
              : `${fields.length} ملعب خماسي في العبور جاهز للحجز`}
          </p>
        </div>

        {fields.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[32px] border border-gray-100 mt-12 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
            <div className="text-6xl mb-4 opacity-50">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">لم نجد ملاعب</h3>
            <p className="text-gray-500">حاول تغيير المرشحات والبحث مرة أخرى</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8">
            {fields.map((field) => (
              <FieldCard
                key={field.id}
                field={field}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

'use client';

import { ChevronDown } from 'lucide-react';

interface FilterSectionProps {
  locations: string[];
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
}

export default function FilterSection({
  locations,
  selectedLocation,
  onLocationChange,
  priceRange,
  onPriceChange,
}: FilterSectionProps) {
  return (
    <section className="bg-white border-y border-gray-100 py-10 px-4 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
      <div className="container mx-auto max-w-7xl">
        <h3 className="text-xl font-black text-gray-900 mb-7">البحث والتصفية</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col">
            <label htmlFor="location-select" className="text-sm font-bold text-gray-600 mb-3">المدينة</label>
            <div className="relative">
              <select
                id="location-select"
                title="اختر المدينة"
                value={selectedLocation}
                onChange={(e) => onLocationChange(e.target.value)}
                className="w-full appearance-none bg-[#f4f7fb] px-4 py-3 pr-10 text-[15px] font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4caf50]/30 transition-all border-none rounded-2xl"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none text-gray-400" />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="price-input" className="text-sm font-bold text-gray-600 mb-3">الحد الأقصى للسعر</label>
            <input
              id="price-input"
              title="الحد الأقصى للسعر"
              type="number"
              min="0"
              max="2000"
              value={priceRange[1]}
              onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
              className="w-full bg-[#f4f7fb] border-none rounded-2xl px-4 py-3 text-[15px] font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4caf50]/30 transition-all dir-ltr text-right"
              placeholder="1000"
            />
          </div>
        </div>

        {(selectedLocation !== 'الكل' || priceRange[1] < 1000) && (
          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-2">
            {selectedLocation !== 'الكل' && (
              <span className="bg-[#eef8f0] text-[#388e3c] px-4 py-2 rounded-full text-sm font-bold border border-[#4caf50]/20">
                {selectedLocation}
              </span>
            )}
            {priceRange[1] < 1000 && (
              <span className="bg-[#eef8f0] text-[#388e3c] px-4 py-2 rounded-full text-sm font-bold border border-[#4caf50]/20">
                حتى {priceRange[1]} جنيه
              </span>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

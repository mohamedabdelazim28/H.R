'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/header';
import HeroAr from '@/components/hero-ar';
import FilterSectionAr from '@/components/filter-section-ar';
import FieldsGridAr from '@/components/fields-grid-ar';
import FooterAr from '@/components/footer-ar';
import { useAppStore } from '@/lib/store';

export default function Home() {
  const { fields } = useAppStore();
  const [selectedLocation, setSelectedLocation] = useState<string>('الكل');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const filteredFields = useMemo(() => {
    return fields.filter(field => {
      const locationMatch = selectedLocation === 'الكل' || field.location === selectedLocation;
      const priceMatch = field.price >= priceRange[0] && field.price <= priceRange[1];
      return locationMatch && priceMatch;
    });
  }, [selectedLocation, priceRange, fields]);

  const locations = ['الكل', 'مدينة العبور', 'الخانكة'];

  return (
    <main className="bg-[#f4f8fb] min-h-screen pb-12 font-sans" dir="rtl">
      <Header />
      <HeroAr />
      <FilterSectionAr 
        locations={locations}
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
        priceRange={priceRange}
        onPriceChange={setPriceRange}
      />
      <FieldsGridAr fields={filteredFields} />
      {/* <FooterAr /> */}
    </main>
  );
}


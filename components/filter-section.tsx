'use client'

import React from "react"

interface FilterSectionProps {
  locations: string[]
  selectedLocation: string
  onLocationChange: (loc: string) => void
  priceRange: [number, number]
  onPriceChange: (range: [number, number]) => void
}

export default function FilterSection({
  locations,
  selectedLocation,
  onLocationChange,
  priceRange,
  onPriceChange,
}: FilterSectionProps) {
  const handlePriceMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), priceRange[1])
    onPriceChange([value, priceRange[1]])
  }

  const handlePriceMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), priceRange[0])
    onPriceChange([priceRange[0], value])
  }

  return (
    <section className="bg-white border-b border-gray-200 py-8 shadow-sm relative z-10 -mt-8 mx-4 sm:mx-8 lg:mx-16 rounded-2xl p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
              Location
            </label>
            <div className="relative">
              <select
                value={selectedLocation}
                onChange={(e) => onLocationChange(e.target.value)}
                className="w-full pl-4 pr-10 py-3 appearance-none border-2 border-gray-100 rounded-xl bg-gray-50 text-gray-900 font-medium focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all cursor-pointer"
              >
                <option value="All">All Locations</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider flex justify-between">
              <span>Price Range</span>
              <span className="text-green-600 normal-case">{priceRange[0]} - {priceRange[1]} EGP</span>
            </label>
            <div className="space-y-4 pt-2">
              <div className="relative h-2 bg-gray-200 rounded-full">
                <div 
                  className="absolute h-full bg-green-500 rounded-full"
                  style={{ 
                    left: `${(priceRange[0] / 1000) * 100}%`, 
                    right: `${100 - (priceRange[1] / 1000) * 100}%` 
                  }}
                />
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="50"
                  value={priceRange[0]}
                  onChange={handlePriceMin}
                  className="absolute w-full h-2 appearance-none bg-transparent pointer-events-auto cursor-pointer"
                  style={{ zIndex: priceRange[0] > 1000 - 100 ? 5 : 3 }}
                />
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="50"
                  value={priceRange[1]}
                  onChange={handlePriceMax}
                  className="absolute w-full h-2 appearance-none bg-transparent pointer-events-auto cursor-pointer"
                  style={{ zIndex: 4 }}
                />
              </div>
              <div className="flex justify-between text-xs font-semibold text-gray-400">
                <span>0 EGP</span>
                <span>1000 EGP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

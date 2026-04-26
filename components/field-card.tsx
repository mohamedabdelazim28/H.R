import { MapPin, Trophy, Navigation } from 'lucide-react'
import Link from 'next/link'
import type { Field } from '@/lib/store'

interface FieldCardProps {
  field: Field
}

export default function FieldCard({ field }: FieldCardProps) {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <img
          src={field.images[0] || "/placeholder.svg"}
          alt={field.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-gray-900 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm flex items-center gap-1">
          <span className="text-green-600">{field.price}</span> EGP<span className="text-gray-500 font-medium text-xs">/H</span>
        </div>
        <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
          {field.type}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1 relative z-10 bg-white">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-green-600 transition-colors">
            {field.name}
          </h3>
        </div>

        <div className="flex items-center gap-2 text-gray-500 text-sm mb-4 font-medium">
          <MapPin className="w-4 h-4 text-green-500" />
          <span>{field.location}</span>
        </div>

        <p className="text-gray-500 text-sm line-clamp-2 mb-6 flex-1">
          {field.description}
        </p>

        <div className="mt-auto">
          <Link
            href={`/field/${field.id}`}
            className="group/btn relative flex items-center justify-center gap-2 w-full bg-green-50 text-green-600 font-bold py-3.5 rounded-xl transition-all duration-300 hover:bg-green-500 hover:text-white overflow-hidden"
          >
            <span>View Field</span>
            <Navigation className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}


import FieldCard from './field-card'
import type { Field } from '@/lib/store'

interface FieldsGridProps {
  fields: Field[]
}

export default function FieldsGrid({ fields }: FieldsGridProps) {
  return (
    <section className="flex-1 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-4 border-b border-gray-200 pb-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Available <span className="text-green-600">Fields</span>
            </h2>
            <p className="text-gray-500 mt-2 font-medium">
              Showing {fields.length} {fields.length === 1 ? 'field' : 'fields'} matching your criteria
            </p>
          </div>
        </div>

        {fields.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fields.map((field) => (
              <FieldCard key={field.id} field={field} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <div className="text-6xl mb-6">🏜️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No fields found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Try adjusting your filters to see more available fields.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-green-50 to-white pt-24 pb-32 overflow-hidden relative">
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-green-500/10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-5xl sm:text-7xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
          Book Your Next <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">
            Football Match
          </span>
        </h2>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium mb-10">
          Find the perfect pitch in Obour City and El Khanka. High-quality fields, instant booking, and zero hassle.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="bg-white/80 backdrop-blur border border-gray-100 rounded-2xl px-6 py-3 text-sm font-bold text-gray-700 shadow-sm flex items-center gap-2">
            <span className="text-green-500 text-lg">✓</span> Instant Confirmation
          </div>
          <div className="bg-white/80 backdrop-blur border border-gray-100 rounded-2xl px-6 py-3 text-sm font-bold text-gray-700 shadow-sm flex items-center gap-2">
            <span className="text-green-500 text-lg">✓</span> No Booking Fees
          </div>
          <div className="bg-white/80 backdrop-blur border border-gray-100 rounded-2xl px-6 py-3 text-sm font-bold text-gray-700 shadow-sm flex items-center gap-2">
            <span className="text-green-500 text-lg">✓</span> Premium Pitches
          </div>
        </div>
      </div>
    </section>
  )
}


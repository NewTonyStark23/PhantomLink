export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-indigo-950/40 to-gray-950" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-2 mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm text-indigo-300">No Hotspot Required</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-white via-indigo-200 to-cyan-200 bg-clip-text text-transparent">
            PhoneNet Bridge
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 mb-4 max-w-3xl mx-auto">
          Share your phone's mobile data with other devices
          <span className="text-red-400 font-semibold"> without</span> the burning-hot WiFi hotspot
        </p>
        
        <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
          Your phone can game all day on mobile data just fine. The problem is the WiFi 
          <strong className="text-orange-400"> access point</strong> broadcasting. 
          Let's bypass it entirely.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a href="#methods" className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-semibold transition-all hover:scale-105 shadow-lg shadow-indigo-500/25">
            Explore Methods →
          </a>
          <a href="#problem" className="px-8 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg font-semibold transition-all hover:scale-105">
            Why Hotspot Burns 🔥
          </a>
        </div>

        {/* Phone illustration */}
        <div className="mt-16 flex items-center justify-center gap-8">
          <div className="relative">
            <div className="w-16 h-28 bg-gray-800 rounded-xl border-2 border-gray-600 flex items-center justify-center shadow-lg">
              <span className="text-2xl">📱</span>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full" />
            <p className="text-xs text-red-400 mt-2 text-center">Hotspot 🔥</p>
          </div>
          
          <div className="text-4xl">→</div>
          
          <div className="relative">
            <div className="w-16 h-28 bg-gray-800 rounded-xl border-2 border-green-500/50 flex items-center justify-center shadow-lg shadow-green-500/20">
              <span className="text-2xl">📱</span>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full" />
            <p className="text-xs text-green-400 mt-2 text-center">Bridge ✅</p>
          </div>
        </div>
      </div>
    </section>
  )
}

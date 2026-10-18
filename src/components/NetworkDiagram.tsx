export default function NetworkDiagram() {
  return (
    <section className="py-16 px-6 bg-gray-900/50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
        <p className="text-gray-400 text-center mb-12">The data flow without WiFi hotspot</p>

        {/* Diagram */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 overflow-x-auto">
          <div className="min-w-[700px] flex items-center justify-between gap-4">
            {/* Cell Tower */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-gradient-to-b from-purple-600 to-purple-800 rounded-xl flex items-center justify-center text-3xl shadow-lg shadow-purple-500/20">
                📡
              </div>
              <p className="text-sm text-gray-400 mt-2">Cell Tower</p>
              <p className="text-xs text-purple-400">4G/5G</p>
            </div>

            {/* Arrow 1 */}
            <div className="flex-1 flex items-center">
              <div className="w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded animate-pulse opacity-50" />
              </div>
              <span className="text-xs text-gray-500 absolute ml-2">radio waves</span>
            </div>

            {/* Phone */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gradient-to-b from-indigo-600 to-indigo-800 rounded-2xl flex items-center justify-center text-4xl shadow-lg shadow-indigo-500/20 border-2 border-indigo-400/30">
                📱
              </div>
              <p className="text-sm text-white font-semibold mt-2">Your Phone</p>
              <p className="text-xs text-green-400">Data Bridge 🌉</p>
              <div className="mt-2 px-2 py-1 bg-green-500/10 border border-green-500/30 rounded text-xs text-green-400">
                No WiFi AP!
              </div>
            </div>

            {/* Arrow 2 - USB */}
            <div className="flex-1 flex flex-col items-center">
              <div className="w-full h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded animate-pulse opacity-50" />
              </div>
              <div className="flex gap-2 mt-2">
                <span className="text-xs px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/30 rounded text-cyan-400">USB</span>
                <span className="text-xs px-2 py-0.5 bg-blue-500/10 border border-blue-500/30 rounded text-blue-400">BT</span>
              </div>
            </div>

            {/* PC */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-gradient-to-b from-cyan-600 to-cyan-800 rounded-xl flex items-center justify-center text-3xl shadow-lg shadow-cyan-500/20">
                💻
              </div>
              <p className="text-sm text-gray-400 mt-2">Your PC</p>
              <p className="text-xs text-cyan-400">Gets Internet</p>
            </div>
          </div>

          {/* Additional devices */}
          <div className="mt-8 pt-8 border-t border-gray-800">
            <p className="text-center text-sm text-gray-500 mb-6">Multiple devices can connect simultaneously</p>
            <div className="flex justify-center gap-12">
              <div className="flex flex-col items-center">
                <span className="text-2xl">🖥️</span>
                <span className="text-xs text-gray-500 mt-1">Desktop</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl">🎮</span>
                <span className="text-xs text-gray-500 mt-1">Console</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl">📺</span>
                <span className="text-xs text-gray-500 mt-1">Smart TV</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl">🎧</span>
                <span className="text-xs text-gray-500 mt-1">Tablet</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

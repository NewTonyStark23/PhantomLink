export default function ComparisonTable() {
  return (
    <section className="py-20 px-6 bg-gray-900/50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Quick Comparison
        </h2>
        <p className="text-gray-400 text-center mb-12">
          Find the best method for your situation
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-4 px-4 text-gray-400 font-medium">Method</th>
                <th className="text-center py-4 px-4 text-gray-400 font-medium">Heat</th>
                <th className="text-center py-4 px-4 text-gray-400 font-medium">Speed</th>
                <th className="text-center py-4 px-4 text-gray-400 font-medium">Devices</th>
                <th className="text-center py-4 px-4 text-gray-400 font-medium">Setup</th>
                <th className="text-center py-4 px-4 text-gray-400 font-medium">WiFi Off?</th>
                <th className="text-center py-4 px-4 text-gray-400 font-medium">Gaming OK?</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800/50 hover:bg-gray-800/30">
                <td className="py-4 px-4 font-medium text-white">🔌 USB Tethering</td>
                <td className="text-center py-4 px-4"><span className="text-green-400">🟢 Low</span></td>
                <td className="text-center py-4 px-4"><span className="text-green-400">⚡⚡⚡</span></td>
                <td className="text-center py-4 px-4">1</td>
                <td className="text-center py-4 px-4"><span className="text-green-400">Easy</span></td>
                <td className="text-center py-4 px-4">✅</td>
                <td className="text-center py-4 px-4">✅</td>
              </tr>
              <tr className="border-b border-gray-800/50 hover:bg-gray-800/30 bg-indigo-500/5">
                <td className="py-4 px-4 font-medium text-indigo-300">🔄 Reverse Tether (Gnirehtet)</td>
                <td className="text-center py-4 px-4"><span className="text-green-400">🟢 Very Low</span></td>
                <td className="text-center py-4 px-4"><span className="text-green-400">⚡⚡⚡</span></td>
                <td className="text-center py-4 px-4">1</td>
                <td className="text-center py-4 px-4"><span className="text-yellow-400">Medium</span></td>
                <td className="text-center py-4 px-4">✅</td>
                <td className="text-center py-4 px-4">✅</td>
              </tr>
              <tr className="border-b border-gray-800/50 hover:bg-gray-800/30">
                <td className="py-4 px-4 font-medium text-white">📶 Bluetooth Tether</td>
                <td className="text-center py-4 px-4"><span className="text-green-400">🟢 Minimal</span></td>
                <td className="text-center py-4 px-4"><span className="text-red-400">⚡</span></td>
                <td className="text-center py-4 px-4">1</td>
                <td className="text-center py-4 px-4"><span className="text-green-400">Easy</span></td>
                <td className="text-center py-4 px-4">✅</td>
                <td className="text-center py-4 px-4">❌</td>
              </tr>
              <tr className="border-b border-gray-800/50 hover:bg-gray-800/30">
                <td className="py-4 px-4 font-medium text-white">🖥️ Proxy Server</td>
                <td className="text-center py-4 px-4"><span className="text-green-400">🟢 Low</span></td>
                <td className="text-center py-4 px-4"><span className="text-green-400">⚡⚡⚡</span></td>
                <td className="text-center py-4 px-4"><span className="text-green-400">Many</span></td>
                <td className="text-center py-4 px-4"><span className="text-red-400">Hard</span></td>
                <td className="text-center py-4 px-4">✅</td>
                <td className="text-center py-4 px-4">✅</td>
              </tr>
              <tr className="hover:bg-gray-800/30">
                <td className="py-4 px-4 font-medium text-white">📶 WiFi Client Bridge</td>
                <td className="text-center py-4 px-4"><span className="text-yellow-400">🟡 Low-Med</span></td>
                <td className="text-center py-4 px-4"><span className="text-green-400">⚡⚡</span></td>
                <td className="text-center py-4 px-4">1-2</td>
                <td className="text-center py-4 px-4"><span className="text-yellow-400">Medium</span></td>
                <td className="text-center py-4 px-4">⚠️ Partial</td>
                <td className="text-center py-4 px-4">⚠️ Maybe</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Recommendation */}
        <div className="mt-10 bg-gradient-to-r from-indigo-950/50 to-purple-950/50 border border-indigo-500/20 rounded-2xl p-8">
          <div className="flex items-start gap-4">
            <span className="text-4xl">🏆</span>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Our Recommendation For Your Situation</h3>
              <p className="text-gray-300 mb-4">
                Based on your description (router down, phone works fine for gaming, need PC internet, can't use hotspot):
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-indigo-400 font-bold">1st:</span>
                  <div>
                    <p className="font-semibold text-white">USB Tethering</p>
                    <p className="text-sm text-gray-400">Try this first — it's built into Android, takes 10 seconds, and you can still game on the phone!</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-indigo-400 font-bold">2nd:</span>
                  <div>
                    <p className="font-semibold text-white">Gnirehtet (Reverse Tethering)</p>
                    <p className="text-sm text-gray-400">If USB tethering is blocked by your carrier, this bypasses it entirely. It's exactly the "server extension" concept you described.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-indigo-400 font-bold">3rd:</span>
                  <div>
                    <p className="font-semibold text-white">Proxy Server via Termux</p>
                    <p className="text-sm text-gray-400">For multiple devices — run a SOCKS proxy on the phone and forward ports to each device via ADB.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

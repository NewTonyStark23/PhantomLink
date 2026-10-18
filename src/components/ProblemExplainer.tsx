export default function ProblemExplainer() {
  return (
    <section id="problem" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Why Does Hotspot <span className="text-red-400">Burn</span> Your Phone?
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Understanding the problem helps us find the right solution
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Hot Problem */}
          <div className="bg-gradient-to-br from-red-950/30 to-gray-900 border border-red-500/20 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🔥</span>
              <h3 className="text-xl font-bold text-red-400">WiFi Hotspot Mode</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <div>
                  <p className="font-semibold text-gray-200">WiFi AP Broadcasting</p>
                  <p className="text-sm text-gray-400">Creates a full access point, broadcasting SSID, managing associations, handling encryption</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <div>
                  <p className="font-semibold text-gray-200">Dual Radio Usage</p>
                  <p className="text-sm text-gray-400">Phone uses WiFi radio for AP + cellular modem for data simultaneously</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <div>
                  <p className="font-semibold text-gray-200">NAT + DHCP Server</p>
                  <p className="text-sm text-gray-400">Running network address translation and DHCP adds CPU overhead</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <div>
                  <p className="font-semibold text-gray-200">Continuous Broadcast</p>
                  <p className="text-sm text-gray-400">Even idle, the AP keeps beaconing every ~100ms</p>
                </div>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-red-500/10 rounded-lg border border-red-500/20">
              <p className="text-sm text-red-300">
                <strong>Result:</strong> Phone gets hot, battery drains fast, may throttle performance
              </p>
            </div>
          </div>

          {/* Cool Solution */}
          <div className="bg-gradient-to-br from-green-950/30 to-gray-900 border border-green-500/20 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">❄️</span>
              <h3 className="text-xl font-bold text-green-400">Bridge Mode (Our Goal)</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <div>
                  <p className="font-semibold text-gray-200">No WiFi AP</p>
                  <p className="text-sm text-gray-400">WiFi radio stays off or in client mode — no broadcasting overhead</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <div>
                  <p className="font-semibold text-gray-200">Wired/Bluetooth Path</p>
                  <p className="text-sm text-gray-400">USB or Bluetooth carries data — much less power than WiFi AP</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <div>
                  <p className="font-semibold text-gray-200">Direct Data Passthrough</p>
                  <p className="text-sm text-gray-400">Minimal processing — just forwarding packets, not managing a network</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <div>
                  <p className="font-semibold text-gray-200">Phone Stays Cool</p>
                  <p className="text-sm text-gray-400">Same thermal profile as regular gaming — just forwarding data</p>
                </div>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
              <p className="text-sm text-green-300">
                <strong>Result:</strong> Phone stays warm (like gaming), other devices get internet
              </p>
            </div>
          </div>
        </div>

        {/* Key insight */}
        <div className="mt-12 bg-indigo-950/30 border border-indigo-500/20 rounded-2xl p-8 text-center">
          <span className="text-4xl mb-4 block">💡</span>
          <h3 className="text-xl font-bold text-indigo-300 mb-3">The Key Insight</h3>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Your phone's <strong className="text-white">cellular modem</strong> handles internet just fine (gaming proves it). 
            The heat comes from the <strong className="text-red-400">WiFi access point radio</strong> that hotspot mode activates. 
            If we can get data to other devices <em>without</em> creating a WiFi AP, we solve the heat problem entirely.
          </p>
        </div>
      </div>
    </section>
  )
}

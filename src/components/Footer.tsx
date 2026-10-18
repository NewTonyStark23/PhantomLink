export default function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-gray-800">
      <div className="max-w-5xl mx-auto">
        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h4 className="font-bold text-white mb-2">Can I game on my phone while sharing data?</h4>
              <p className="text-sm text-gray-400">
                Yes! With USB tethering or Gnirehtet, the phone's mobile data is shared but the phone 
                itself continues to use it normally. You can game, stream, whatever — the PC just "piggybacks" 
                on the same data connection.
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h4 className="font-bold text-white mb-2">Will my carrier block this?</h4>
              <p className="text-sm text-gray-400">
                USB tethering is almost never blocked (it's a standard Android feature). Gnirehtet uses VPN 
                which is also typically not blocked. Some carriers throttle after a data cap, but that affects 
                the phone too regardless of method.
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h4 className="font-bold text-white mb-2">Can multiple devices connect at once?</h4>
              <p className="text-sm text-gray-400">
                USB tethering is one device. For multiple: use the Proxy Server method (different ports per device) 
                or combine USB tethering for one device + Bluetooth tethering for another.
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h4 className="font-bold text-white mb-2">What about iPhone?</h4>
              <p className="text-sm text-gray-400">
                iPhones support USB tethering natively (Settings → Personal Hotspot → USB only). 
                It works similarly — just make sure to select USB and not WiFi. 
                For reverse tethering, you'd need a different approach (ApplePi or similar tools).
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h4 className="font-bold text-white mb-2">Is this legal?</h4>
              <p className="text-sm text-gray-400">
                Yes, USB tethering is a built-in phone feature. Gnirehtet is open-source software. 
                Using your own data plan however you want (within your plan's terms) is perfectly fine. 
                These are all standard networking techniques.
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h4 className="font-bold text-white mb-2">Why not just buy a mobile router?</h4>
              <p className="text-sm text-gray-400">
                Mobile routers (MiFi) also use WiFi hotspot and can overheat! Plus they need a separate SIM/data plan. 
                These methods use your existing phone and plan — zero extra cost, and often cooler since 
                USB/BT generates less heat than WiFi AP.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Start */}
        <div className="bg-gradient-to-r from-indigo-950/50 to-purple-950/50 border border-indigo-500/20 rounded-2xl p-8 text-center mb-12">
          <h3 className="text-2xl font-bold text-white mb-4">🚀 Quick Start (30 seconds)</h3>
          <div className="max-w-lg mx-auto">
            <ol className="text-left space-y-3 text-gray-300">
              <li className="flex items-center gap-3">
                <span className="w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0">1</span>
                <span>Plug your phone into PC via USB cable</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0">2</span>
                <span>Phone: Settings → Network → Hotspot & Tethering → <strong className="text-white">USB Tethering ON</strong></span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0">3</span>
                <span>Done! PC has internet. Phone stays cool. Go game! 🎮</span>
              </li>
            </ol>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="text-center text-gray-500 text-sm">
          <p className="mb-2">
            PhoneNet Bridge — Share mobile data without the burning hotspot 🔥→❄️
          </p>
          <p className="text-xs text-gray-600">
            Built with the idea that your phone's data should be shareable without turning it into a space heater.
          </p>
        </div>
      </div>
    </footer>
  )
}

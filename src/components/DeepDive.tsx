interface DeepDiveProps {
  method: string
  onClose: () => void
}

const methodDetails: Record<string, {
  title: string
  icon: string
  howItWorks: string
  steps: string[]
  requirements: string[]
  pros: string[]
  cons: string[]
  tips: string[]
  command?: string
}> = {
  'usb-tether': {
    title: 'USB Tethering',
    icon: '🔌',
    howItWorks: 'Android has a built-in USB tethering option that shares mobile data over USB. Your PC sees the phone as a wired Ethernet adapter. No WiFi radio is activated — the data travels over the USB cable directly.',
    steps: [
      'Connect your phone to PC via USB cable',
      'On phone: Settings → Network & Internet → Hotspot & Tethering',
      'Enable "USB tethering" (not WiFi hotspot!)',
      'Your PC will detect a new network adapter (RNDIS/Ethernet)',
      'Internet should work immediately — no driver needed on most OS',
      'If on Linux, it may appear as usb0 interface automatically'
    ],
    requirements: ['USB cable (data-capable, not charge-only)', 'Android phone', 'USB debugging NOT required'],
    pros: ['Zero WiFi heat', 'Fast speeds (full mobile bandwidth)', 'Stable connection', 'No extra software needed', 'Phone charges while tethering'],
    cons: ['Only one device at a time', 'Tied to USB cable', 'Some carriers block it (rare)'],
    tips: [
      'Use a good quality USB 3.0 cable for best speeds',
      'If it doesn\'t work, try a different USB port',
      'On Windows, you may need to install RNDIS driver (usually auto-installed)',
      'This is different from WiFi hotspot — it uses USB only'
    ]
  },
  'reverse-tether': {
    title: 'Reverse Tethering (Gnirehtet)',
    icon: '🔄',
    howItWorks: 'Gnirehtet creates a VPN on your phone that captures all traffic from your PC (sent via ADB over USB) and forwards it through the phone\'s mobile data connection. The phone never activates WiFi AP — it\'s pure USB data forwarding. This is essentially the "server extension" concept you described!',
    steps: [
      'Install ADB on your PC (Android Debug Bridge)',
      'Enable USB Debugging on phone: Settings → Developer Options → USB Debugging',
      'Download Gnirehtet from GitHub (rom1v/gnirehtet)',
      'Connect phone via USB, authorize the ADB connection',
      'Run: ./gnirehtet run (or gnirehtet.exe run on Windows)',
      'Gnirehtet installs a VPN profile on the phone automatically',
      'Your PC\'s traffic now flows through the phone\'s mobile data!',
      'To stop: Ctrl+C or run ./gnirehtet stop'
    ],
    requirements: ['ADB installed on PC', 'USB Debugging enabled on phone', 'USB cable', 'Gnirehtet downloaded'],
    pros: ['Exactly what you described — "server extension"', 'Zero WiFi heat', 'Phone stays cool as if gaming', 'Open source and free', 'Works on Windows/Mac/Linux', 'No root required'],
    cons: ['Requires ADB setup (one-time)', 'One device at a time', 'Needs PC to run the gnirehtet command'],
    tips: [
      'This is the closest to your "proxy server" idea!',
      'The phone thinks it\'s just running a VPN app — very lightweight',
      'You can game on the phone while PC uses internet through it',
      'Great for router-down scenarios exactly like yours',
      'Alternative: "reverse tethering" via Android 11+ built-in feature (Settings → Connected devices → USB → USB tethering reversed)'
    ],
    command: '# Install and run Gnirehtet\ngit clone https://github.com/Genymobile/gnirehtet\ncd gnirehtet\n./gnirehtet run\n\n# Your PC now uses phone\'s mobile data!'
  },
  'bt-tether': {
    title: 'Bluetooth Tethering',
    icon: '📶',
    howItWorks: 'Uses the Bluetooth PAN (Personal Area Network) profile to create a network connection between phone and PC over Bluetooth. Much slower than USB but uses almost zero extra power. The WiFi radio stays completely off.',
    steps: [
      'Pair your phone and PC via Bluetooth',
      'On phone: Settings → Network & Internet → Hotspot & Tethering',
      'Enable "Bluetooth tethering"',
      'On PC: Go to Bluetooth settings → your phone → "Connect using" → "Access point"',
      'On Windows: Network Connections → right-click Bluetooth adapter → Connect',
      'Internet should now flow over Bluetooth PAN'
    ],
    requirements: ['Bluetooth on both devices', 'Paired devices', 'Android phone with BT tethering option'],
    pros: ['Wireless (no cable)', 'Extremely low heat', 'Very low power usage', 'Built into Android'],
    cons: ['Very slow (~1-2 Mbps max)', 'Higher latency', 'Not suitable for gaming/streaming', 'Range limited'],
    tips: [
      'Good for messaging, email, light browsing only',
      'Bluetooth 5.0+ is faster than older versions',
      'Combine with USB for speed + BT for a second device',
      'Perfect backup when you just need basic connectivity'
    ]
  },
  'proxy-server': {
    title: 'Proxy Server Method',
    icon: '🖥️',
    howItWorks: 'Run a SOCKS5 or HTTP proxy server directly on your phone. Other devices connect to this proxy via USB (using ADB port forwarding) or Bluetooth. The phone acts as a "server extension" — exactly your concept! Traffic goes: Device → USB/BT → Phone\'s proxy → Mobile data → Internet.',
    steps: [
      'Install a proxy app on phone (e.g., "ProxyDroid" or use Termux)',
      'For Termux method: pkg install tinyproxy (or use dante/3proxy)',
      'Configure proxy to listen on localhost:port (e.g., 127.0.0.1:8080)',
      'Connect phone to PC via USB',
      'Use ADB to forward the port: adb forward tcp:8080 tcp:8080',
      'Configure PC\'s browser/system to use proxy 127.0.0.1:8080',
      'All PC traffic now routes through phone\'s proxy → mobile data',
      'For multiple devices: forward different ports for each device'
    ],
    requirements: ['Termux or proxy app on phone', 'ADB installed', 'USB cable', 'Basic command line knowledge'],
    pros: ['Multiple devices via different ports', 'Flexible — HTTP or SOCKS5', 'Very low heat', 'Your exact "server extension" concept', 'Can filter/log traffic', 'Works with any device that supports proxy settings'],
    cons: ['Complex setup', 'Requires command line', 'App-level proxy (not system-wide without extra config)', 'Each device needs proxy configuration'],
    tips: [
      'This IS the "server" concept you described!',
      'Use SOCKS5 for full TCP support (not just HTTP)',
      'Termux command: pkg install tinyproxy && tinyproxy -c /path/to/config',
      'For system-wide on PC: use Proxifier (Windows) or proxychains (Linux)',
      'You can run this alongside gaming on the phone!',
      'Alternative: Use "pdnsd" or "dns66" for DNS-level proxy'
    ],
    command: '# Using Termux on phone:\npkg update && pkg install tinyproxy\n\n# Configure tinyproxy (tinyproxy.conf):\n# Listen 127.0.0.1\n# Port 8080\n\ntinyproxy -d  # Run in debug mode\n\n# On PC, forward the port:\nadb forward tcp:8080 tcp:8080\n\n# Set PC proxy to 127.0.0.1:8080'
  },
  'wifi-client': {
    title: 'WiFi Client Bridge Mode',
    icon: '📶',
    howItWorks: 'Some Android phones support WiFi Client mode (WiFi Direct or WiFi Sharing) where the phone connects to a WiFi network as a client AND shares its mobile data simultaneously over USB. This creates a bridge without broadcasting a hotspot.',
    steps: [
      'This requires a phone that supports WiFi sharing (Samsung, some Pixel)',
      'Connect phone to PC via USB',
      'Enable USB tethering in settings',
      'Enable "WiFi sharing" or "WiFi + mobile data" bridge if available',
      'Phone acts as a bridge between WiFi client and USB output',
      'Useful when you have a travel router broadcasting WiFi that phone connects to'
    ],
    requirements: ['Phone with WiFi sharing support', 'USB cable', 'Optional: travel router'],
    pros: ['Can bridge WiFi and mobile data', 'Useful for extending range', 'No hotspot broadcasting'],
    cons: ['Limited phone support', 'Complex to set up', 'Not all phones support it'],
    tips: [
      'Check if your phone supports "WiFi sharing" in developer options',
      'Samsung phones often support this via "WiFi Sharing" toggle',
      'Combined with a travel router, you can create a mesh-like setup',
      'This is more niche — try USB tethering or Gnirehtet first'
    ]
  }
}

export default function DeepDive({ method, onClose }: DeepDiveProps) {
  const details = methodDetails[method]
  if (!details) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/80 backdrop-blur-sm p-4 pt-8 pb-8" onClick={onClose}>
      <div className="bg-gray-900 border border-gray-700 rounded-2xl max-w-3xl w-full p-8 relative" onClick={e => e.stopPropagation()}>
        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors">
          ✕
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-5xl">{details.icon}</span>
          <div>
            <h3 className="text-2xl font-bold text-white">{details.title}</h3>
            <p className="text-gray-400">Detailed Guide</p>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-xl p-5 mb-6">
          <h4 className="font-semibold text-indigo-300 mb-2">How It Works</h4>
          <p className="text-gray-300 text-sm leading-relaxed">{details.howItWorks}</p>
        </div>

        {/* Steps */}
        <div className="mb-6">
          <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center text-xs text-green-400">✓</span>
            Step-by-Step
          </h4>
          <ol className="space-y-2">
            {details.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="flex-shrink-0 w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center text-xs text-gray-400 font-mono">
                  {i + 1}
                </span>
                <span className="text-gray-300 pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Command block */}
        {details.command && (
          <div className="mb-6">
            <h4 className="font-semibold text-white mb-3">💻 Commands</h4>
            <pre className="bg-gray-950 border border-gray-800 rounded-xl p-4 text-sm text-green-400 overflow-x-auto font-mono">
              {details.command}
            </pre>
          </div>
        )}

        {/* Requirements */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <h4 className="font-semibold text-white mb-2 text-sm">Requirements</h4>
            <ul className="space-y-1">
              {details.requirements.map((req, i) => (
                <li key={i} className="text-sm text-gray-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2 text-sm">💡 Pro Tips</h4>
            <ul className="space-y-1">
              {details.tips.map((tip, i) => (
                <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-1.5 flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pros & Cons */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-950/20 border border-green-500/20 rounded-xl p-4">
            <h4 className="font-semibold text-green-400 mb-2 text-sm">✅ Pros</h4>
            <ul className="space-y-1">
              {details.pros.map((pro, i) => (
                <li key={i} className="text-sm text-gray-300">{pro}</li>
              ))}
            </ul>
          </div>
          <div className="bg-red-950/20 border border-red-500/20 rounded-xl p-4">
            <h4 className="font-semibold text-red-400 mb-2 text-sm">⚠️ Cons</h4>
            <ul className="space-y-1">
              {details.cons.map((con, i) => (
                <li key={i} className="text-sm text-gray-300">{con}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

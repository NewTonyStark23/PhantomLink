interface MethodCardsProps {
  activeMethod: string | null
  setActiveMethod: (method: string | null) => void
}

interface Method {
  id: string
  icon: string
  title: string
  subtitle: string
  difficulty: string
  difficultyBg: string
  difficultyText: string
  heat: string
  heatBg: string
  heatText: string
  description: string
  tags: string[]
  bestFor: string
}

const methods: Method[] = [
  {
    id: 'usb-tether',
    icon: '🔌',
    title: 'USB Tethering',
    subtitle: 'Built-in Android feature',
    difficulty: 'Easy',
    difficultyBg: 'bg-green-500/10',
    difficultyText: 'text-green-400',
    heat: 'Low',
    heatBg: 'bg-green-500/10',
    heatText: 'text-green-400',
    description: 'Uses Android\'s built-in USB tethering. No WiFi AP, just a direct wired connection. Your PC sees it as an Ethernet adapter.',
    tags: ['No WiFi needed', 'Built-in', 'Fast', 'Stable'],
    bestFor: 'Single PC, quick setup'
  },
  {
    id: 'reverse-tether',
    icon: '🔄',
    title: 'Reverse Tethering',
    subtitle: 'Gnirehtet (ADB-based)',
    difficulty: 'Medium',
    difficultyBg: 'bg-yellow-500/10',
    difficultyText: 'text-yellow-400',
    heat: 'Very Low',
    heatBg: 'bg-green-500/10',
    heatText: 'text-green-400',
    description: 'Routes your PC\'s internet through the phone via USB + ADB. The phone acts as a network gateway without any hotspot. Exactly what you described!',
    tags: ['No hotspot', 'ADB', 'Open source', 'Lightweight'],
    bestFor: 'Your exact use case — PC internet via phone data'
  },
  {
    id: 'bt-tether',
    icon: '📶',
    title: 'Bluetooth Tethering',
    subtitle: 'Bluetooth PAN profile',
    difficulty: 'Easy',
    difficultyBg: 'bg-green-500/10',
    difficultyText: 'text-green-400',
    heat: 'Very Low',
    heatBg: 'bg-green-500/10',
    heatText: 'text-green-400',
    description: 'Uses Bluetooth Personal Area Network (PAN) profile. Much slower than USB but zero WiFi heat. Good for light browsing.',
    tags: ['Wireless', 'Low power', 'Built-in', 'Slow'],
    bestFor: 'Light browsing, messaging, when USB isn\'t available'
  },
  {
    id: 'proxy-server',
    icon: '🖥️',
    title: 'Proxy Server Method',
    subtitle: 'SOCKS/HTTP proxy on phone',
    difficulty: 'Hard',
    difficultyBg: 'bg-red-500/10',
    difficultyText: 'text-red-400',
    heat: 'Low',
    heatBg: 'bg-green-500/10',
    heatText: 'text-green-400',
    description: 'Run a proxy server on your phone. Other devices connect to it via USB/Bluetooth. This is the "server extension" concept you described!',
    tags: ['Flexible', 'Multi-device', 'Advanced', 'Custom'],
    bestFor: 'Multiple devices, advanced users, your "server" idea'
  },
  {
    id: 'wifi-client',
    icon: '📶',
    title: 'WiFi Client Bridge',
    subtitle: 'Phone as WiFi client + USB out',
    difficulty: 'Medium',
    difficultyBg: 'bg-yellow-500/10',
    difficultyText: 'text-yellow-400',
    heat: 'Low',
    heatBg: 'bg-green-500/10',
    heatText: 'text-green-400',
    description: 'Phone connects to another WiFi source as a client, then shares via USB. Useful if you have a secondary router or travel router.',
    tags: ['WiFi client mode', 'USB out', 'Repeat mode', 'Needs router'],
    bestFor: 'Extending existing WiFi, travel setups'
  }
]

export default function MethodCards({ setActiveMethod }: MethodCardsProps) {
  return (
    <section id="methods" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          5 Methods to Share Data <span className="text-green-400">Without Hotspot</span>
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Click any method to see a detailed step-by-step guide
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {methods.map((method) => (
            <button
              key={method.id}
              onClick={() => setActiveMethod(method.id)}
              className="text-left bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-indigo-500/50 hover:bg-gray-900/80 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/10 group"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl">{method.icon}</span>
                <div className="flex gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${method.heatBg} ${method.heatText} border border-white/5`}>
                    🌡️ {method.heat}
                  </span>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors mb-1">
                {method.title}
              </h3>
              <p className="text-sm text-gray-500 mb-3">{method.subtitle}</p>
              <p className="text-sm text-gray-400 mb-4 line-clamp-2">{method.description}</p>
              
              <div className="flex flex-wrap gap-1.5 mb-4">
                {method.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-0.5 bg-gray-800 text-gray-400 rounded">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                <span className="text-xs text-gray-500">Best for: <span className="text-gray-300">{method.bestFor}</span></span>
                <span className={`text-xs px-2 py-0.5 rounded ${method.difficultyBg} ${method.difficultyText}`}>
                  {method.difficulty}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

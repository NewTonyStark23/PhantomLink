import { useState } from 'react'
import { useApp } from '../context/AppContext'
import {
  Usb,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Cable,
  Bluetooth,
  Server,
  Loader2,
  Shield,
  Zap,
  Monitor
} from 'lucide-react'

const steps = [
  {
    id: 'welcome',
    title: 'Welcome to PhoneNet Bridge',
    subtitle: 'Turn your phone into an internet antenna — no hotspot, no overheating'
  },
  {
    id: 'method',
    title: 'Choose Your Bridge Method',
    subtitle: 'How should your PC connect to your phone\'s data?'
  },
  {
    id: 'connect',
    title: 'Connect Your Phone',
    subtitle: 'Follow the steps to establish the bridge'
  },
  {
    id: 'verify',
    title: 'Verify Connection',
    subtitle: 'Testing the bridge and confirming internet access'
  },
  {
    id: 'complete',
    title: 'You\'re All Set!',
    subtitle: 'Your phone is now your internet antenna'
  }
]

export default function SetupWizard() {
  const { dispatch } = useApp()
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedMethod, setSelectedMethod] = useState<'usb' | 'bluetooth' | 'proxy' | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionChecks, setConnectionChecks] = useState({
    device: false,
    bridge: false,
    internet: false,
    speed: false
  })

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleConnect = () => {
    setIsConnecting(true)
    dispatch({ type: 'SET_BRIDGE_MODE', payload: selectedMethod })
    dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'connecting' })

    // Simulate connection sequence
    setTimeout(() => setConnectionChecks(prev => ({ ...prev, device: true })), 800)
    setTimeout(() => setConnectionChecks(prev => ({ ...prev, bridge: true })), 1800)
    setTimeout(() => setConnectionChecks(prev => ({ ...prev, internet: true })), 2800)
    setTimeout(() => {
      setConnectionChecks(prev => ({ ...prev, speed: true }))
      setIsConnecting(false)
      dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'connected' })
      dispatch({
        type: 'SET_PHONE_INFO',
        payload: {
          connected: true,
          model: 'Pixel 8 Pro',
          battery: 87,
          connectionType: '5G',
          signalStrength: 92,
          dataUsage: { used: 12.4, total: 50 },
          uptime: 0
        }
      })
      dispatch({ type: 'SET_MONITORING', payload: true })
    }, 3600)
  }

  const handleComplete = () => {
    dispatch({ type: 'COMPLETE_SETUP' })
  }

  return (
    <div className="h-full flex flex-col bg-[#0a0a0f]">
      {/* Progress bar */}
      <div className="px-8 pt-6">
        <div className="flex items-center gap-2 mb-2">
          {steps.map((_, i) => (
            <div key={i} className="flex-1 flex items-center gap-2">
              <div className={`flex-1 h-1 rounded-full transition-all duration-500 ${
                i <= currentStep ? 'bg-indigo-500' : 'bg-gray-800'
              }`} />
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500">Step {currentStep + 1} of {steps.length}</p>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-2xl w-full">
          {/* Step 0: Welcome */}
          {currentStep === 0 && (
            <div className="text-center space-y-8">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl flex items-center justify-center shadow-2xl shadow-indigo-500/20">
                <Cable size={40} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-3">
                  {steps[0].title}
                </h1>
                <p className="text-gray-400 text-lg max-w-md mx-auto">
                  {steps[0].subtitle}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 text-center">
                  <Zap size={20} className="text-yellow-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-400">No Overheating</p>
                </div>
                <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 text-center">
                  <Shield size={20} className="text-green-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-400">Secure Bridge</p>
                </div>
                <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 text-center">
                  <Monitor size={20} className="text-cyan-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-400">Full Speed</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Choose Method */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">{steps[1].title}</h2>
                <p className="text-gray-400">{steps[1].subtitle}</p>
              </div>
              <div className="grid gap-4">
                <button
                  onClick={() => setSelectedMethod('usb')}
                  className={`flex items-center gap-4 p-5 rounded-xl border transition-all text-left ${
                    selectedMethod === 'usb'
                      ? 'bg-indigo-600/10 border-indigo-500/50 shadow-lg shadow-indigo-500/10'
                      : 'bg-gray-800/30 border-gray-700/50 hover:border-gray-600'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    selectedMethod === 'usb' ? 'bg-indigo-600/20' : 'bg-gray-800'
                  }`}>
                    <Usb size={24} className={selectedMethod === 'usb' ? 'text-indigo-400' : 'text-gray-400'} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">USB Direct Bridge</h3>
                    <p className="text-sm text-gray-400">Fastest, most stable. Phone charges while bridging. Recommended.</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded">⚡ Fastest</span>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedMethod('bluetooth')}
                  className={`flex items-center gap-4 p-5 rounded-xl border transition-all text-left ${
                    selectedMethod === 'bluetooth'
                      ? 'bg-indigo-600/10 border-indigo-500/50 shadow-lg shadow-indigo-500/10'
                      : 'bg-gray-800/30 border-gray-700/50 hover:border-gray-600'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    selectedMethod === 'bluetooth' ? 'bg-indigo-600/20' : 'bg-gray-800'
                  }`}>
                    <Bluetooth size={24} className={selectedMethod === 'bluetooth' ? 'text-indigo-400' : 'text-gray-400'} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">Bluetooth PAN</h3>
                    <p className="text-sm text-gray-400">Wireless, low power. Slower but no cable needed.</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded">📶 Wireless</span>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedMethod('proxy')}
                  className={`flex items-center gap-4 p-5 rounded-xl border transition-all text-left ${
                    selectedMethod === 'proxy'
                      ? 'bg-indigo-600/10 border-indigo-500/50 shadow-lg shadow-indigo-500/10'
                      : 'bg-gray-800/30 border-gray-700/50 hover:border-gray-600'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    selectedMethod === 'proxy' ? 'bg-indigo-600/20' : 'bg-gray-800'
                  }`}>
                    <Server size={24} className={selectedMethod === 'proxy' ? 'text-indigo-400' : 'text-gray-400'} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">SOCKS Proxy Server</h3>
                    <p className="text-sm text-gray-400">Advanced. Multiple devices. Your "server extension" concept.</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-purple-400 bg-purple-400/10 px-2 py-1 rounded">🖥️ Advanced</span>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Connect */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">{steps[2].title}</h2>
                <p className="text-gray-400">{steps[2].subtitle}</p>
              </div>

              <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 space-y-4">
                {selectedMethod === 'usb' && (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-600/20 rounded-lg flex items-center justify-center text-sm font-bold text-indigo-400">1</div>
                      <p className="text-gray-300">Connect your phone to PC via USB cable</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-600/20 rounded-lg flex items-center justify-center text-sm font-bold text-indigo-400">2</div>
                      <p className="text-gray-300">On phone: Settings → Network → Hotspot & Tethering → <strong className="text-white">USB Tethering ON</strong></p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-600/20 rounded-lg flex items-center justify-center text-sm font-bold text-indigo-400">3</div>
                      <p className="text-gray-300">Authorize USB connection on your phone if prompted</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-600/20 rounded-lg flex items-center justify-center text-sm font-bold text-indigo-400">4</div>
                      <p className="text-gray-300">Click "Establish Bridge" below</p>
                    </div>
                  </>
                )}
                {selectedMethod === 'bluetooth' && (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-600/20 rounded-lg flex items-center justify-center text-sm font-bold text-indigo-400">1</div>
                      <p className="text-gray-300">Pair your phone with PC via Bluetooth</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-600/20 rounded-lg flex items-center justify-center text-sm font-bold text-indigo-400">2</div>
                      <p className="text-gray-300">On phone: Settings → Bluetooth Tethering → ON</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-600/20 rounded-lg flex items-center justify-center text-sm font-bold text-indigo-400">3</div>
                      <p className="text-gray-300">On PC: Bluetooth → Your Phone → Connect as PAN</p>
                    </div>
                  </>
                )}
                {selectedMethod === 'proxy' && (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-600/20 rounded-lg flex items-center justify-center text-sm font-bold text-indigo-400">1</div>
                      <p className="text-gray-300">Install Termux on phone & run SOCKS proxy server</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-600/20 rounded-lg flex items-center justify-center text-sm font-bold text-indigo-400">2</div>
                      <p className="text-gray-300">Connect phone via USB and enable ADB</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-600/20 rounded-lg flex items-center justify-center text-sm font-bold text-indigo-400">3</div>
                      <p className="text-gray-300">Forward proxy port: <code className="text-green-400 bg-gray-900 px-1 rounded">adb forward tcp:1080 tcp:1080</code></p>
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={handleConnect}
                disabled={isConnecting}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2"
              >
                {isConnecting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Establishing Bridge...
                  </>
                ) : (
                  <>
                    <Cable size={18} />
                    Establish Bridge
                  </>
                )}
              </button>

              {/* Connection checks */}
              {(isConnecting || connectionChecks.device) && (
                <div className="space-y-2">
                  <CheckItem label="Device detected" done={connectionChecks.device} />
                  <CheckItem label="Bridge established" done={connectionChecks.bridge} />
                  <CheckItem label="Internet accessible" done={connectionChecks.internet} />
                  <CheckItem label="Speed verified" done={connectionChecks.speed} />
                </div>
              )}
            </div>
          )}

          {/* Step 3: Verify */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">{steps[3].title}</h2>
                <p className="text-gray-400">{steps[3].subtitle}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-5 text-center">
                  <p className="text-3xl font-bold text-green-400 font-mono">28ms</p>
                  <p className="text-xs text-gray-400 mt-1">Ping to Google DNS</p>
                </div>
                <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-5 text-center">
                  <p className="text-3xl font-bold text-cyan-400 font-mono">32.4</p>
                  <p className="text-xs text-gray-400 mt-1">Mbps Download</p>
                </div>
                <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-5 text-center">
                  <p className="text-3xl font-bold text-purple-400 font-mono">12.1</p>
                  <p className="text-xs text-gray-400 mt-1">Mbps Upload</p>
                </div>
                <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-5 text-center">
                  <p className="text-3xl font-bold text-yellow-400 font-mono">0%</p>
                  <p className="text-xs text-gray-400 mt-1">Packet Loss</p>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-5 flex items-center gap-4">
                <CheckCircle2 size={24} className="text-green-400 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-green-300">All checks passed!</p>
                  <p className="text-sm text-gray-400">Your phone is successfully bridging internet to this PC.</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Complete */}
          {currentStep === 4 && (
            <div className="text-center space-y-8">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-green-500/20">
                <CheckCircle2 size={40} className="text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-3">{steps[4].title}</h2>
                <p className="text-gray-400 text-lg">{steps[4].subtitle}</p>
              </div>
              <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 text-left space-y-3">
                <div className="flex items-center gap-3">
                  <Smartphone size={18} className="text-indigo-400" />
                  <span className="text-gray-300">Phone: Pixel 8 Pro (5G)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Cable size={18} className="text-indigo-400" />
                  <span className="text-gray-300">Bridge: USB Direct</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap size={18} className="text-indigo-400" />
                  <span className="text-gray-300">Temperature: Normal (no hotspot heat)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield size={18} className="text-indigo-400" />
                  <span className="text-gray-300">Security: Encrypted tunnel active</span>
                </div>
              </div>
              <button
                onClick={handleComplete}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold text-white transition-all"
              >
                Open Dashboard →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="px-8 py-4 border-t border-gray-800/50 flex items-center justify-between">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        {currentStep < 2 && (
          <button
            onClick={handleNext}
            disabled={currentStep === 1 && !selectedMethod}
            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-800 disabled:text-gray-600 rounded-lg font-medium text-white transition-all"
          >
            Next
            <ArrowRight size={16} />
          </button>
        )}
        {currentStep === 2 && connectionChecks.speed && (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-medium text-white transition-all"
          >
            Continue
            <ArrowRight size={16} />
          </button>
        )}
        {currentStep === 3 && (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-medium text-white transition-all"
          >
            Finish Setup
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  )
}

function CheckItem({ label, done }: { label: string; done: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
      done ? 'bg-green-500/10' : 'bg-gray-800/30'
    }`}>
      {done ? (
        <CheckCircle2 size={16} className="text-green-400" />
      ) : (
        <Loader2 size={16} className="text-gray-500 animate-spin" />
      )}
      <span className={`text-sm ${done ? 'text-green-300' : 'text-gray-500'}`}>{label}</span>
    </div>
  )
}

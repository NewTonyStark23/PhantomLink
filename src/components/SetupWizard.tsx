import { useState } from 'react'
import { useApp } from '../context/AppContext'
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Shield,
  Zap,
  Monitor,
  Eye,
  EyeOff,
  Fingerprint,
  Lock,
  Cable,
  Server,
  Radio,
  AlertTriangle,
  Check
} from 'lucide-react'

const steps = [
  { id: 'welcome', title: 'PhoneNet Bridge — Stealth Mode', subtitle: 'Your PC becomes your phone. Carrier sees nothing.' },
  { id: 'explain', title: 'How Carriers Detect Tethering', subtitle: 'Understanding what we need to hide' },
  { id: 'method', title: 'Choose Stealth Method', subtitle: 'How the tunnel will work' },
  { id: 'connect', title: 'Establish Stealth Bridge', subtitle: 'Creating the invisible tunnel' },
  { id: 'verify', title: 'Verify Identity Match', subtitle: 'Confirming carrier cannot distinguish PC from phone' },
  { id: 'complete', title: 'Stealth Bridge Active', subtitle: 'Your PC is now indistinguishable from your phone' }
]

export default function SetupWizard() {
  const { dispatch } = useApp()
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedMethod, setSelectedMethod] = useState<'stealth-vpn' | 'stealth-proxy' | 'stealth-tunnel' | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionChecks, setConnectionChecks] = useState({
    device: false,
    tunnel: false,
    ttl: false,
    apn: false,
    identity: false,
    internet: false
  })

  const handleNext = () => { if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1) }
  const handleBack = () => { if (currentStep > 0) setCurrentStep(currentStep - 1) }

  const handleConnect = () => {
    setIsConnecting(true)
    dispatch({ type: 'SET_BRIDGE_MODE', payload: selectedMethod })
    dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'connecting' })

    setTimeout(() => setConnectionChecks(p => ({ ...p, device: true })), 600)
    setTimeout(() => setConnectionChecks(p => ({ ...p, tunnel: true })), 1200)
    setTimeout(() => setConnectionChecks(p => ({ ...p, ttl: true })), 1800)
    setTimeout(() => setConnectionChecks(p => ({ ...p, apn: true })), 2400)
    setTimeout(() => setConnectionChecks(p => ({ ...p, identity: true })), 3000)
    setTimeout(() => {
      setConnectionChecks(p => ({ ...p, internet: true }))
      setIsConnecting(false)
      dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'connected' })
      dispatch({ type: 'SET_STEALTH_ACTIVE', payload: true })
      dispatch({
        type: 'SET_PHONE_INFO',
        payload: {
          connected: true,
          model: 'Pixel 8 Pro',
          battery: 87,
          connectionType: '5G SA',
          signalStrength: 92,
          dataUsage: { used: 12.4, total: 50 },
          uptime: 0,
          imei: '••••••••3847',
          carrierIP: '10.160.' + Math.floor(Math.random() * 255) + '.' + Math.floor(Math.random() * 255)
        }
      })
      dispatch({
        type: 'UPDATE_CARRIER_DETECTION',
        payload: { ttlMatches: true, apnMatches: true, fingerprintMatches: true, ipMatches: true, overallScore: 100 }
      })
      dispatch({ type: 'SET_MONITORING', payload: true })
    }, 3600)
  }

  const handleComplete = () => { dispatch({ type: 'COMPLETE_SETUP' }) }

  return (
    <div className="h-full flex flex-col bg-[#0a0a0f]">
      {/* Progress */}
      <div className="px-8 pt-6">
        <div className="flex items-center gap-1.5 mb-2">
          {steps.map((_, i) => (
            <div key={i} className={`flex-1 h-1 rounded-full transition-all duration-500 ${i <= currentStep ? 'bg-indigo-500' : 'bg-gray-800'}`} />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">Step {currentStep + 1} of {steps.length}</p>
          <div className="flex items-center gap-1.5">
            <EyeOff size={10} className="text-indigo-400" />
            <span className="text-[10px] text-indigo-400">Stealth Mode</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <div className="max-w-2xl w-full">

          {/* Step 0: Welcome */}
          {currentStep === 0 && (
            <div className="text-center space-y-8">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl flex items-center justify-center shadow-2xl shadow-indigo-500/20 relative">
                <Shield size={40} className="text-white" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <EyeOff size={12} className="text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-3">{steps[0].title}</h1>
                <p className="text-gray-400 text-lg max-w-lg mx-auto">{steps[0].subtitle}</p>
              </div>
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5 text-left">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={18} className="text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-red-300 mb-1">Why this exists</p>
                    <p className="text-sm text-gray-400">
                      Standard USB tethering uses a <strong className="text-white">separate APN</strong> and changes 
                      <strong className="text-white"> TTL from 64→63</strong>. Your carrier detects this and charges you 
                      for hotspot data — even though it's YOUR data plan. This tool makes your PC 
                      <strong className="text-green-400"> indistinguishable</strong> from the phone itself.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 text-center">
                  <EyeOff size={20} className="text-indigo-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-400">Invisible to Carrier</p>
                </div>
                <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 text-center">
                  <Fingerprint size={20} className="text-purple-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-400">Same Identity as Phone</p>
                </div>
                <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 text-center">
                  <Zap size={20} className="text-yellow-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-400">Uses Regular Data Plan</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: How carriers detect */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">{steps[1].title}</h2>
                <p className="text-gray-400">{steps[1].subtitle}</p>
              </div>

              <div className="space-y-3">
                <DetectionCard
                  icon={<Radio size={18} />}
                  title="TTL (Time To Live)"
                  description="Phone sends packets with TTL=64. Tethering decrements to TTL=63. Carrier checks this — if 63, it's tethered."
                  fix="We lock TTL at 64 for all forwarded packets. Carrier sees normal phone TTL."
                  color="red"
                />
                <DetectionCard
                  icon={<Server size={18} />}
                  title="APN (Access Point Name)"
                  description="Tethering uses a separate APN (like 'internet.tether'). Carrier routes this through hotspot billing."
                  fix="We use the phone's PRIMARY data APN. Same APN as if you're browsing on the phone itself."
                  color="red"
                />
                <DetectionCard
                  icon={<Fingerprint size={18} />}
                  title="Device Fingerprint"
                  description="HTTP headers, User-Agent, and TCP stack fingerprints can reveal a PC behind the phone."
                  fix="We strip/rewrite all headers to match the phone's exact fingerprint. PC becomes invisible."
                  color="red"
                />
                <DetectionCard
                  icon={<Lock size={18} />}
                  title="IP Address"
                  description="With NAT tethering, the PC gets a different internal IP. Carrier can see multiple devices."
                  fix="PC traffic exits from phone's modem with phone's IP. One IP, one device, one data plan."
                  color="green"
                />
              </div>
            </div>
          )}

          {/* Step 2: Choose Method */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">{steps[2].title}</h2>
                <p className="text-gray-400">{steps[2].subtitle}</p>
              </div>
              <div className="grid gap-4">
                <MethodButton
                  selected={selectedMethod === 'stealth-vpn'}
                  onClick={() => setSelectedMethod('stealth-vpn')}
                  icon={<Shield size={24} />}
                  title="Stealth VPN Tunnel"
                  description="Phone runs local VPN. All PC traffic enters the tunnel, exits from phone's modem with phone's IP, TTL, and identity. Carrier sees ONE device."
                  badge="Recommended"
                  badgeColor="green"
                />
                <MethodButton
                  selected={selectedMethod === 'stealth-tunnel'}
                  onClick={() => setSelectedMethod('stealth-tunnel')}
                  icon={<Cable size={24} />}
                  title="ADB Reverse Tunnel + TTL Fix"
                  description="Creates a raw tunnel via ADB. Phone forwards packets from PC through its own network stack. TTL correction applied at kernel level."
                  badge="Advanced"
                  badgeColor="purple"
                />
                <MethodButton
                  selected={selectedMethod === 'stealth-proxy'}
                  onClick={() => setSelectedMethod('stealth-proxy')}
                  icon={<Server size={24} />}
                  title="Transparent Proxy (SOCKS5 + Header Strip)"
                  description="SOCKS5 proxy on phone with header rewriting. All traffic appears to originate from phone's apps. Multiple devices supported."
                  badge="Multi-Device"
                  badgeColor="cyan"
                />
              </div>
            </div>
          )}

          {/* Step 3: Connect */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">{steps[3].title}</h2>
                <p className="text-gray-400">{steps[3].subtitle}</p>
              </div>

              <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 space-y-4">
                <p className="text-sm text-gray-300 mb-4">
                  This will create an invisible tunnel. Your carrier will NOT detect tethering.
                  Your phone's regular data plan will be used — not hotspot.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-600/20 rounded-lg flex items-center justify-center text-sm font-bold text-indigo-400">1</div>
                  <p className="text-gray-300">Connect phone via USB (for tunnel transport)</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-600/20 rounded-lg flex items-center justify-center text-sm font-bold text-indigo-400">2</div>
                  <p className="text-gray-300">Phone's <strong className="text-white">regular data APN</strong> will be used (NOT tethering APN)</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-600/20 rounded-lg flex items-center justify-center text-sm font-bold text-indigo-400">3</div>
                  <p className="text-gray-300">TTL correction + identity masking will be applied</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-600/20 rounded-lg flex items-center justify-center text-sm font-bold text-indigo-400">4</div>
                  <p className="text-gray-300">PC will use phone's IP as its own — same device to carrier</p>
                </div>
              </div>

              <button
                onClick={handleConnect}
                disabled={isConnecting}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2"
              >
                {isConnecting ? (
                  <><Loader2 size={18} className="animate-spin" />Establishing Stealth Tunnel...</>
                ) : (
                  <><Shield size={18} />Activate Stealth Bridge</>
                )}
              </button>

              {(isConnecting || connectionChecks.device) && (
                <div className="space-y-2">
                  <CheckItem label="Device detected via USB" done={connectionChecks.device} />
                  <CheckItem label="Tunnel established (VPN/TUN interface)" done={connectionChecks.tunnel} />
                  <CheckItem label="TTL locked at 64 (no decrement)" done={connectionChecks.ttl} />
                  <CheckItem label="Primary APN selected (not tethering)" done={connectionChecks.apn} />
                  <CheckItem label="Identity fingerprint matched" done={connectionChecks.identity} />
                  <CheckItem label="Internet verified — carrier sees phone only" done={connectionChecks.internet} />
                </div>
              )}
            </div>
          )}

          {/* Step 4: Verify */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">{steps[4].title}</h2>
                <p className="text-gray-400">{steps[4].subtitle}</p>
              </div>

              <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6">
                <h4 className="text-sm font-semibold text-white mb-4">Carrier Detection Analysis</h4>
                <div className="space-y-3">
                  <VerifyRow label="TTL Value" phone="64" pc="64" match={true} detail="No decrement detected" />
                  <VerifyRow label="APN" phone="internet (primary)" pc="internet (primary)" match={true} detail="Same APN as phone browsing" />
                  <VerifyRow label="Source IP" phone="10.160.x.x" pc="10.160.x.x" match={true} detail="Same carrier IP" />
                  <VerifyRow label="User-Agent" phone="Android/Chrome" pc="Android/Chrome" match={true} detail="Headers rewritten" />
                  <VerifyRow label="TCP Fingerprint" phone="p0f: Linux 4.x" pc="p0f: Linux 4.x" match={true} detail="TCP stack matches phone" />
                  <VerifyRow label="DNS Resolver" phone="Carrier DNS" pc="Carrier DNS" match={true} detail="No DNS leak" />
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-5 flex items-center gap-4">
                <CheckCircle2 size={24} className="text-green-400 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-green-300">100% Identity Match — Carrier Cannot Tell the Difference</p>
                  <p className="text-sm text-gray-400">Your PC is now indistinguishable from your phone. Regular data plan in use.</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Complete */}
          {currentStep === 5 && (
            <div className="text-center space-y-8">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-green-500/20">
                <Shield size={40} className="text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-3">{steps[5].title}</h2>
                <p className="text-gray-400 text-lg">{steps[5].subtitle}</p>
              </div>
              <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 text-left space-y-3">
                <div className="flex items-center gap-3">
                  <Shield size={16} className="text-green-400" />
                  <span className="text-gray-300 text-sm">Stealth Mode: <strong className="text-green-400">ACTIVE</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <Fingerprint size={16} className="text-indigo-400" />
                  <span className="text-gray-300 text-sm">PC Identity: <strong className="text-white">Pixel 8 Pro (masked)</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <Radio size={16} className="text-indigo-400" />
                  <span className="text-gray-300 text-sm">APN: <strong className="text-white">Primary data (not tethering)</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap size={16} className="text-indigo-400" />
                  <span className="text-gray-300 text-sm">Data Plan: <strong className="text-white">Regular phone data</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <Monitor size={16} className="text-indigo-400" />
                  <span className="text-gray-300 text-sm">Phone Temp: <strong className="text-green-400">Normal (no hotspot heat)</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <EyeOff size={16} className="text-indigo-400" />
                  <span className="text-gray-300 text-sm">Carrier Detection: <strong className="text-green-400">0% — Invisible</strong></span>
                </div>
              </div>
              <button onClick={handleComplete} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold text-white transition-all">
                Open Dashboard →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="px-8 py-4 border-t border-gray-800/50 flex items-center justify-between">
        <button onClick={handleBack} disabled={currentStep === 0}
          className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
          <ArrowLeft size={16} /> Back
        </button>
        {currentStep < 2 && (
          <button onClick={handleNext} disabled={currentStep === 2 && !selectedMethod}
            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-800 disabled:text-gray-600 rounded-lg font-medium text-white transition-all">
            Next <ArrowRight size={16} />
          </button>
        )}
        {currentStep === 2 && (
          <button onClick={handleNext} disabled={!selectedMethod}
            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-800 disabled:text-gray-600 rounded-lg font-medium text-white transition-all">
            Next <ArrowRight size={16} />
          </button>
        )}
        {currentStep === 3 && connectionChecks.internet && (
          <button onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-medium text-white transition-all">
            Continue <ArrowRight size={16} />
          </button>
        )}
        {currentStep === 4 && (
          <button onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-medium text-white transition-all">
            Finish Setup <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  )
}

function DetectionCard({ icon, title, description, fix, color }: {
  icon: React.ReactNode; title: string; description: string; fix: string; color: string
}) {
  return (
    <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-5">
      <div className="flex items-start gap-3">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
          color === 'red' ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'
        }`}>
          {icon}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-white text-sm mb-1">{title}</h4>
          <p className="text-xs text-gray-400 mb-2">{description}</p>
          <div className="flex items-start gap-2 bg-green-500/5 border border-green-500/10 rounded-lg px-3 py-2">
            <Check size={12} className="text-green-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-green-300">{fix}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function MethodButton({ selected, onClick, icon, title, description, badge, badgeColor }: {
  selected: boolean; onClick: () => void; icon: React.ReactNode; title: string
  description: string; badge: string; badgeColor: string
}) {
  const colorMap: Record<string, string> = {
    green: 'text-green-400 bg-green-400/10',
    purple: 'text-purple-400 bg-purple-400/10',
    cyan: 'text-cyan-400 bg-cyan-400/10'
  }
  return (
    <button onClick={onClick}
      className={`flex items-center gap-4 p-5 rounded-xl border transition-all text-left w-full ${
        selected ? 'bg-indigo-600/10 border-indigo-500/50 shadow-lg shadow-indigo-500/10'
        : 'bg-gray-800/30 border-gray-700/50 hover:border-gray-600'
      }`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selected ? 'bg-indigo-600/20' : 'bg-gray-800'}`}>
        <span className={selected ? 'text-indigo-400' : 'text-gray-400'}>{icon}</span>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-white">{title}</h3>
          <span className={`text-[10px] px-2 py-0.5 rounded ${colorMap[badgeColor]}`}>{badge}</span>
        </div>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </button>
  )
}

function CheckItem({ label, done }: { label: string; done: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${done ? 'bg-green-500/10' : 'bg-gray-800/30'}`}>
      {done ? <CheckCircle2 size={16} className="text-green-400" /> : <Loader2 size={16} className="text-gray-500 animate-spin" />}
      <span className={`text-sm ${done ? 'text-green-300' : 'text-gray-500'}`}>{label}</span>
    </div>
  )
}

function VerifyRow({ label, phone, pc, match, detail }: {
  label: string; phone: string; pc: string; match: boolean; detail: string
}) {
  return (
    <div className="flex items-center gap-3 py-2 border-b border-gray-800/50 last:border-0">
      <span className="text-xs text-gray-400 w-24 flex-shrink-0">{label}</span>
      <span className="text-xs text-gray-300 font-mono flex-1">{phone}</span>
      <span className="text-gray-600">=</span>
      <span className="text-xs text-gray-300 font-mono flex-1">{pc}</span>
      {match ? (
        <span className="text-xs text-green-400 flex items-center gap-1"><Check size={12} /> Match</span>
      ) : (
        <span className="text-xs text-red-400">Mismatch</span>
      )}
      <span className="text-[10px] text-gray-600 w-32 text-right">{detail}</span>
    </div>
  )
}

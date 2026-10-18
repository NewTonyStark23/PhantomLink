import { useApp } from '../context/AppContext'
import {
  Activity, Wifi, ArrowDown, ArrowUp, Clock, Battery, Signal,
  Smartphone, Gauge, TrendingUp, Shield, RefreshCw, Cable, Zap,
  EyeOff, Fingerprint, Radio, Lock
} from 'lucide-react'
import PingChart from './PingChart'
import SpeedGauge from './SpeedGauge'

export default function Dashboard() {
  const { state } = useApp()
  const { currentStats, phoneInfo, dataTransferred, networkStats, stealth, carrierDetection } = state

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = Math.floor(seconds % 60)
    return `${h}h ${m}m ${s}s`
  }

  const formatData = (mb: number) => {
    if (mb >= 1024) return `${(mb / 1024).toFixed(2)} GB`
    return `${mb.toFixed(1)} MB`
  }

  const avgPing = networkStats.length > 0
    ? Math.round(networkStats.reduce((a, b) => a + b.ping, 0) / networkStats.length)
    : 0

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Stealth Bridge Dashboard</h1>
          <p className="text-sm text-gray-400">Your PC is your phone — carrier cannot tell the difference</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
            <EyeOff size={12} className="text-indigo-400" />
            <span className="text-xs text-indigo-300 font-medium">Stealth Active</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-green-400 font-medium">Bridge Online</span>
          </div>
        </div>
      </div>

      {/* Stealth Score Banner */}
      <div className="bg-gradient-to-r from-indigo-950/50 to-purple-950/50 border border-indigo-500/20 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600/20 rounded-xl flex items-center justify-center">
            <Shield size={22} className="text-indigo-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Carrier Detection Score</p>
            <p className="text-xs text-gray-400">How detectable is your PC as a separate device?</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-green-400 font-mono">{carrierDetection.overallScore}%</p>
          <p className="text-xs text-green-400">Undetectable</p>
        </div>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={<Activity size={18} className="text-green-400" />} label="Ping" value={`${currentStats.ping}ms`} subvalue={`Avg: ${avgPing}ms`} color="green" />
        <StatCard icon={<ArrowDown size={18} className="text-cyan-400" />} label="Download" value={`${currentStats.downloadSpeed} Mbps`} subvalue={formatData(dataTransferred.down) + ' total'} color="cyan" />
        <StatCard icon={<ArrowUp size={18} className="text-purple-400" />} label="Upload" value={`${currentStats.uploadSpeed} Mbps`} subvalue={formatData(dataTransferred.up) + ' total'} color="purple" />
        <StatCard icon={<Gauge size={18} className="text-yellow-400" />} label="Jitter" value={`${currentStats.jitter}ms`} subvalue={`Loss: ${currentStats.packetLoss}%`} color="yellow" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-[#0c0c14] border border-gray-800/50 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-indigo-400" />
              <h3 className="font-semibold text-white text-sm">Ping Latency (Real-time)</h3>
            </div>
            <span className="text-xs text-gray-500">Last 60 readings</span>
          </div>
          <PingChart data={networkStats} />
        </div>
        <div className="bg-[#0c0c14] border border-gray-800/50 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} className="text-cyan-400" />
            <h3 className="font-semibold text-white text-sm">Speed</h3>
          </div>
          <SpeedGauge download={currentStats.downloadSpeed} upload={currentStats.uploadSpeed} />
        </div>
      </div>

      {/* Bottom Row - Stealth Focus */}
      <div className="grid grid-cols-3 gap-4">
        {/* Identity Mask Status */}
        <div className="bg-[#0c0c14] border border-gray-800/50 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Fingerprint size={16} className="text-purple-400" />
            <h3 className="font-semibold text-white text-sm">Identity Mask</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Source IP</span>
              <span className="text-xs text-green-400 font-mono">{phoneInfo.carrierIP || '—'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">TTL Value</span>
              <span className="text-xs text-green-400 font-mono">64 ✓</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">APN</span>
              <span className="text-xs text-green-400">Primary (not tether)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">User-Agent</span>
              <span className="text-xs text-green-400">Phone matched</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">TCP Stack</span>
              <span className="text-xs text-green-400">Linux 4.x (phone)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">DNS</span>
              <span className="text-xs text-green-400">Carrier DNS (no leak)</span>
            </div>
          </div>
        </div>

        {/* Stealth Engine */}
        <div className="bg-[#0c0c14] border border-gray-800/50 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <EyeOff size={16} className="text-indigo-400" />
            <h3 className="font-semibold text-white text-sm">Stealth Engine</h3>
          </div>
          <div className="space-y-2.5">
            <StealthToggle label="TTL Correction (64→64)" active={stealth.ttlCorrection} />
            <StealthToggle label="APN Spoof (primary)" active={stealth.apnSpoof} />
            <StealthToggle label="User-Agent Mask" active={stealth.userAgentMask} />
            <StealthToggle label="DNS Leak Protection" active={stealth.dnsLeakProtect} />
            <StealthToggle label="Fingerprint Match" active={stealth.fingerprintMatch} />
            <StealthToggle label="Header Strip" active={stealth.headerStrip} />
          </div>
        </div>

        {/* Phone + Bridge Info */}
        <div className="bg-[#0c0c14] border border-gray-800/50 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Smartphone size={16} className="text-indigo-400" />
            <h3 className="font-semibold text-white text-sm">Phone & Bridge</h3>
          </div>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 flex items-center gap-1.5"><Smartphone size={10} /> Device</span>
              <span className="text-xs text-gray-300">{phoneInfo.model}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 flex items-center gap-1.5"><Signal size={10} /> Signal</span>
              <span className="text-xs text-gray-300">{phoneInfo.signalStrength}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 flex items-center gap-1.5"><Radio size={10} /> Network</span>
              <span className="text-xs text-indigo-400 font-medium">{phoneInfo.connectionType}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 flex items-center gap-1.5"><Battery size={10} /> Battery</span>
              <span className="text-xs text-gray-300">{Math.round(phoneInfo.battery)}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 flex items-center gap-1.5"><Clock size={10} /> Uptime</span>
              <span className="text-xs text-gray-300 font-mono">{formatUptime(phoneInfo.uptime)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 flex items-center gap-1.5"><Cable size={10} /> Bridge</span>
              <span className="text-xs text-green-400">
                {state.bridgeMode === 'stealth-vpn' ? '🛡️ Stealth VPN' :
                 state.bridgeMode === 'stealth-tunnel' ? '🔌 ADB Tunnel' : '🖥️ Proxy'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 flex items-center gap-1.5"><Lock size={10} /> WiFi AP</span>
              <span className="text-xs text-green-400 font-bold">OFF ✓</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, subvalue, color }: {
  icon: React.ReactNode; label: string; value: string; subvalue: string; color: string
}) {
  const bgColors: Record<string, string> = {
    green: 'bg-green-500/5 border-green-500/20',
    cyan: 'bg-cyan-500/5 border-cyan-500/20',
    purple: 'bg-purple-500/5 border-purple-500/20',
    yellow: 'bg-yellow-500/5 border-yellow-500/20'
  }
  return (
    <div className={`border rounded-xl p-4 ${bgColors[color] || bgColors.green}`}>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-xs text-gray-400">{label}</span>
      </div>
      <p className="text-xl font-bold text-white font-mono">{value}</p>
      <p className="text-xs text-gray-500 mt-1">{subvalue}</p>
    </div>
  )
}

function StealthToggle({ label, active }: { label: string; active: boolean }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-xs text-gray-400">{label}</span>
      <div className={`w-8 h-4 rounded-full relative transition-colors ${active ? 'bg-green-500/30' : 'bg-gray-700'}`}>
        <div className={`absolute top-0.5 w-3 h-3 rounded-full transition-all ${
          active ? 'left-4.5 bg-green-400 translate-x-0.5' : 'left-0.5 bg-gray-500'
        }`} style={{ left: active ? '17px' : '2px' }} />
      </div>
    </div>
  )
}

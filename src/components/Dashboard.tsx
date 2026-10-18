import { useApp } from '../context/AppContext'
import {
  Activity,
  Wifi,
  ArrowDown,
  ArrowUp,
  Clock,
  Battery,
  Signal,
  Smartphone,
  Gauge,
  TrendingUp,
  Shield,
  RefreshCw,
  Cable,
  Zap
} from 'lucide-react'
import PingChart from './PingChart'
import SpeedGauge from './SpeedGauge'

export default function Dashboard() {
  const { state } = useApp()
  const { currentStats, phoneInfo, dataTransferred, networkStats } = state

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
          <h1 className="text-2xl font-bold text-white">Network Dashboard</h1>
          <p className="text-sm text-gray-400">Real-time monitoring of your phone bridge</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-green-400 font-medium">Bridge Active</span>
          </div>
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <RefreshCw size={16} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          icon={<Activity size={18} className="text-green-400" />}
          label="Ping"
          value={`${currentStats.ping}ms`}
          subvalue={`Avg: ${avgPing}ms`}
          color="green"
        />
        <StatCard
          icon={<ArrowDown size={18} className="text-cyan-400" />}
          label="Download"
          value={`${currentStats.downloadSpeed} Mbps`}
          subvalue={formatData(dataTransferred.down) + ' total'}
          color="cyan"
        />
        <StatCard
          icon={<ArrowUp size={18} className="text-purple-400" />}
          label="Upload"
          value={`${currentStats.uploadSpeed} Mbps`}
          subvalue={formatData(dataTransferred.up) + ' total'}
          color="purple"
        />
        <StatCard
          icon={<Gauge size={18} className="text-yellow-400" />}
          label="Jitter"
          value={`${currentStats.jitter}ms`}
          subvalue={`Loss: ${currentStats.packetLoss}%`}
          color="yellow"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* Ping Chart - spans 2 columns */}
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

        {/* Speed Gauge */}
        <div className="bg-[#0c0c14] border border-gray-800/50 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} className="text-cyan-400" />
            <h3 className="font-semibold text-white text-sm">Speed</h3>
          </div>
          <SpeedGauge
            download={currentStats.downloadSpeed}
            upload={currentStats.uploadSpeed}
          />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Phone Status */}
        <div className="bg-[#0c0c14] border border-gray-800/50 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Smartphone size={16} className="text-indigo-400" />
            <h3 className="font-semibold text-white text-sm">Phone Status</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 flex items-center gap-1.5">
                <Smartphone size={11} /> Device
              </span>
              <span className="text-xs text-gray-300">{phoneInfo.model}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 flex items-center gap-1.5">
                <Signal size={11} /> Signal
              </span>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div
                      key={i}
                      className={`w-1 rounded-full ${
                        i <= Math.ceil(phoneInfo.signalStrength / 20)
                          ? 'bg-green-400'
                          : 'bg-gray-700'
                      }`}
                      style={{ height: `${8 + i * 3}px` }}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-300">{phoneInfo.signalStrength}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 flex items-center gap-1.5">
                <Wifi size={11} /> Network
              </span>
              <span className="text-xs text-indigo-400 font-medium">{phoneInfo.connectionType}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 flex items-center gap-1.5">
                <Battery size={11} /> Battery
              </span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      phoneInfo.battery > 50 ? 'bg-green-400' :
                      phoneInfo.battery > 20 ? 'bg-yellow-400' : 'bg-red-400'
                    }`}
                    style={{ width: `${phoneInfo.battery}%` }}
                  />
                </div>
                <span className="text-xs text-gray-300">{Math.round(phoneInfo.battery)}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 flex items-center gap-1.5">
                <Clock size={11} /> Uptime
              </span>
              <span className="text-xs text-gray-300 font-mono">{formatUptime(phoneInfo.uptime)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 flex items-center gap-1.5">
                <Zap size={11} /> Data Used
              </span>
              <span className="text-xs text-gray-300">
                {phoneInfo.dataUsage.used.toFixed(1)} / {phoneInfo.dataUsage.total} GB
              </span>
            </div>
          </div>
        </div>

        {/* Connection Info */}
        <div className="bg-[#0c0c14] border border-gray-800/50 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Cable size={16} className="text-green-400" />
            <h3 className="font-semibold text-white text-sm">Bridge Info</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Mode</span>
              <span className="text-xs text-green-400 font-medium">
                {state.bridgeMode === 'usb' ? '🔌 USB Direct' :
                 state.bridgeMode === 'bluetooth' ? '📶 Bluetooth' : '🖥️ Proxy'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">WiFi AP</span>
              <span className="text-xs text-green-400">OFF ✓</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Phone Temp</span>
              <span className="text-xs text-green-400">Normal 🌡️</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Encryption</span>
              <span className="text-xs text-indigo-400">AES-256</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Protocol</span>
              <span className="text-xs text-gray-300">
                {state.bridgeMode === 'proxy' ? 'SOCKS5' : 'RNDIS/TCP'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">NAT</span>
              <span className="text-xs text-gray-300">Active</span>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-[#0c0c14] border border-gray-800/50 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Shield size={16} className="text-green-400" />
            <h3 className="font-semibold text-white text-sm">Security</h3>
          </div>
          <div className="space-y-3">
            <SecurityItem label="Tunnel Encryption" status="active" />
            <SecurityItem label="DNS Protection" status="active" />
            <SecurityItem label="Leak Prevention" status="active" />
            <SecurityItem label="Firewall Rules" status="active" />
            <SecurityItem label="Packet Inspection" status="monitoring" />
            <SecurityItem label="Threat Detection" status="active" />
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, subvalue, color }: {
  icon: React.ReactNode
  label: string
  value: string
  subvalue: string
  color: string
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

function SecurityItem({ label, status }: { label: string; status: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-gray-400">{label}</span>
      <span className={`text-xs ${
        status === 'active' ? 'text-green-400' : 'text-yellow-400'
      }`}>
        {status === 'active' ? '✓ Active' : '◉ Monitoring'}
      </span>
    </div>
  )
}

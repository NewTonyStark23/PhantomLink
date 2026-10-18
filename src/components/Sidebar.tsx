import { useApp } from '../context/AppContext'
import {
  LayoutDashboard, Cable, Activity, Settings, Smartphone,
  BarChart3, Shield, HelpCircle, Wifi, Zap, EyeOff, Fingerprint,
  Layers, Monitor
} from 'lucide-react'

const navItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'how-it-works', icon: Layers, label: 'How It Works' },
  { id: 'full-integration', icon: Monitor, label: 'Full Integration' },
  { id: 'connection', icon: Cable, label: 'Connection' },
  { id: 'monitor', icon: Activity, label: 'Monitor' },
  { id: 'phone', icon: Smartphone, label: 'Phone' },
  { id: 'stats', icon: BarChart3, label: 'Statistics' },
  { id: 'security', icon: Shield, label: 'Security' },
  { id: 'settings', icon: Settings, label: 'Settings' },
  { id: 'help', icon: HelpCircle, label: 'Help' },
]

export default function Sidebar() {
  const { state, dispatch } = useApp()

  return (
    <div className="w-56 bg-[#0c0c12] border-r border-gray-800/50 flex flex-col flex-shrink-0">
      {/* Connection Status */}
      <div className="p-4 border-b border-gray-800/50">
        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
          state.connectionStatus === 'connected'
            ? 'bg-green-500/10 border border-green-500/20'
            : state.connectionStatus === 'connecting'
            ? 'bg-yellow-500/10 border border-yellow-500/20'
            : 'bg-gray-800/50 border border-gray-700/50'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            state.connectionStatus === 'connected' ? 'bg-green-400 animate-pulse'
            : state.connectionStatus === 'connecting' ? 'bg-yellow-400 animate-pulse'
            : 'bg-gray-500'
          }`} />
          <span className={`text-xs font-medium ${
            state.connectionStatus === 'connected' ? 'text-green-400'
            : state.connectionStatus === 'connecting' ? 'text-yellow-400'
            : 'text-gray-500'
          }`}>
            {state.connectionStatus === 'connected' ? 'Stealth Online' :
             state.connectionStatus === 'connecting' ? 'Tunneling...' : 'Offline'}
          </span>
        </div>

        {/* Quick stats */}
        {state.connectionStatus === 'connected' && (
          <div className="mt-3 space-y-1.5">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-gray-500 flex items-center gap-1"><Zap size={9} /> Ping</span>
              <span className="text-green-400 font-mono">{state.currentStats.ping}ms</span>
            </div>
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-gray-500 flex items-center gap-1"><Wifi size={9} /> Speed</span>
              <span className="text-cyan-400 font-mono">{state.currentStats.downloadSpeed} Mbps</span>
            </div>
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-gray-500 flex items-center gap-1"><EyeOff size={9} /> Stealth</span>
              <span className="text-indigo-400 font-mono">{state.carrierDetection.overallScore}% safe</span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
        {navItems.map(item => {
          const Icon = item.icon
          const isActive = state.activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => dispatch({ type: 'SET_TAB', payload: item.id })}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                isActive
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/20'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
              }`}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Bottom: Bridge mode indicator */}
      <div className="p-3 border-t border-gray-800/50 space-y-2">
        <div className="bg-gray-800/30 rounded-lg p-3">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Bridge Mode</p>
          <div className="flex items-center gap-2">
            <Shield size={12} className="text-indigo-400" />
            <span className="text-xs text-gray-300">
              {state.bridgeMode === 'stealth-vpn' ? '🛡️ Stealth VPN' :
               state.bridgeMode === 'stealth-tunnel' ? '🔌 ADB Tunnel' :
               state.bridgeMode === 'stealth-proxy' ? '🖥️ SOCKS Proxy' : 'Not Active'}
            </span>
          </div>
        </div>
        <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-lg p-3">
          <p className="text-[10px] text-indigo-400 uppercase tracking-wider mb-1">Data Plan</p>
          <div className="flex items-center gap-2">
            <Fingerprint size={12} className="text-green-400" />
            <span className="text-xs text-green-400">Regular (not hotspot)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

import { Minus, Square, X, Shield, EyeOff } from 'lucide-react'

interface TitleBarProps {
  onMinimize: () => void
}

export default function TitleBar({ onMinimize }: TitleBarProps) {
  return (
    <div className="h-10 bg-[#0d0d14] border-b border-gray-800/50 flex items-center justify-between px-3 flex-shrink-0">
      {/* Left: App icon + title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded flex items-center justify-center">
            <Shield size={10} className="text-white" />
          </div>
          <span className="text-xs font-medium text-gray-300">PhoneNet Bridge</span>
          <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20">STEALTH</span>
          <span className="text-[10px] text-gray-600 bg-gray-800/50 px-1.5 py-0.5 rounded">v2.0</span>
        </div>
      </div>

      {/* Center: Status */}
      <div className="flex items-center gap-2">
        <EyeOff size={12} className="text-indigo-400" />
        <span className="text-[10px] text-indigo-300">Invisible to Carrier</span>
        <span className="text-gray-700 mx-1">|</span>
        <Shield size={12} className="text-green-400" />
        <span className="text-[10px] text-green-400">Regular Data Plan</span>
      </div>

      {/* Right: Window controls */}
      <div className="flex items-center">
        <button onClick={onMinimize} className="w-11 h-8 flex items-center justify-center hover:bg-gray-700/50 transition-colors">
          <Minus size={14} className="text-gray-400" />
        </button>
        <button className="w-11 h-8 flex items-center justify-center hover:bg-gray-700/50 transition-colors">
          <Square size={11} className="text-gray-400" />
        </button>
        <button className="w-11 h-8 flex items-center justify-center hover:bg-red-600 transition-colors group">
          <X size={14} className="text-gray-400 group-hover:text-white" />
        </button>
      </div>
    </div>
  )
}

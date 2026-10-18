import { NetworkStats } from '../context/AppContext'

interface PingChartProps {
  data: NetworkStats[]
}

export default function PingChart({ data }: PingChartProps) {
  if (data.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center">
        <p className="text-sm text-gray-500">Waiting for data...</p>
      </div>
    )
  }

  const width = 600
  const height = 180
  const padding = { top: 10, right: 10, bottom: 25, left: 40 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom

  const pings = data.map(d => d.ping)
  const maxPing = Math.max(...pings, 60)
  const minPing = Math.min(...pings, 0)
  const range = maxPing - minPing || 1

  const points = data.map((d, i) => {
    const x = padding.left + (i / Math.max(data.length - 1, 1)) * chartWidth
    const y = padding.top + chartHeight - ((d.ping - minPing) / range) * chartHeight
    return { x, y, ping: d.ping }
  })

  // Create smooth path
  const linePath = points.map((p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`
    const prev = points[i - 1]
    const cpx1 = prev.x + (p.x - prev.x) / 3
    const cpx2 = p.x - (p.x - prev.x) / 3
    return `C ${cpx1} ${prev.y} ${cpx2} ${p.y} ${p.x} ${p.y}`
  }).join(' ')

  // Area path
  const areaPath = linePath +
    ` L ${points[points.length - 1].x} ${padding.top + chartHeight}` +
    ` L ${points[0].x} ${padding.top + chartHeight} Z`

  // Grid lines
  const gridLines = [0, 0.25, 0.5, 0.75, 1].map(pct => {
    const y = padding.top + chartHeight * (1 - pct)
    const value = Math.round(minPing + range * pct)
    return { y, value }
  })

  const currentPing = data[data.length - 1]?.ping || 0
  const pingColor = currentPing < 30 ? '#4ade80' : currentPing < 60 ? '#facc15' : '#f87171'

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-48">
        {/* Grid */}
        {gridLines.map((line, i) => (
          <g key={i}>
            <line
              x1={padding.left}
              y1={line.y}
              x2={width - padding.right}
              y2={line.y}
              stroke="#1f2937"
              strokeWidth="1"
              strokeDasharray="4,4"
            />
            <text
              x={padding.left - 5}
              y={line.y + 3}
              textAnchor="end"
              className="fill-gray-600"
              fontSize="9"
            >
              {line.value}ms
            </text>
          </g>
        ))}

        {/* Area gradient */}
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={pingColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={pingColor} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor={pingColor} />
          </linearGradient>
        </defs>

        {/* Area */}
        <path d={areaPath} fill="url(#areaGradient)" />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Current point */}
        {points.length > 0 && (
          <g>
            <circle
              cx={points[points.length - 1].x}
              cy={points[points.length - 1].y}
              r="4"
              fill={pingColor}
              className="animate-pulse"
            />
            <circle
              cx={points[points.length - 1].x}
              cy={points[points.length - 1].y}
              r="8"
              fill={pingColor}
              opacity="0.2"
              className="animate-ping"
            />
          </g>
        )}

        {/* Current value label */}
        {points.length > 0 && (
          <text
            x={points[points.length - 1].x - 5}
            y={points[points.length - 1].y - 12}
            textAnchor="end"
            fill={pingColor}
            fontSize="11"
            fontWeight="bold"
          >
            {currentPing}ms
          </text>
        )}
      </svg>

      {/* Legend */}
      <div className="flex items-center justify-between mt-2 px-2">
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-gray-500 flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full" /> &lt;30ms Excellent
          </span>
          <span className="text-[10px] text-gray-500 flex items-center gap-1">
            <span className="w-2 h-2 bg-yellow-400 rounded-full" /> 30-60ms Good
          </span>
          <span className="text-[10px] text-gray-500 flex items-center gap-1">
            <span className="w-2 h-2 bg-red-400 rounded-full" /> &gt;60ms High
          </span>
        </div>
        <span className="text-[10px] text-gray-600">Updated every 2s</span>
      </div>
    </div>
  )
}

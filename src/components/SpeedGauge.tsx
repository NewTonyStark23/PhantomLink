interface SpeedGaugeProps {
  download: number
  upload: number
}

export default function SpeedGauge({ download, upload }: SpeedGaugeProps) {
  const maxSpeed = 50
  const downloadPct = Math.min(download / maxSpeed, 1)
  const uploadPct = Math.min(upload / maxSpeed, 1)

  // Arc calculations
  const cx = 100
  const cy = 100
  const r = 75
  const startAngle = 135
  const endAngle = 405
  const totalAngle = endAngle - startAngle

  const polarToCartesian = (angle: number, radius: number) => {
    const rad = (angle - 90) * Math.PI / 180
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad)
    }
  }

  const describeArc = (startA: number, endA: number, radius: number) => {
    const start = polarToCartesian(endA, radius)
    const end = polarToCartesian(startA, radius)
    const largeArcFlag = endA - startA <= 180 ? 0 : 1
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`
  }

  const downloadAngle = startAngle + totalAngle * downloadPct
  const uploadAngle = startAngle + totalAngle * uploadPct

  // Tick marks
  const ticks = [0, 10, 20, 30, 40, 50]

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 160" className="w-full max-w-[220px]">
        {/* Background arc */}
        <path
          d={describeArc(startAngle, endAngle, r)}
          fill="none"
          stroke="#1f2937"
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Download arc */}
        <path
          d={describeArc(startAngle, downloadAngle, r)}
          fill="none"
          stroke="url(#downloadGrad)"
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Upload arc (inner) */}
        <path
          d={describeArc(startAngle, uploadAngle, r - 18)}
          fill="none"
          stroke="url(#uploadGrad)"
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.7"
        />

        {/* Tick marks */}
        {ticks.map(tick => {
          const angle = startAngle + (tick / maxSpeed) * totalAngle
          const inner = polarToCartesian(angle, r + 8)
          const outer = polarToCartesian(angle, r + 14)
          const label = polarToCartesian(angle, r + 22)
          return (
            <g key={tick}>
              <line
                x1={inner.x} y1={inner.y}
                x2={outer.x} y2={outer.y}
                stroke="#374151"
                strokeWidth="1.5"
              />
              <text
                x={label.x} y={label.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-gray-600"
                fontSize="7"
              >
                {tick}
              </text>
            </g>
          )
        })}

        {/* Center text */}
        <text x={cx} y={cy - 8} textAnchor="middle" className="fill-white" fontSize="22" fontWeight="bold">
          {download.toFixed(1)}
        </text>
        <text x={cx} y={cy + 8} textAnchor="middle" className="fill-gray-500" fontSize="8">
          Mbps
        </text>

        {/* Gradients */}
        <defs>
          <linearGradient id="downloadGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <linearGradient id="uploadGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
      </svg>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-2">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-1.5 bg-cyan-400 rounded-full" />
          <span className="text-[10px] text-gray-400">↓ {download.toFixed(1)} Mbps</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-1.5 bg-purple-400 rounded-full" />
          <span className="text-[10px] text-gray-400">↑ {upload.toFixed(1)} Mbps</span>
        </div>
      </div>
    </div>
  )
}

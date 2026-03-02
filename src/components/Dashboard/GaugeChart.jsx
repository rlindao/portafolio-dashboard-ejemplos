import { useEffect, useRef } from 'react'

/**
 * GaugeChart — Velocímetro SVG reutilizable
 * Props:
 *   value: número actual (ej: 42)
 *   min: valor mínimo (default 0)
 *   max: valor máximo (default 100)
 *   target: valor objetivo (línea de referencia, opcional)
 *   label: etiqueta principal (ej: "42 Días")
 *   sublabel: etiqueta secundaria (ej: "Current DSO")
 *   targetLabel: etiqueta del target (ej: "Target: 30 Días")
 *   unit: unidad (ej: "%", "Días")
 *   colors: array de colores para los segmentos (default: verde→amarillo→naranja→rojo)
 *   size: tamaño en px (default: 220)
 */
export default function GaugeChart({
    value = 0,
    min = 0,
    max = 100,
    target,
    label,
    sublabel,
    targetLabel,
    unit = '',
    colors,
    size = 220,
}) {
    const canvasRef = useRef(null)

    const defaultColors = [
        { stop: 0, color: '#10b981' },
        { stop: 0.3, color: '#10b981' },
        { stop: 0.5, color: '#f59e0b' },
        { stop: 0.7, color: '#f97316' },
        { stop: 0.85, color: '#ef4444' },
        { stop: 1, color: '#991b1b' },
    ]

    const segments = colors || defaultColors

    const clampedValue = Math.max(min, Math.min(max, value))
    const percentage = (clampedValue - min) / (max - min)

    // SVG Arc approach
    const cx = size / 2
    const cy = size / 2 + 10
    const radius = size * 0.38
    const strokeWidth = size * 0.09
    const startAngle = -210
    const endAngle = 30
    const totalAngle = endAngle - startAngle // 240 degrees

    const polarToCartesian = (angle) => {
        const rad = (angle * Math.PI) / 180
        return {
            x: cx + radius * Math.cos(rad),
            y: cy + radius * Math.sin(rad),
        }
    }

    const describeArc = (start, end) => {
        const s = polarToCartesian(start)
        const e = polarToCartesian(end)
        const largeArc = end - start > 180 ? 1 : 0
        return `M ${s.x} ${s.y} A ${radius} ${radius} 0 ${largeArc} 1 ${e.x} ${e.y}`
    }

    // Needle angle
    const needleAngle = startAngle + percentage * totalAngle
    const needleLen = radius - strokeWidth / 2 - 4
    const needleEnd = polarToCartesian(needleAngle)
    const needleTipX = cx + needleLen * Math.cos((needleAngle * Math.PI) / 180)
    const needleTipY = cy + needleLen * Math.sin((needleAngle * Math.PI) / 180)

    // Target marker
    let targetMarker = null
    if (target !== undefined) {
        const targetPct = (Math.max(min, Math.min(max, target)) - min) / (max - min)
        const targetAngle = startAngle + targetPct * totalAngle
        const tOuter = radius + strokeWidth / 2 + 4
        const tInner = radius - strokeWidth / 2 - 4
        const outerPt = {
            x: cx + tOuter * Math.cos((targetAngle * Math.PI) / 180),
            y: cy + tOuter * Math.sin((targetAngle * Math.PI) / 180),
        }
        const innerPt = {
            x: cx + tInner * Math.cos((targetAngle * Math.PI) / 180),
            y: cy + tInner * Math.sin((targetAngle * Math.PI) / 180),
        }
        targetMarker = { outerPt, innerPt }
    }

    // Tick marks
    const ticks = []
    const tickCount = 6
    for (let i = 0; i <= tickCount; i++) {
        const pct = i / tickCount
        const angle = startAngle + pct * totalAngle
        const outerR = radius + strokeWidth / 2 + 2
        const innerR = radius + strokeWidth / 2 + 10
        const outer = { x: cx + outerR * Math.cos((angle * Math.PI) / 180), y: cy + outerR * Math.sin((angle * Math.PI) / 180) }
        const labelR = radius + strokeWidth / 2 + 22
        const labelPos = { x: cx + labelR * Math.cos((angle * Math.PI) / 180), y: cy + labelR * Math.sin((angle * Math.PI) / 180) }
        const tickValue = Math.round(min + pct * (max - min))
        ticks.push({ outer, labelPos, tickValue })
    }

    const displayLabel = label || `${clampedValue}${unit}`

    // Create gradient segments
    const segmentArcs = []
    for (let i = 0; i < segments.length - 1; i++) {
        const s1 = segments[i]
        const s2 = segments[i + 1]
        const a1 = startAngle + s1.stop * totalAngle
        const a2 = startAngle + s2.stop * totalAngle
        segmentArcs.push({ d: describeArc(a1, a2), color: s1.color })
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            <svg width={size} height={size * 0.7} viewBox={`0 0 ${size} ${size * 0.7}`}>
                {/* Background track */}
                <path
                    d={describeArc(startAngle, endAngle)}
                    fill="none"
                    stroke="var(--border-color)"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    opacity={0.3}
                />

                {/* Colored segments */}
                {segmentArcs.map((seg, i) => (
                    <path
                        key={i}
                        d={seg.d}
                        fill="none"
                        stroke={seg.color}
                        strokeWidth={strokeWidth}
                        strokeLinecap={i === 0 ? 'round' : 'butt'}
                        opacity={0.85}
                    />
                ))}

                {/* Tick labels */}
                {ticks.map((tick, i) => (
                    <text
                        key={i}
                        x={tick.labelPos.x}
                        y={tick.labelPos.y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="var(--text-muted)"
                        fontSize={size * 0.048}
                        fontWeight="500"
                        fontFamily="var(--font-family)"
                    >
                        {tick.tickValue}
                    </text>
                ))}

                {/* Target marker */}
                {targetMarker && (
                    <line
                        x1={targetMarker.innerPt.x}
                        y1={targetMarker.innerPt.y}
                        x2={targetMarker.outerPt.x}
                        y2={targetMarker.outerPt.y}
                        stroke="var(--text-primary)"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                    />
                )}

                {/* Needle */}
                <line
                    x1={cx}
                    y1={cy}
                    x2={needleTipX}
                    y2={needleTipY}
                    stroke="var(--text-primary)"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    style={{ transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }}
                />
                <circle cx={cx} cy={cy} r={5} fill="var(--text-primary)" />
                <circle cx={cx} cy={cy} r={2.5} fill="var(--bg-card)" />

                {/* Center value */}
                <text
                    x={cx}
                    y={cy - 24}
                    textAnchor="middle"
                    fill="var(--text-primary)"
                    fontSize={size * 0.14}
                    fontWeight="800"
                    fontFamily="var(--font-family)"
                >
                    {displayLabel}
                </text>

                {sublabel && (
                    <text
                        x={cx}
                        y={cy - 8}
                        textAnchor="middle"
                        fill="var(--text-muted)"
                        fontSize={size * 0.052}
                        fontWeight="500"
                        fontFamily="var(--font-family)"
                    >
                        {sublabel}
                    </text>
                )}
            </svg>

            {targetLabel && (
                <div style={{
                    fontSize: 'var(--font-xs)',
                    color: 'var(--text-muted)',
                    fontWeight: 600,
                    marginTop: -4,
                    textAlign: 'center',
                }}>
                    🎯 {targetLabel}
                </div>
            )}
        </div>
    )
}

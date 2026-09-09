import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'

const SEG = 0.22
const RAIL_W = 96
const PAD_X = 18

const SECTIONS: { id: string; num: string }[] = [
  { id: 'hero', num: '00' },
  { id: 'historia', num: '01' },
  { id: 'kujtesa', num: '02' },
  { id: 'rrugetimi', num: '03' },
  { id: 'vitet', num: '04' },
  { id: 'kater', num: '05' },
  { id: 'haga', num: '06' },
  { id: 'arkivi', num: '07' },
  { id: 'pritje', num: '08' },
  { id: 'verdict', num: '09' },
  { id: 'mbyllje', num: '10' },
]

function smoothPath(pts: [number, number][]): string {
  if (pts.length < 2) return ''
  let d = `M ${pts[0][0]} ${pts[0][1]}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[Math.min(pts.length - 1, i + 2)]
    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
  }
  return d
}

export function SnakeRail() {
  const reduce = useReducedMotion()
  const pathRef = useRef<SVGPathElement>(null)
  const arrowRef = useRef<SVGGElement>(null)
  const geoRef = useRef<{ winH: number; pts: [number, number][] }>({ winH: 800, pts: [] })

  const { scrollYProgress } = useScroll()
  const spring = useSpring(scrollYProgress, { stiffness: 160, damping: 28 })
  const offset = useTransform(spring, (v) => Math.min(1, Math.max(0, v)) * (1 - SEG))

  const [geo, setGeo] = useState<{ winH: number; pts: [number, number][]; d: string }>({
    winH: 800,
    pts: [],
    d: '',
  })
  const [active, setActive] = useState(0)

  geoRef.current = geo

  const apply = (raw: number) => {
    const v = Math.min(1, Math.max(0, raw))
    const { winH, pts } = geoRef.current
    if (pts.length === 0) return
    let idx = 0
    for (let i = 0; i < pts.length; i++) {
      if (pts[i][1] / winH <= v) idx = i
    }
    setActive((a) => (a === idx ? a : idx))
    if (pathRef.current && arrowRef.current) {
      const L = pathRef.current.getTotalLength()
      const head = Math.min(L, (v * (1 - SEG) + SEG) * L)
      const p = pathRef.current.getPointAtLength(head)
      const p2 = pathRef.current.getPointAtLength(Math.min(L, head + 10))
      const ang = (Math.atan2(p2.y - p.y, p2.x - p.x) * 180) / Math.PI
      arrowRef.current.setAttribute('transform', `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${ang.toFixed(1)})`)
    }
  }

  useEffect(() => {
    if (geo.d && pathRef.current) apply(spring.get())
  }, [geo.d, spring])

  useLayoutEffect(() => {
    let raf = 0
    const measure = () => {
      const winH = window.innerHeight
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - winH)
      const pts = SECTIONS.map((s, i) => {
        const el = document.getElementById(s.id)
        const top = el ? el.getBoundingClientRect().top + window.scrollY : 0
        const f = Math.min(1, Math.max(0, top / maxScroll))
        return [i % 2 === 0 ? PAD_X : RAIL_W - PAD_X, f * winH] as [number, number]
      })
      setGeo({ winH, pts, d: smoothPath(pts) })
    }
    measure()
    const onResize = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(measure)
    }
    const t = window.setTimeout(measure, 700)
    window.addEventListener('resize', onResize)
    window.addEventListener('load', measure)
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('load', measure)
      window.clearTimeout(t)
      cancelAnimationFrame(raf)
    }
  }, [])

  useMotionValueEvent(spring, 'change', (raw) => {
    apply(raw)
  })

  return (
    <div className="pointer-events-none fixed right-5 top-0 z-[120] hidden h-full lg:block">
      <svg width={RAIL_W} height={geo.winH} viewBox={`0 0 ${RAIL_W} ${geo.winH}`} className="h-full" preserveAspectRatio="none">
        <path d={geo.d} fill="none" stroke="#2a2722" strokeWidth={1} strokeDasharray="2 6" />
        {reduce ? null : (
          <motion.path
            ref={pathRef}
            d={geo.d}
            fill="none"
            stroke="#a6101f"
            strokeWidth={2}
            strokeLinecap="round"
            style={{
              pathLength: SEG,
              pathSpacing: 1 - SEG,
              pathOffset: offset,
              filter: 'drop-shadow(0 0 6px rgba(166,16,31,0.75))',
            }}
          />
        )}
        {geo.pts.map((p, i) => {
          const isActive = active === i
          return (
            <g key={SECTIONS[i].id}>
              {isActive && <circle cx={p[0]} cy={p[1]} r={9} fill="none" stroke="rgba(166,16,31,0.45)" strokeWidth={1} />}
              <circle
                cx={p[0]}
                cy={p[1]}
                r={isActive ? 3.4 : 1.8}
                fill={isActive ? '#e8e4da' : '#5d5a52'}
                stroke="#000"
                strokeWidth={1}
              />
              <text
                x={p[0]}
                y={p[1] - 9}
                textAnchor="middle"
                fontSize={7}
                fontFamily="IBM Plex Mono, monospace"
                fill={isActive ? '#e8e4da' : '#5d5a52'}
                opacity={isActive ? 1 : 0.85}
              >
                {SECTIONS[i].num}
              </text>
            </g>
          )
        })}
        <g ref={arrowRef}>
          <polygon points="-4,-6 5,0 -4,6" fill="#a6101f" />
        </g>
      </svg>
    </div>
  )
}
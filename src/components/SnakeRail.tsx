import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'motion/react'

const RAIL_W = 420
const CENTER_X = RAIL_W / 2
const AMP = 150
const PAD_X = 16
const BODY_N = 16
const GAP = 9
const HEAD_R = 7

const SECTIONS: { id: string; num: string }[] = [
  { id: 'hero', num: '00' },
  { id: 'historia', num: '01' },
  { id: 'kujtesa', num: '02' },
  { id: 'vitet', num: '03' },
  { id: 'kater', num: '04' },
  { id: 'haga', num: '05' },
  { id: 'arkivi', num: '06' },
  { id: 'pritje', num: '07' },
  { id: 'verdict', num: '08' },
  { id: 'mbyllje', num: '09' },
]

function snakeX(i: number): number {
  const x = CENTER_X + AMP * Math.cos(i * 0.92 - 1.1)
  return Math.min(RAIL_W - PAD_X, Math.max(PAD_X, x))
}

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
  const measureRef = useRef<SVGPathElement>(null)
  const headRef = useRef<SVGGElement>(null)
  const dotsRef = useRef<(SVGCircleElement | null)[]>([])
  const geoRef = useRef<{ pts: [number, number][] }>({ pts: [] })

  const { scrollYProgress } = useScroll()
  const spring = useSpring(scrollYProgress, { stiffness: 170, damping: 30 })

  const [geo, setGeo] = useState<{ winH: number; pts: [number, number][]; d: string }>({
    winH: 800,
    pts: [],
    d: '',
  })
  const [active, setActive] = useState(0)
  const [reached, setReached] = useState(0)

  geoRef.current = geo

  const place = useCallback(
    (raw: number) => {
      const pathEl = measureRef.current
      const pts = geoRef.current.pts
      if (!pathEl || pts.length < 2 || pathEl.getTotalLength() === 0) return
      const v = Math.min(1, Math.max(0, raw))
      const L = pathEl.getTotalLength()
      const headAt = Math.min(L, Math.max(0, v * L))

      const point = (t: number) => {
        const tt = Math.max(0, Math.min(L, t))
        const p = pathEl.getPointAtLength(tt)
        const q = pathEl.getPointAtLength(Math.max(0, tt - 3))
        const ang = Math.atan2(p.y - q.y, p.x - q.x)
        return { x: p.x, y: p.y, ang }
      }

      // body — little slithering dots that ride the path behind the head
      for (let k = 0; k < BODY_N; k++) {
        const c = dotsRef.current[k]
        if (!c) continue
        const t = headAt - (k + 1) * GAP
        if (t < 0) {
          c.setAttribute('opacity', '0')
          continue
        }
        const { x, y, ang } = point(t)
        const ripple = Math.sin(k * 0.62) * 8
        const px = x + -Math.sin(ang) * ripple
        const py = y + Math.cos(ang) * ripple
        c.setAttribute('cx', px.toFixed(1))
        c.setAttribute('cy', py.toFixed(1))
        c.setAttribute('opacity', (Math.max(0, 1 - k * 0.07)).toFixed(2))
      }

      // head — small arrow aimed along the path
      if (headRef.current) {
        const { x, y, ang } = point(headAt)
        headRef.current.setAttribute(
          'transform',
          `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${((ang * 180) / Math.PI).toFixed(1)})`,
        )
      }

      // section tracking
      let idx = 0
      for (let i = 0; i < pts.length; i++) {
        if (pts[i][1] <= headAt) idx = i
      }
      setActive((a) => (a === idx ? a : idx))
      setReached((r) => (r === idx ? r : idx))
    },
    [],
  )

  useLayoutEffect(() => {
    let raf = 0
    const measure = () => {
      const winH = window.innerHeight
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - winH)
      const pts = SECTIONS.map((s, i) => {
        const el = document.getElementById(s.id)
        const top = el ? el.getBoundingClientRect().top + window.scrollY : 0
        const f = Math.min(1, Math.max(0, top / maxScroll))
        return [snakeX(i), f * winH] as [number, number]
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

  // place body at current scroll once the path is measured
  useEffect(() => {
    if (!geo.d) return
    const pos = () => {
      const winH = window.innerHeight
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - winH)
      place(window.scrollY / maxScroll)
    }
    pos()
    const id = window.setTimeout(pos, 350)
    return () => window.clearTimeout(id)
  }, [geo.d, place])

  useMotionValueEvent(spring, 'change', (v) => {
    place(v)
  })

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[50] hidden h-full justify-center lg:flex"
      style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)' }}
      aria-hidden
    >
      <div className="relative h-full w-[420px]">
        <svg width={RAIL_W} height="100%" viewBox={`0 0 ${RAIL_W} ${geo.winH}`} preserveAspectRatio="none">
          {/* invisible rail used only for measurement */}
          <path ref={measureRef} d={geo.d} fill="none" stroke="none" />

          {/* the little snake */}
          <g>
            {Array.from({ length: BODY_N }).map((_, k) => (
              <motion.circle
                key={k}
                ref={(el) => {
                  dotsRef.current[k] = el
                }}
                r={k === 0 ? 6 : Math.max(3.4, 6.4 - k * 0.18)}
                fill={k < 3 ? '#c8182b' : '#a6101f'}
                style={{ opacity: 1 }}
              />
            ))}
            <g ref={headRef}>
              <circle r={HEAD_R} fill="#e8e4da" />
              {!reduce && <circle r={3} fill="#a6101f" />}
            </g>
          </g>

          {/* waypoints — stay dim until passed */}
          {geo.pts.map((p, i) => {
            const isActive = active === i
            const seen = i <= reached
            return (
              <g key={SECTIONS[i].id} opacity={seen ? 1 : 0.25}>
                {isActive && (
                  <circle cx={p[0]} cy={p[1]} r={12} fill="none" stroke="rgba(166,16,31,0.5)" strokeWidth={1} />
                )}
                <circle
                  cx={p[0]}
                  cy={p[1]}
                  r={isActive ? 3.4 : 2}
                  fill={isActive ? '#e8e4da' : '#5d5a52'}
                  stroke="#000"
                  strokeWidth={0.8}
                />
                <text
                  x={p[0]}
                  y={p[1] - 12}
                  textAnchor="middle"
                  fontSize={7}
                  fontFamily="IBM Plex Mono, monospace"
                  fill={isActive ? '#e8e4da' : '#77736a'}
                  opacity={isActive ? 1 : 0.5}
                >
                  {SECTIONS[i].num}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
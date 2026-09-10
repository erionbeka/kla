import type { Scene } from '../lib/content'
import { useI18n } from '../lib/i18n'

const W = 1600
const H = 1000

interface Tone {
  bg0: string
  bg1: string
  glow: string
  far: string
  mid: string
  near: string
  ink: string
}

const tone: Tone = {
  bg0: '#1c1916',
  bg1: '#0c0a08',
  glow: 'rgba(236,228,214,0.24)',
  far: '#4f4839',
  mid: '#837761',
  near: '#b9ae95',
  ink: '#0a0a09',
}

function Grain() {
  return (
    <filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" />
      <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.7 0" />
      <feComposite operator="over" in2="SourceGraphic" />
    </filter>
  )
}

function Sky() {
  return (
    <radialGradient id="sky" cx="50%" cy="38%" r="80%">
      <stop offset="0%" stopColor={tone.glow} />
      <stop offset="45%" stopColor={tone.bg0} />
      <stop offset="100%" stopColor={tone.bg1} />
    </radialGradient>
  )
}

function Scratches() {
  const lines = [
    { x1: 200, y1: 40, x2: 620, y2: 46, o: 0.05 },
    { x1: 900, y1: 880, x2: 1380, y2: 872, o: 0.06 },
    { x1: 90, y1: 520, x2: 140, y2: 512, o: 0.07 },
    { x1: 1450, y1: 200, x2: 1500, y2: 210, o: 0.05 },
    { x1: 380, y1: 940, x2: 640, y2: 945, o: 0.04 },
  ]
  return (
    <g stroke="#e8e4da" strokeWidth="1.2" fill="none">
      {lines.map((l, i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} opacity={l.o} />
      ))}
    </g>
  )
}

function Vignette() {
  return (
    <radialGradient id="vig" cx="50%" cy="50%" r="75%">
      <stop offset="62%" stopColor="rgba(0,0,0,0)" />
      <stop offset="100%" stopColor="rgba(0,0,0,0.46)" />
    </radialGradient>
  )
}

function Outline({
  d,
  o = 0.6,
  sw = 2.2,
  fast = false,
}: {
  d: string
  o?: number
  sw?: number
  fast?: boolean
}) {
  return (
    <path d={d} fill="none" stroke="#e8e4da" strokeWidth={sw} opacity={o} className={fast ? 'sk-draw-fast' : 'sk-draw'} />
  )
}

function Mountains({ variant = 1 }: { variant?: number }) {
  const peaks =
    variant === 2
      ? [
          { d: 'M0,660 L260,420 L520,640', o: 0.38 },
          { d: 'M340,660 L600,470 L860,660', o: 0.3 },
          { d: 'M720,660 L1010,390 L1300,660', o: 0.26 },
        ]
      : [
          { d: 'M-50,700 L300,430 L660,700', o: 0.34 },
          { d: 'M480,700 L820,460 L1180,700', o: 0.3 },
          { d: 'M980,700 L1300,500 L1660,700', o: 0.26 },
        ]
  const ridges = variant === 2
    ? ['M0,660 L260,420 L520,640', 'M340,660 L600,470 L860,660', 'M720,660 L1010,390 L1300,660']
    : ['M-50,700 L300,430 L660,700', 'M480,700 L820,460 L1180,700', 'M980,700 L1300,500 L1660,700']
  return (
    <g>
      {peaks.map((p, i) => (
        <path key={i} d={p.d} fill={tone.far} opacity={p.o + (variant === 2 ? i * 0.02 : 0)} />
      ))}
      {ridges.map((d, i) => (
        <Outline key={`r${i}`} d={d} o={0.22 - i * 0.03} sw={1.5} />
      ))}
    </g>
  )
}

function Hills({ y = 720 }: { y?: number }) {
  return (
    <g fill={tone.far}>
      <ellipse cx="200" cy={y + 60} rx="560" ry="300" opacity="0.4" />
      <ellipse cx="1400" cy={y + 90} rx="620" ry="280" opacity="0.34" />
      <ellipse cx="-80" cy={y + 30} rx="420" ry="260" opacity="0.5" />
      <ellipse cx="900" cy={y + 130} rx="700" ry="320" opacity="0.3" />
    </g>
  )
}

function Road({ narrow = false }: { narrow?: boolean }) {
  const right = narrow ? 900 : 760
  return (
    <g>
      <path
        d={`M${(1600 - right) / 2},1000 L${(1600 - right) / 2 + 40},660 L${(1600 + right) / 2 - 40},660 L${(1600 + right) / 2},1000 Z`}
        fill={tone.near}
        opacity="0.5"
      />
      <path d="M0,1000 L800,400 L1600,1000" stroke="#e8e4da" strokeWidth="2" opacity="0.12" fill="none" />
    </g>
  )
}

function Figures({
  n = 6,
  x0 = 300,
  yBase = 820,
  step = 210,
  size = 130,
  opacity = 0.42,
  variant = 1,
}: {
  n?: number
  x0?: number
  yBase?: number
  step?: number
  size?: number
  opacity?: number
  variant?: number
}) {
  const fig = (x: number, y: number, s: number, o: number) => (
    <g opacity={o}>
      <ellipse cx={x} cy={y} rx={s * 0.3} ry={s * 0.34} fill={tone.ink} />
      <path
        d={`M${x - s * 0.24},${y} C${x - s * 0.3},${y + s * 0.5} ${x - s * 0.18},${y + s * 0.62} ${x - s * 0.18},${y + s * 0.8} L${x + s * 0.14},${y + s * 0.8} C${x + s * 0.14},${y + s * 0.5} ${x + s * 0.28},${y + s * 0.34} ${x + s * 0.24},${y} Z`}
        fill={tone.ink}
      />
      {variant === 2 && <ellipse cx={x + s * 0.4} cy={y + s * 0.1} rx={s * 0.1} ry={s * 0.16} fill={tone.ink} />}
      <line x1={x - s * 0.1} y1={y + s * 0.36} x2={x - s * 0.5} y2={y + s * 0.1} stroke={tone.ink} strokeWidth={s * 0.07} strokeLinecap="round" />
      <line x1={x + s * 0.06} y1={y + s * 0.36} x2={x + s * 0.5} y2={y + s * 0.12} stroke={tone.ink} strokeWidth={s * 0.07} strokeLinecap="round" />
    </g>
  )
  const arr = []
  for (let i = 0; i < n; i++) {
    const dx = Math.sin(i * 1.7) * 40
    arr.push(fig(x0 + i * step + dx, yBase - (i % 3) * 24, size * (1 - i * 0.035), opacity * (1 - i * 0.06)))
  }
  return <g className="sk-fig">{arr}</g>
}

function Ruins() {
  return (
    <g>
      <path d="M250,520 L250,330 L390,330 L390,430 L500,430 L500,520 Z" fill={tone.ink} opacity="0.9" />
      <path d="M250,330 L250,260 L430,260 L430,330" fill={tone.mid} opacity="0.5" />
      <path d="M700,560 L700,250 L940,250 L940,380 L1090,380 L1090,560 Z" fill={tone.ink} opacity="0.85" />
      <path d="M770,330 L770,330 Z" />
      <g stroke={tone.near} strokeWidth="2" opacity="0.4">
        <line x1="770" y1="250" x2="770" y2="560" />
        <line x1="870" y1="250" x2="870" y2="560" />
        <line x1="700" y1="330" x2="940" y2="330" />
      </g>
      <path d="M1200,700 L1200,420 L1360,420 L1360,700 Z" fill={tone.ink} opacity="0.9" />
      <path d="M1200,420 L1160,380 L1400,380 L1360,420" fill={tone.mid} opacity="0.55" />
      <ellipse cx="1250" cy="560" rx="60" ry="90" fill="none" stroke={tone.near} strokeWidth="3" opacity="0.5" />
    </g>
  )
}

function Skyline() {
  const blocks = [
    { x: 150, y: 500, w: 120, h: 340, op: 0.85 },
    { x: 310, y: 560, w: 90, h: 280, op: 0.7 },
    { x: 440, y: 620, w: 140, h: 220, op: 0.92 },
    { x: 620, y: 520, w: 100, h: 320, op: 0.66 },
    { x: 760, y: 480, w: 130, h: 360, op: 0.9 },
    { x: 930, y: 600, w: 90, h: 240, op: 0.7 },
    { x: 1060, y: 540, w: 140, h: 300, op: 0.88 },
    { x: 1240, y: 610, w: 110, h: 230, op: 0.72 },
    { x: 1390, y: 520, w: 100, h: 320, op: 0.8 },
  ]
  return (
    <g fill={tone.ink}>
      {blocks.map((b, i) => (
        <g key={i} opacity={b.op}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h} />
          <g stroke={tone.mid} strokeWidth="1.5" opacity="0.7">
            {Array.from({ length: 5 }).map((_, j) => (
              <rect key={j} x={b.x + 12 + j * 20} y={b.y + 22} width="9" height="12" fill={tone.mid} opacity={j % 4 === 0 ? 0.9 : 0.4} />
            ))}
          </g>
        </g>
      ))}
    </g>
  )
}

function Portrait({ side = 'left' }: { side?: 'left' | 'right' }) {
  const cx = side === 'left' ? 640 : 1000
  return (
    <g>
      <ellipse cx={cx} cy={430} rx="200" ry="230" fill={tone.near} opacity="0.5" />
      <path
        d={`M${cx - 240},430 C${cx - 250},${520} ${cx - 130},${600} ${cx - 40},${600} L${cx + 40},${600} C${cx + 130},${600} ${cx + 250},${520} ${cx + 240},430 Z`}
        fill={tone.ink}
        opacity="0.95"
      />
      <path d={`M${cx - 320},840 C${cx - 160},${700} ${cx + 160},${700} ${cx + 320},840 Z`} fill={tone.ink} opacity="0.8" />
      <ellipse cx={cx} cy={430} rx="70" ry="90" fill={tone.bg0} opacity="0.85" />
    </g>
  )
}

function MemorialRows() {
  const markers = []
  for (let r = 0; r < 12; r++) {
    for (let c = 0; c < 9; c++) {
      markers.push({ x: 320 + c * 115, y: 380 + r * 46, v: (r * 7 + c * 13) % 9, o: 0.2 + ((r * 3 + c) % 4) * 0.12 })
    }
  }
  return (
    <g>
      {markers.map((m, i) => (
        <g key={i} opacity={m.o}>
          <rect x={m.x} y={m.y} width="26" height="34" rx="2" fill="none" stroke={tone.near} strokeWidth="2" />
          <line x1={m.x + 13} y1={m.y + 10} x2={m.x + 13} y2={m.y + 22} stroke={tone.near} strokeWidth="2" />
          <line x1={m.x + 7} y1={m.y + 14} x2={m.x + 19} y2={m.y + 14} stroke={tone.near} strokeWidth="2" />
        </g>
      ))}
      <line x1="40" y1="360" x2="1560" y2="360" stroke="#e8e4da" strokeWidth="1" opacity="0.08" />
      <line x1="40" y1="930" x2="1560" y2="930" stroke="#e8e4da" strokeWidth="1" opacity="0.08" />
    </g>
  )
}

function Flag() {
  return (
    <g>
      <path d="M620,240 C620,240 720,180 860,180 C1020,180 1120,240 1120,240 L1120,760 C1120,760 1020,700 860,700 C720,700 620,760 620,760 Z" fill={tone.near} opacity="0.28" />
      <rect x="780" y="250" width="40" height="430" fill="#a6101f" opacity="0.55" />
      <g transform="translate(800,470)" stroke={tone.near} fill="none" strokeWidth="10" opacity="0.5">
        <path d="M0,-70 L46,-20 L90,-70 L90,50 L0,50 Z" />
        <path d="M90,-70 L0,-70 L0,50 L90,50 L90,-20 Z" fill="none" />
      </g>
      <line x1="620" y1="240" x2="1120" y2="240" stroke="#e8e4da" strokeWidth="1.5" opacity="0.14" />
    </g>
  )
}

function Courthouse() {
  return (
    <g>
      <rect x="300" y="360" width="1000" height="520" fill={tone.ink} opacity="0.92" />
      <path d="M260,360 L800,200 L1340,360 Z" fill={tone.mid} opacity="0.55" />
      <g stroke={tone.near} strokeWidth="4" opacity="0.6">
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1={480 + i * 110} y1="360" x2={480 + i * 110} y2="560" />
        ))}
      </g>
      <g stroke={tone.mid} strokeWidth="2.5" opacity="0.8">
        <line x1="350" y1="360" x2="350" y2="880" />
        <line x1="480" y1="360" x2="480" y2="880" />
        <line x1="300" y1="360" x2="1300" y2="360" />
        <line x1="300" y1="880" x2="1300" y2="880" />
      </g>
      <rect x="730" y="600" width="140" height="280" fill={tone.ink} opacity="0.9" />
      <rect x="738" y="610" width="32" height="60" fill={tone.near} opacity="0.5" />
      <path d="M650,560 L950,560 L920,600 L680,600 Z" fill={tone.mid} opacity="0.6" />
    </g>
  )
}

function House() {
  return (
    <g>
      <rect x="520" y="460" width="420" height="420" fill={tone.ink} opacity="0.92" />
      <path d="M470,460 L730,300 L990,460 Z" fill={tone.mid} opacity="0.6" />
      <rect x="640" y="620" width="170" height="260" fill={tone.bg0} opacity="0.9" />
      <rect x="560" y="540" width="90" height="70" fill={tone.near} opacity="0.4" />
      <rect x="810" y="540" width="90" height="70" fill={tone.near} opacity="0.4" />
      <path d="M0,880 C300,840 600,860 900,850" stroke="#e8e4da" strokeWidth="1.5" opacity="0.1" fill="none" />
      <ellipse cx="1210" cy="720" rx="60" ry="60" fill="none" stroke={tone.near} strokeWidth="3" opacity="0.35" />
      <g fill={tone.ink} opacity="0.85">
        <ellipse cx="1180" cy="880" rx="90" ry="26" />
        <rect x="1100" y="740" width="12" height="160" />
        <path d="M1140,740 C1140,620 1260,600 1280,700 L1280,740 Z" />
        <ellipse cx="1280" cy="750" rx="26" ry="40" />
      </g>
    </g>
  )
}

function Hands() {
  return (
    <g>
      <g fill={tone.near} opacity="0.5">
        <ellipse cx="640" cy="500" rx="150" ry="190" />
        <ellipse cx="960" cy="500" rx="150" ry="190" />
      </g>
      <g fill="none" stroke={tone.ink} strokeWidth="18" opacity="0.85">
        <path d="M610,480 C600,420 620,400 660,410 C690,416 700,440 700,470" strokeLinecap="round" />
        <path d="M990,490 C1000,430 980,410 940,420 C910,426 900,450 900,480" strokeLinecap="round" />
        <line x1="700" y1="470" x2="900" y2="480" strokeLinecap="round" />
      </g>
      <g fill={tone.ink} opacity="0.9">
        <ellipse cx="560" cy="880" rx="200" ry="60" />
        <ellipse cx="1040" cy="880" rx="200" ry="60" />
      </g>
    </g>
  )
}

function Paper() {
  return (
    <g>
      <g stroke={tone.bg1} opacity="0.08" strokeWidth="26">
        <line x1="640" y1="150" x2="640" y2="850" />
        <line x1="960" y1="150" x2="960" y2="850" />
      </g>
      <g stroke={tone.near} opacity="0.4">
        <line x1="420" y1="240" x2="1180" y2="240" strokeWidth="5" />
        <line x1="420" y1="240" x2="560" y2="240" strokeWidth="9" stroke={tone.bg1} />
        {Array.from({ length: 14 }).map((_, i) => (
          <line key={i} x1="420" y1={320 + i * 38} x2={i % 3 === 2 ? 760 : 1180 - i * 34} y2={320 + i * 38} strokeWidth="3" />
        ))}
      </g>
      <g stroke="#e8e4da" strokeWidth="2" opacity="0.7">
        <line x1="420" y1="260" x2="420" y2="860" />
        <line x1="420" y1="860" x2="1180" y2="860" />
        <line x1="1180" y1="260" x2="1180" y2="860" />
        <line x1="420" y1="260" x2="1180" y2="260" />
      </g>
    </g>
  )
}

function MicStand() {
  return (
    <g>
      <ellipse cx="1060" cy="880" rx="5" ry="140" fill={tone.ink} />
      <rect x="820" y="880" width="480" height="18" fill={tone.ink} opacity="0.8" />
      <ellipse cx="1060" cy="180" rx="60" ry="90" fill={tone.near} opacity="0.55" />
      <ellipse cx="1060" cy="180" rx="30" ry="70" fill={tone.ink} opacity="0.8" />
      <ellipse cx="1060" cy="250" rx="46" ry="12" fill={tone.ink} opacity="0.7" />
      <line x1="1060" y1="260" x2="1060" y2="740" stroke={tone.ink} strokeWidth="7" opacity="0.8" />
      <g stroke={tone.near} opacity="0.3">
        <line x1="300" y1="420" x2="760" y2="426" strokeWidth="3" />
        <line x1="300" y1="470" x2="720" y2="476" strokeWidth="3" />
        <line x1="300" y1="520" x2="740" y2="526" strokeWidth="3" />
        <line x1="300" y1="570" x2="700" y2="576" strokeWidth="3" />
        <line x1="1340" y1="420" x2="1400" y2="420" strokeWidth="3" />
        <line x1="1340" y1="470" x2="1400" y2="470" strokeWidth="3" />
      </g>
    </g>
  )
}

function GridTable() {
  return (
    <g>
      <g stroke={tone.bg1} opacity="0.09" strokeWidth="28">
        <line x1="440" y1="200" x2="440" y2="820" />
        <line x1="860" y1="200" x2="860" y2="820" />
        <line x1="1280" y1="200" x2="1280" y2="820" />
      </g>
      <g stroke={tone.near} opacity="0.42">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={i} x1="300" y1={240 + i * 72} x2="1400" y2={240 + i * 72} strokeWidth="3" />
        ))}
        <line x1="300" y1="240" x2="300" y2="816" strokeWidth="4" />
        <line x1="1400" y1="240" x2="1400" y2="816" strokeWidth="4" />
      </g>
      <g fill={tone.bg1} opacity="0.55">
        <rect x="320" y="258" width="260" height="30" />
        <rect x="600" y="258" width="180" height="30" />
        <rect x="320" y="330" width="420" height="26" />
        <rect x="320" y="402" width="360" height="26" />
      </g>
      <line x1="900" y1="200" x2="900" y2="820" stroke="#a6101f" strokeWidth="4" opacity="0.45" />
    </g>
  )
}

function Fields() {
  return (
    <g>
      {Array.from({ length: 10 }).map((_, i) => (
        <path
          key={i}
          d={`M${-60 + i * 180},1000 C${300 + i * 120},760 ${900 + i * 80},560 ${1660},340`}
          fill="none"
          stroke={i % 2 ? tone.far : tone.mid}
          strokeWidth="26"
          opacity="0.5"
        />
      ))}
      <g fill={tone.ink} opacity="0.9">
        <rect x="1180" y="520" width="240" height="180" />
        <path d="M1150,520 L1400,520 L1350,430 L1200,430 Z" />
      </g>
      <ellipse cx="300" cy="120" rx="14" ry="14" fill="#e8e4da" opacity="0.25" />
    </g>
  )
}

function ReturnScene() {
  return (
    <g>
      <ellipse cx="1120" cy="330" rx="260" ry="180" fill="#e8e4da" opacity="0.09" />
      <g fill={tone.ink} opacity="0.95">
        <path d="M0,880 C400,700 500,760 780,820" fill="none" stroke={tone.far} strokeWidth="2" opacity="0.4" />
        <ellipse cx="700" cy="700" rx="70" ry="80" />
        <path d="M560,700 C530,760 540,820 560,860 L840,860 C860,820 870,760 840,700 Z" />
        <line x1="660" y1="800" x2="620" y2="920" strokeWidth="16" strokeLinecap="round" />
        <line x1="740" y1="800" x2="780" y2="920" strokeWidth="16" strokeLinecap="round" />
      </g>
      <ellipse cx="1120" cy="330" rx="70" ry="70" fill="#e8e4da" opacity="0.35" />
      <path d="M1120,260 L1120,400" stroke="#e8e4da" strokeWidth="1" opacity="0.15" />
    </g>
  )
}

function BonfireScene() {
  return (
    <g>
      <g fill={tone.ink} opacity="0.82">
        <ellipse cx="400" cy="930" rx="520" ry="90" />
        <ellipse cx="1260" cy="950" rx="440" ry="80" />
      </g>
      <g fill={tone.ink} opacity="0.35">
        <path d="M760,320 C820,140 980,140 1040,320 C980,240 820,240 760,320 Z" />
      </g>
      <g className="sk-flick">
        {[['#f6c177', 1], ['#e17b3a', 0.9], ['#a6101f', 0.75]].map(([c, o], i) => (
          <path
            key={i}
            d={`M${800 + i * 28},800 C${780 + i * 22},640 ${900 + i * 10},540 ${840 + i * 26},420 C${920 + i * 14},540 ${980 + i * 6},640 ${880 + i * 26},800 Z`}
            fill={c as string}
            opacity={o as number}
          />
        ))}
      </g>
      <g fill={tone.ink} opacity="0.9">
        {[700, 820, 940].map((x) => (
          <g key={x}>
            <ellipse cx={x} cy={840} rx="34" ry="11" />
            <rect x={x - 7} y={520} width="14" height="330" />
          </g>
        ))}
      </g>
      <Figures n={4} x0={300} yBase={900} step={240} size={120} opacity={0.3} />
      <g stroke="#e8e4da" strokeWidth="1" opacity="0.2">
        <ellipse cx="820" cy="420" rx="52" ry="70" fill="#e8e4da" opacity="0.06" />
        <line x1="820" y1="350" x2="820" y2="490" />
      </g>
    </g>
  )
}

function VigilScene() {
  const rows = [840, 780, 720]
  return (
    <g>
      <rect x="0" y="640" width="1600" height="360" fill={tone.bg1} opacity="0.4" />
      {rows.map((y, r) => (
        <g key={r}>
          {Array.from({ length: 11 }).map((_, i) => (
            <g key={i} opacity={1 - r * 0.16}>
              <rect x={140 + i * 145} y={y} width="52" height="9" fill={tone.ink} opacity="0.95" />
              <rect x={140 + i * 145 + 22} y={y - 26} width="8" height="26" fill={tone.near} opacity="0.8" />
              <g className="sk-flick" opacity="0.95">
              <ellipse
                cx={140 + i * 145 + 26}
                cy={y - 30}
                rx="9"
                ry="14"
                fill={i % 3 === 0 ? '#f6c177' : '#e17b3a'}
              />
              <ellipse cx={140 + i * 145 + 26} cy={y - 33} rx="5" ry="9" fill="#ffead2" />
            </g>
            </g>
          ))}
        </g>
      ))}
      <g fill={tone.ink} opacity="0.6">
        {rows.map((y) => (
          <ellipse key={y} cx="800" cy={y + 30} rx="700" ry="26" />
        ))}
      </g>
      <rect x="0" y="0" width="1600" height="140" fill={tone.bg1} opacity="0.55" />
      <g stroke="#e8e4da" strokeWidth="2" opacity="0.14">
        <line x1="0" y1="640" x2="1600" y2="640" />
        <line x1="0" y1="640" x2="1600" y2="640" transform="translate(0,0)" />
      </g>
    </g>
  )
}

function ConvoiScene() {
  return (
    <g>
      <ellipse cx="800" cy="250" rx="220" ry="120" fill="#e8e4da" opacity="0.1" />
      <g fill={tone.ink} opacity="0.85">
        <ellipse cx="800" cy="1000" rx="900" ry="120" />
      </g>
      <g>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const x = 220 + i * 190
          const lean = (i % 2 ? -1 : 1) * 14
          return (
            <g key={i} opacity={0.5 - i * 0.04}>
              <ellipse cx={x} cy={860} rx="60" ry="130" fill={tone.ink} />
              <ellipse cx={x} cy={690 + i * 4} rx="34" ry="46" fill={tone.near} opacity="0.6" />
              <line x1={x} y1="760" x2={x + lean} y2="610" stroke={tone.ink} strokeWidth="13" strokeLinecap="round" />
              <line x1={x + lean} y1="660" x2={x + 40} y2="620" stroke={tone.ink} strokeWidth="9" strokeLinecap="round" />
              <rect x={x - 46} y={740} width="92" height="120" fill={tone.near} opacity="0.35" />
            </g>
          )
        })}
      </g>
      <path d="M0,980 C300,900 600,930 900,920" stroke={tone.far} strokeWidth="2" fill="none" opacity="0.4" />
    </g>
  )
}

function RefugeScene() {
  return (
    <g>
      <Road narrow />
      <Figures n={7} x0={160} yBase={870} step={230} size={150} opacity={0.5} />
      <g fill={tone.ink} opacity="0.7">
        <rect x="250" y="330" width="90" height="70" />
        <rect x="440" y="360" width="90" height="70" />
        <rect x="1250" y="340" width="90" height="70" />
      </g>
      <path d="M120,1000 L400,700 L1200,780 L1500,680" stroke={tone.far} strokeWidth="2" fill="none" opacity="0.4" />
    </g>
  )
}

function scarf(scene: Scene) {
  switch (scene.kind) {
    case 'landscape':
      return (
        <>
          <Mountains variant={1} />
          <Hills y={820} />
        </>
      )
    case 'hills':
      return (
        <>
          <Mountains variant={2} />
          <Hills y={860} />
          <path d="M0,950 C500,900 1100,920 1600,880" stroke="#e8e4da" strokeWidth="1.5" opacity="0.12" fill="none" />
        </>
      )
    case 'road':
      return (
        <>
          <Mountains variant={2} />
          <Road />
          <Figures n={5} x0={280} yBase={860} step={240} size={140} opacity={0.45} />
        </>
      )
    case 'crowd':
      return (
        <>
          <g fill={tone.ink}>
            <ellipse cx="400" cy="720" rx="380" ry="110" opacity="0.9" />
            <ellipse cx="900" cy="760" rx="450" ry="130" opacity="0.85" />
            <ellipse cx="1350" cy="710" rx="320" ry="100" opacity="0.92" />
          </g>
          <Figures n={9} x0={120} yBase={640} step={180} size={100} opacity={0.4} />
          {/* raised fists — sketched in */}
          <g stroke="#e8e4da" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.4" className="sk-draw-fast">
            {[
              { x: 210, y: 690, t: 1 },
              { x: 520, y: 720, t: -1 },
              { x: 800, y: 672, t: 1 },
              { x: 1100, y: 706, t: -1 },
            ].map((a, i) => (
              <g key={i}>
                <path d={`M${a.x},${a.y} L${a.x + a.t * 20},${a.y - 64}`} />
                <circle cx={a.x + a.t * 20} cy={a.y - 60} r="11" fill="#e8e4da" stroke="none" opacity="0.5" />
              </g>
            ))}
          </g>
          {/* banner */}
          <g stroke="#e8e4da" fill="none" opacity="0.55" className="sk-draw-fast">
            <line x1="1180" y1="250" x2="1180" y2="440" strokeWidth="5" />
            <path d="M1180,286 L1372,286 L1372,352 L1180,352 Z" strokeWidth="3" />
          </g>
          <text
            x="1276"
            y="330"
            textAnchor="middle"
            fontSize="30"
            fontFamily="IBM Plex Mono, monospace"
            fill="#e8e4da"
            opacity="0.55"
            letterSpacing="0.3em"
          >
            LIRI
          </text>
          <line x1="80" y1="260" x2="1520" y2="260" stroke="#e8e4da" strokeWidth="1" opacity="0.1" />
        </>
      )
    case 'refugee':
      return <RefugeScene />
    case 'bonfire':
      return (
        <>
          <Mountains variant={2} />
          <BonfireScene />
        </>
      )
    case 'vigil':
      return <VigilScene />
    case 'convoi':
      return (
        <>
          <Hills y={860} />
          <ConvoiScene />
        </>
      )
    case 'ruins':
      return (
        <>
          <Mountains variant={1} />
          <Ruins />
        </>
      )
    case 'return':
      return <ReturnScene />
    case 'city':
      return (
        <>
          <Skyline />
          <g stroke="#e8e4da" strokeWidth="1.5">
            <line x1="0" y1="880" x2="1600" y2="880" opacity="0.2" />
          </g>
        </>
      )
    case 'portrait':
      return <Portrait side="left" />
    case 'memorial':
      return <MemorialRows />
    case 'flag':
      return (
        <>
          <Flag />
          <Outline
            d="M620,240 C620,240 720,180 860,180 C1020,180 1120,240 1120,240 L1120,760 C1120,760 1020,700 860,700 C720,700 620,760 620,760 Z"
            o={0.4}
            sw={2.5}
            fast
          />
        </>
      )
    case 'court':
      return (
        <>
          <Courthouse />
          <Outline d="M260,360 L800,200 L1340,360 Z" o={0.35} sw={2.5} />
          <Outline d="M300,360 L1300,360 L1300,880 L300,880 Z" o={0.2} sw={1.5} />
          <Figures n={3} x0={560} yBase={680} step={260} size={120} opacity={0.28} variant={2} />
        </>
      )
    case 'fields':
      return (
        <>
          <Mountains variant={1} />
          <Fields />
        </>
      )
    case 'house':
      return (
        <>
          <House />
          <Outline d="M470,460 L730,300 L990,460 Z" o={0.3} sw={2.5} fast />
          <Outline d="M520,460 L520,880 L940,880 L940,460 Z" o={0.18} sw={1.5} />
        </>
      )
    case 'hands':
      return <Hands />
    case 'paper':
      return <Paper />
    case 'mic':
      return <MicStand />
    case 'grid':
      return <GridTable />
    case 'scales':
      return (
        <>
          <g stroke="#e8e4da" fill="none" opacity="0.65" className="sk-draw">
            <path d="M800,500 L800,760" strokeWidth="9" />
            <path d="M735,760 L865,760" strokeWidth="7" />
            <line x1="800" y1="470" x2="800" y2="500" strokeWidth="5" />
          </g>
          <g stroke="#e8e4da" fill="none" className="sk-balance" opacity="0.85">
            <line x1="690" y1="316" x2="910" y2="316" strokeWidth="6" />
            <line x1="706" y1="316" x2="706" y2="420" strokeWidth="3" />
            <line x1="894" y1="316" x2="894" y2="420" strokeWidth="3" />
            <path d="M648,452 Q706,430 770,452" strokeWidth="6" />
            <path d="M830,452 Q894,430 952,452" strokeWidth="6" />
          </g>
          <circle cx="800" cy="316" r="10" fill="#e8e4da" opacity="0.5" />
          <g stroke="#e8e4da" strokeWidth="3" opacity="0.35" className="sk-draw-fast">
            <line x1="690" y1="452" x2="706" y2="452" />
            <line x1="770" y1="452" x2="800" y2="452" />
            <line x1="800" y1="452" x2="830" y2="452" />
            <line x1="894" y1="452" x2="952" y2="452" />
          </g>
          <Outline d="M0,880 C400,840 1200,840 1600,880" o={0.2} sw={1.5} fast />
        </>
      )
    case 'candle':
      return (
        <g>
          <Outline d="M720,520 L720,320 L880,320 L880,520 Z" o={0.28} sw={2} fast />
          <ellipse cx="800" cy="520" rx="180" ry="16" fill={tone.ink} opacity="0.6" />
          <g className="sk-float">
            <ellipse cx="720" cy="480" rx="16" ry="7" fill={tone.near} opacity="0.5" />
            <rect x="712" y="410" width="16" height="76" fill="none" stroke="#e8e4da" strokeWidth="3" opacity="0.5" />
            <g className="sk-flick" fill="#f6c177">
              <ellipse cx="720" cy="398" rx="7" ry="22" />
              <ellipse cx="720" cy="400" rx="4" ry="15" fill="#ffead2" />
            </g>
          </g>
          <g className="sk-float">
            <ellipse cx="880" cy="496" rx="16" ry="7" fill={tone.near} opacity="0.5" />
            <rect x="872" y="430" width="16" height="72" fill="none" stroke="#e8e4da" strokeWidth="3" opacity="0.45" />
            <g className="sk-flick" fill="#e17b3a">
              <ellipse cx="880" cy="418" rx="7" ry="22" />
              <ellipse cx="880" cy="420" rx="4" ry="15" fill="#ffead2" />
            </g>
          </g>
          <ellipse cx="800" cy="520" rx="240" ry="30" fill="none" stroke="#e8e4da" strokeWidth="1.5" opacity="0.14" className="sk-draw" />
        </g>
      )
    default:
      return (
        <>
          <Outline d="M0,760 C400,710 500,740 900,720 C1200,705 1400,730 1600,720" o={0.3} sw={1.5} fast />
          <g className="sk-flick" fill="#e8e4da" opacity="0.4">
            <circle cx="800" cy="420" r="8" />
          </g>
          <line x1="0" y1="880" x2="1600" y2="880" stroke="#e8e4da" strokeWidth="1" opacity="0.1" />
        </>
      )
  }
}

export function ArchiveScene({ scene, className = '' }: { scene: Scene; className?: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <defs>
        <Sky />
        <Vignette />
        <Grain />
      </defs>
      <rect width={W} height={H} fill={tone.bg0} />
      <rect width={W} height={H} fill="url(#sky)" />
      {scarf(scene)}
      <Scratches />
      <rect width={W} height={H} fill="url(#vig)" />
      <g filter="url(#grain)">
        <rect width={W} height={H} fill="rgba(232,228,218,0.045)" />
      </g>
    </svg>
  )
}

export function PhotoMeta({ scene, className = '' }: { scene: Scene; className?: string }) {
  const { t } = useI18n()
  if (scene.placeholder || !scene.source.sq) return null
  return (
    <div className={`pointer-events-none select-none ${className}`}>
      <div className="flex items-start justify-between gap-6 font-mono text-[9px] tracking-[0.22em] uppercase text-bone/45">
        <span className="max-w-[70%]">{t(scene.label)}</span>
      </div>
      <div className="mt-2 font-mono text-[9px] tracking-[0.18em] uppercase text-fog/50">{t(scene.source)}</div>
    </div>
  )
}
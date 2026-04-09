import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const CX = 250, CY = 350

const NODES = [
  { name: 'RAGE',  cx: 370, cy: 210, active: true  },
  { name: 'BATA',  cx: 430, cy: 360, active: false },
  { name: 'PULSE', cx: 310, cy: 510, active: false },
  { name: 'VAULT', cx: 130, cy: 420, active: false },
]

export default function HeroVisual({ play }) {
  const svgRef       = useRef(null)
  const coreRef      = useRef(null)
  const glowRef      = useRef(null)
  const orbit1Ref    = useRef(null)
  const orbit2Ref    = useRef(null)
  const outerRingRef = useRef(null)
  const nodeRefs     = useRef([])
  const lineRefs     = useRef([])
  const played       = useRef(false)

  useEffect(() => {
    if (!play || played.current) return
    played.current = true

    const svg   = svgRef.current
    const o1    = orbit1Ref.current
    const o2    = orbit2Ref.current
    const outer = outerRingRef.current
    const nodes = nodeRefs.current.filter(Boolean)
    const lines = lineRefs.current.filter(Boolean)

    // safe length helper (ellipse may not support getTotalLength in all browsers)
    const len = (el) => {
      try { return el.getTotalLength() } catch { return 1000 }
    }

    const o1L = len(o1)
    const o2L = len(o2)

    // Initial state
    gsap.set(svg,  { opacity: 0 })
    gsap.set(o1,   { strokeDasharray: o1L, strokeDashoffset: o1L })
    gsap.set(o2,   { strokeDasharray: o2L, strokeDashoffset: o2L })
    gsap.set(coreRef.current, { scale: 0.5, opacity: 0, svgOrigin: `${CX} ${CY}` })
    gsap.set(glowRef.current, { scale: 0.2, opacity: 0, svgOrigin: `${CX} ${CY}` })

    nodes.forEach((node, i) => {
      const n = NODES[i]
      gsap.set(node, { scale: 0, opacity: 0, svgOrigin: `${n.cx} ${n.cy}` })
    })

    lines.forEach(line => {
      const l = len(line)
      gsap.set(line, { strokeDasharray: l, strokeDashoffset: l })
    })

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl
      .to(svg,              { opacity: 1, duration: 0.5 })
      .to(glowRef.current,  { scale: 1, opacity: 1, duration: 1.6, ease: 'power2.out' }, '-=0.3')
      .to(coreRef.current,  { scale: 1, opacity: 1, duration: 1.0, ease: 'back.out(1.6)' }, '-=1.2')
      .to(o1,               { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut' }, '-=0.8')
      .to(o2,               { strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut' }, '-=1.6')
      .to(lines,            { strokeDashoffset: 0, stagger: 0.1, duration: 0.7 },         '-=1.6')
      .to(nodes,            { scale: 1, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'back.out(2)' }, '-=1.0')

    // Pulse RAGE node forever
    if (nodes[0]) {
      gsap.to(nodes[0], {
        scale: 1.22,
        svgOrigin: `${NODES[0].cx} ${NODES[0].cy}`,
        repeat: -1, yoyo: true,
        duration: 1.1, ease: 'sine.inOut',
        delay: 2.5,
      })
    }

    // Slow rotations
    gsap.to(outer, { rotation: 360, svgOrigin: `${CX} ${CY}`, duration: 45, ease: 'none', repeat: -1 })
    gsap.to(o1,    { rotation: -360, svgOrigin: `${CX} ${CY}`, duration: 28, ease: 'none', repeat: -1 })

  }, [play])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 500 700"
      preserveAspectRatio="xMidYMid slice"
      className="hero-visual-svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#ff4500" stopOpacity="0.4"  />
          <stop offset="50%"  stopColor="#ff4500" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#ff4500" stopOpacity="0"    />
        </radialGradient>
        <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#ff4500" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#ff4500" stopOpacity="0"    />
        </radialGradient>
        <filter id="rage-glow">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <pattern id="pg" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M30 0L0 0L0 30" fill="none" stroke="rgba(240,240,238,0.035)" strokeWidth="0.5"/>
        </pattern>
      </defs>

      {/* Grid */}
      <rect width="500" height="700" fill="url(#pg)" />

      {/* Ambient glow */}
      <circle ref={glowRef} cx={CX} cy={CY} r={210} fill="url(#glowGrad)" />

      {/* Slow outer dashed ring */}
      <circle
        ref={outerRingRef}
        cx={CX} cy={CY} r={200}
        fill="none"
        stroke="rgba(255,69,0,0.07)"
        strokeWidth="1"
        strokeDasharray="3 14"
      />

      {/* Orbit 1 */}
      <ellipse
        ref={orbit1Ref}
        cx={CX} cy={CY} rx={158} ry={85}
        fill="none"
        stroke="rgba(255,69,0,0.2)"
        strokeWidth="0.8"
        transform={`rotate(-25, ${CX}, ${CY})`}
      />

      {/* Orbit 2 */}
      <ellipse
        ref={orbit2Ref}
        cx={CX} cy={CY} rx={215} ry={118}
        fill="none"
        stroke="rgba(240,240,238,0.07)"
        strokeWidth="0.6"
        transform={`rotate(12, ${CX}, ${CY})`}
      />

      {/* Connector lines */}
      {NODES.map((n, i) => (
        <line
          key={n.name}
          ref={el => lineRefs.current[i] = el}
          x1={CX} y1={CY} x2={n.cx} y2={n.cy}
          stroke={n.active ? 'rgba(255,69,0,0.22)' : 'rgba(240,240,238,0.06)'}
          strokeWidth="0.8"
          strokeDasharray="3 7"
        />
      ))}

      {/* Core area */}
      <circle cx={CX} cy={CY} r={95} fill="url(#coreGrad)" />
      <circle
        ref={coreRef}
        cx={CX} cy={CY} r={74}
        fill="none"
        stroke="rgba(255,69,0,0.5)"
        strokeWidth="1.2"
      />
      <circle cx={CX} cy={CY} r={20} fill="#ff4500" fillOpacity="0.12" />
      <circle cx={CX} cy={CY} r={7}  fill="#ff4500" fillOpacity="0.75" />

      {/* Core label */}
      <text
        x={CX} y={CY + 2}
        textAnchor="middle" dominantBaseline="middle"
        fontFamily="'Space Mono', monospace"
        fontSize="5" letterSpacing="2"
        fill="rgba(255,69,0,0.85)"
      >HKM</text>

      {/* Arc text */}
      <path id="arc" d={`M ${CX},${CY - 98} a 98,98 0 1,1 -0.01,0`} fill="none" />
      <text fontFamily="'Space Mono', monospace" fontSize="4.8" fill="rgba(240,240,238,0.15)" letterSpacing="3.5">
        <textPath href="#arc">
          HKM · GATEWAY · PARENT PROTOCOL · ONE COIN · INFINITE PLATFORMS ·
        </textPath>
      </text>

      {/* Platform nodes */}
      {NODES.map((n, i) => (
        <g
          key={n.name}
          ref={el => nodeRefs.current[i] = el}
          filter={n.active ? 'url(#rage-glow)' : undefined}
        >
          <circle
            cx={n.cx} cy={n.cy} r={24}
            fill="none"
            stroke={n.active ? 'rgba(255,69,0,0.35)' : 'rgba(240,240,238,0.08)'}
            strokeWidth="0.8"
            strokeDasharray={n.active ? undefined : '3 5'}
          />
          <circle
            cx={n.cx} cy={n.cy} r={14}
            fill={n.active ? 'rgba(255,69,0,0.14)' : 'rgba(240,240,238,0.02)'}
            stroke={n.active ? 'rgba(255,69,0,0.55)' : 'rgba(240,240,238,0.12)'}
            strokeWidth="0.8"
          />
          <circle cx={n.cx} cy={n.cy} r={3.5}
            fill={n.active ? '#ff4500' : 'rgba(240,240,238,0.25)'} />
          <text
            x={n.cx} y={n.cy + 32}
            textAnchor="middle"
            fontFamily="'Space Mono', monospace"
            fontSize="7" letterSpacing="1.5"
            fill={n.active ? 'rgba(255,69,0,0.85)' : 'rgba(240,240,238,0.25)'}
          >{n.name}</text>
        </g>
      ))}
    </svg>
  )
}

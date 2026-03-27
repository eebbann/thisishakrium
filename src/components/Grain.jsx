export default function Grain() {
  return (
    <>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div style={styles.grain} />
    </>
  )
}

const styles = {
  grain: {
    position: 'fixed',
    inset: '-200%',
    width: '400%',
    height: '400%',
    filter: 'url(#grain-filter)',
    opacity: 0.055,
    pointerEvents: 'none',
    zIndex: 1,
    animation: 'grainShift 0.12s steps(1) infinite',
  },
}

// inject keyframes once
if (typeof document !== 'undefined') {
  const id = 'grain-keyframes'
  if (!document.getElementById(id)) {
    const style = document.createElement('style')
    style.id = id
    style.textContent = `
      @keyframes grainShift {
        0%   { transform: translate(0, 0); }
        10%  { transform: translate(-3%, -4%); }
        20%  { transform: translate(-6%,  3%); }
        30%  { transform: translate(4%,  -2%); }
        40%  { transform: translate(-3%,  6%); }
        50%  { transform: translate(5%,  -4%); }
        60%  { transform: translate(-4%,  3%); }
        70%  { transform: translate(2%,  -5%); }
        80%  { transform: translate(-5%,  2%); }
        90%  { transform: translate(4%,   4%); }
        100% { transform: translate(-2%, -3%); }
      }
    `
    document.head.appendChild(style)
  }
}

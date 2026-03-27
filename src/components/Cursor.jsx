import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current

    const xTo = gsap.quickTo(ring, 'x', { duration: 0.6, ease: 'power3.out' })
    const yTo = gsap.quickTo(ring, 'y', { duration: 0.6, ease: 'power3.out' })

    const move = (e) => {
      gsap.set(dot,  { x: e.clientX, y: e.clientY })
      xTo(e.clientX)
      yTo(e.clientY)
    }

    const enter = () => gsap.to(ring, { scale: 1.6, duration: 0.3 })
    const leave = () => gsap.to(ring, { scale: 1,   duration: 0.3 })

    window.addEventListener('mousemove', move)
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
    })

    return () => {
      window.removeEventListener('mousemove', move)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  style={styles.dot}  />
      <div ref={ringRef} style={styles.ring} />
    </>
  )
}

const styles = {
  dot: {
    position: 'fixed',
    top: -4, left: -4,
    width: 8, height: 8,
    borderRadius: '50%',
    background: '#ff4500',
    pointerEvents: 'none',
    zIndex: 9999,
    translateX: '-50%',
    translateY: '-50%',
  },
  ring: {
    position: 'fixed',
    top: -18, left: -18,
    width: 36, height: 36,
    borderRadius: '50%',
    border: '1px solid rgba(232,213,176,0.45)',
    pointerEvents: 'none',
    zIndex: 9998,
  },
}

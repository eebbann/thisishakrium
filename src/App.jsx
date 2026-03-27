import { useState } from 'react'
import Cursor    from './components/Cursor'
import Grain     from './components/Grain'
import Particles from './components/Particles'
import Preloader from './components/Preloader'
import Scene     from './components/Scene'

export default function App() {
  const [preloadDone, setPreloadDone] = useState(false)

  return (
    <>
      <Cursor />
      <Grain />
      <Particles active={preloadDone} />
      {!preloadDone && <Preloader onComplete={() => setPreloadDone(true)} />}
      <Scene play={preloadDone} />
    </>
  )
}

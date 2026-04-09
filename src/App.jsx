import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Cursor    from './components/Cursor'
import Grain     from './components/Grain'
import Particles from './components/Particles'
import Preloader from './components/Preloader'

import Landing   from './pages/Landing'
import Login     from './pages/Login'
import Ecosystem from './pages/Ecosystem'
import HKM       from './pages/HKM'
import DAO       from './pages/DAO'
import Discover  from './pages/Discover'
import Wallet    from './pages/Wallet'
import Builders  from './pages/Builders'
import Profile   from './pages/Profile'

export default function App() {
  const [preloadDone, setPreloadDone] = useState(false)

  return (
    <AuthProvider>
      <BrowserRouter>
        <Cursor />
        <Grain />
        {!preloadDone && <Preloader onComplete={() => setPreloadDone(true)} />}
        <Routes>
          <Route path="/" element={
            <>
              <Particles active={preloadDone} />
              <Landing play={preloadDone} />
            </>
          } />
          <Route path="/login"      element={<Login />} />
          <Route path="/join"       element={<Navigate to="/login?tab=join" replace />} />
          <Route path="/restore"    element={<Navigate to="/login?tab=restore" replace />} />
          <Route path="/ecosystem"  element={<Ecosystem />} />
          <Route path="/hkm"        element={<HKM />} />
          <Route path="/dao"        element={<DAO />} />
          <Route path="/discover"   element={<Discover />} />
          <Route path="/wallet"     element={<Wallet />} />
          <Route path="/builders"   element={<Builders />} />
          <Route path="/@:alias"    element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

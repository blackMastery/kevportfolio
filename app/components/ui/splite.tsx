import { Suspense, lazy, useEffect, useState } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

function scheduleIdleWork(callback: () => void) {
  if (typeof window === 'undefined') {
    return () => {}
  }

  if ('requestIdleCallback' in window) {
    const id = window.requestIdleCallback(callback, { timeout: 2000 })
    return () => window.cancelIdleCallback(id)
  }

  const timeoutId = setTimeout(callback, 300)
  return () => clearTimeout(timeoutId)
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  // Remix renders on the server; the Spline runtime relies on browser APIs,
  // so only mount it on the client after higher-priority work finishes.
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    return scheduleIdleWork(() => setMounted(true))
  }, [])

  if (!mounted) {
    return <div className={className} aria-hidden="true" />
  }

  return (
    <Suspense fallback={<div className={className} aria-hidden="true" />}>
      <Spline scene={scene} className={className} />
    </Suspense>
  )
}

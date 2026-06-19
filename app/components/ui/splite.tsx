import { Suspense, lazy, useEffect, useState } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  // Remix renders on the server; the Spline runtime relies on browser APIs,
  // so only mount it on the client (mirrors ParticlesBackground.tsx).
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const fallback = (
    <div className="w-full h-full flex items-center justify-center">
      <span className="loader"></span>
    </div>
  )

  if (!mounted) {
    return fallback
  }

  return (
    <Suspense fallback={fallback}>
      <Spline
        scene={scene}
        className={className}
      />
    </Suspense>
  )
}

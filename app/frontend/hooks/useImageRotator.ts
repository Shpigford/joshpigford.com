import { useCallback, useEffect, useState } from 'react'

// Rotates through images every second, pausing while the container is hovered.
export function useImageRotator(count: number) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || count < 2) return
    const interval = setInterval(() => {
      setCurrentIndex((index) => (index + 1) % count)
    }, 1000)
    return () => clearInterval(interval)
  }, [paused, count])

  const pause = useCallback(() => setPaused(true), [])
  const resume = useCallback(() => setPaused(false), [])
  const show = useCallback((index: number) => setCurrentIndex(index), [])

  return { currentIndex, paused, pause, resume, show }
}

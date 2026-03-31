import { useEffect, useRef, useState } from 'react'

const TRIGGER_THRESHOLD = 64 // px (after applying 0.5 damping factor)

export function usePullToRefresh(onRefresh: () => Promise<void> | void) {
  const [pullY, setPullY] = useState(0)
  const [refreshing, setRefreshing] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const refreshingRef = useRef(false)
  const activeRef = useRef(false)
  const startYRef = useRef(0)
  const currentYRef = useRef(0)
  const onRefreshRef = useRef(onRefresh)
  onRefreshRef.current = onRefresh

  useEffect(() => {
    // Find nearest scrollable ancestor
    let scrollEl: HTMLElement | null = containerRef.current
    while (scrollEl) {
      const { overflowY } = window.getComputedStyle(scrollEl)
      if (overflowY === 'auto' || overflowY === 'scroll') break
      scrollEl = scrollEl.parentElement
    }
    if (!scrollEl) return

    const handleTouchStart = (e: TouchEvent) => {
      if (scrollEl!.scrollTop <= 0 && !refreshingRef.current) {
        activeRef.current = true
        startYRef.current = e.touches[0].clientY
        currentYRef.current = e.touches[0].clientY
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!activeRef.current) return
      currentYRef.current = e.touches[0].clientY
      const dy = currentYRef.current - startYRef.current

      if (scrollEl!.scrollTop > 0 || dy <= 0) {
        activeRef.current = false
        setPullY(0)
        return
      }

      e.preventDefault()
      setPullY(Math.min(dy * 0.5, TRIGGER_THRESHOLD + 20))
    }

    const handleTouchEnd = async () => {
      if (!activeRef.current) return
      activeRef.current = false
      const dy = currentYRef.current - startYRef.current
      setPullY(0)

      if (dy * 0.5 >= TRIGGER_THRESHOLD) {
        refreshingRef.current = true
        setRefreshing(true)
        try {
          await onRefreshRef.current()
        } finally {
          refreshingRef.current = false
          setRefreshing(false)
        }
      }
    }

    scrollEl.addEventListener('touchstart', handleTouchStart, { passive: true })
    scrollEl.addEventListener('touchmove', handleTouchMove, { passive: false })
    scrollEl.addEventListener('touchend', handleTouchEnd)

    return () => {
      scrollEl!.removeEventListener('touchstart', handleTouchStart)
      scrollEl!.removeEventListener('touchmove', handleTouchMove)
      scrollEl!.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  return { containerRef, pullY, refreshing, threshold: TRIGGER_THRESHOLD }
}

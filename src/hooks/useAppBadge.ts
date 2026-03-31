import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'foodsocial_badge_count'

function readCount(): number {
  return parseInt(localStorage.getItem(STORAGE_KEY) ?? '0', 10) || 0
}

function writeCount(n: number) {
  localStorage.setItem(STORAGE_KEY, String(n))
}

async function setBadge(count: number) {
  if ('setAppBadge' in navigator) {
    if (count > 0) {
      await (navigator as Navigator & { setAppBadge: (n: number) => Promise<void> }).setAppBadge(count)
    } else {
      await (navigator as Navigator & { clearAppBadge: () => Promise<void> }).clearAppBadge?.()
    }
  }
}

export function useAppBadge() {
  const [badgeCount, setBadgeCount] = useState(readCount)

  // Sync badge on mount and clear when app is focused
  useEffect(() => {
    const clearBadge = () => {
      writeCount(0)
      setBadgeCount(0)
      setBadge(0)
    }
    // Clear when app gains focus (user opened the app)
    window.addEventListener('focus', clearBadge)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') clearBadge()
    })
    // Clear on mount since app is now open
    clearBadge()

    return () => {
      window.removeEventListener('focus', clearBadge)
    }
  }, [])

  // Listen for BADGE_INCREMENT messages from the service worker
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'BADGE_INCREMENT') {
        const next = readCount() + 1
        writeCount(next)
        setBadgeCount(next)
        setBadge(next)
      }
    }
    navigator.serviceWorker?.addEventListener('message', handleMessage)
    return () => navigator.serviceWorker?.removeEventListener('message', handleMessage)
  }, [])

  const increment = useCallback(() => {
    const next = readCount() + 1
    writeCount(next)
    setBadgeCount(next)
    setBadge(next)
  }, [])

  const clear = useCallback(() => {
    writeCount(0)
    setBadgeCount(0)
    setBadge(0)
  }, [])

  return { badgeCount, increment, clear }
}

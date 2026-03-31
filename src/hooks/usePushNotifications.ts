import { useCallback, useEffect, useState } from 'react'

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY as string

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)))
}

export type PushState = 'unsupported' | 'default' | 'subscribed' | 'denied'

export function usePushNotifications() {
  const [state, setState] = useState<PushState>('default')
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)

  // Check existing subscription on mount
  useEffect(() => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      setState('unsupported')
      return
    }
    if (Notification.permission === 'denied') {
      setState('denied')
      return
    }
    navigator.serviceWorker.ready.then(reg => {
      reg.pushManager.getSubscription().then(sub => {
        if (sub) {
          setSubscription(sub)
          setState('subscribed')
        }
      })
    })
  }, [])

  const subscribe = useCallback(async () => {
    try {
      const reg = await navigator.serviceWorker.ready
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      })
      setSubscription(sub)
      setState('subscribed')
      // Save subscription so it can be retrieved for send-notification.mjs
      const json = JSON.stringify(sub)
      localStorage.setItem('push_subscription', json)
      console.log('%c[FoodSocial] Push subscription saved to localStorage.\nRun this in the console to get it:\n  copy(localStorage.getItem("push_subscription"))\nThen save it to subscription.json and run:\n  node send-notification.mjs', 'color: #DE6543; font-weight: bold')
      return sub
    } catch {
      if (Notification.permission === 'denied') setState('denied')
      return null
    }
  }, [])

  const unsubscribe = useCallback(async () => {
    if (subscription) {
      await subscription.unsubscribe()
      setSubscription(null)
      setState('default')
    }
  }, [subscription])

  return { state, subscription, subscribe, unsubscribe }
}

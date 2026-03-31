/// <reference lib="webworker" />

import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'

declare const self: ServiceWorkerGlobalScope & {
  __WB_MANIFEST: Array<{ url: string; revision: string | null }>
}

precacheAndRoute(self.__WB_MANIFEST)
cleanupOutdatedCaches()

// Push notification handler
self.addEventListener('push', (event: PushEvent) => {
  const data = event.data?.json() ?? {
    title: 'FoodSocial',
    body: 'You have a new notification',
  }

  event.waitUntil(
    (async () => {
      await self.registration.showNotification(data.title ?? 'FoodSocial', {
        body: data.body ?? '',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-192x192.png',
        tag: data.tag ?? 'foodsocial-notification',
        data: { url: data.url ?? '/' },
      })

      // Notify open clients to increment badge count
      const allClients = await self.clients.matchAll({ includeUncontrolled: true })
      allClients.forEach(client => client.postMessage({ type: 'BADGE_INCREMENT' }))

      // Set the app icon badge
      if ('setAppBadge' in self.navigator) {
        const notifications = await self.registration.getNotifications()
        await (self.navigator as Navigator & { setAppBadge: (n: number) => Promise<void> })
          .setAppBadge(notifications.length)
      }
    })()
  )
})

// Notification click: open/focus the app
self.addEventListener('notificationclick', (event: NotificationEvent) => {
  event.notification.close()
  const targetUrl = (event.notification.data as { url?: string })?.url ?? '/'

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      const existing = clientList.find(c => c.url.includes(self.location.origin))
      if (existing) {
        existing.focus()
        existing.navigate(targetUrl)
      } else {
        self.clients.openWindow(targetUrl)
      }
    })
  )
})

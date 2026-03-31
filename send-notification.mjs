/**
 * Send a push notification to a subscribed user.
 *
 * SETUP (one time):
 *   1. Enable notifications in the app (tap the bell icon on the Feed page)
 *   2. Open browser DevTools console and run:
 *        copy(localStorage.getItem("push_subscription"))
 *   3. Paste the result into a file called subscription.json in this folder
 *
 * USAGE:
 *   node send-notification.mjs [title] [body]
 *
 * EXAMPLES:
 *   node send-notification.mjs
 *   node send-notification.mjs "New match!" "Someone wants to eat with you 🍜"
 *   node send-notification.mjs "Hot deal" "Check out tonight's special 🔥"
 */

import webPush from 'web-push'
import { readFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dir = dirname(fileURLToPath(import.meta.url))

// Load .env manually
const envPath = join(__dir, '.env')
const env = Object.fromEntries(
  readFileSync(envPath, 'utf-8')
    .split('\n')
    .filter(l => l && !l.startsWith('#'))
    .map(l => {
      const idx = l.indexOf('=')
      return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()]
    })
    .filter(p => p[0])
)

const VAPID_PUBLIC_KEY = env['VITE_VAPID_PUBLIC_KEY']
const VAPID_PRIVATE_KEY = env['VAPID_PRIVATE_KEY']
const VAPID_CONTACT = env['VAPID_CONTACT_EMAIL'] ?? 'admin@example.com'

if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
  console.error('❌ Missing VAPID keys in .env')
  process.exit(1)
}

webPush.setVapidDetails(`mailto:${VAPID_CONTACT}`, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY)

// Read subscription from subscription.json
const subPath = join(__dir, 'subscription.json')
if (!existsSync(subPath)) {
  console.error('❌ subscription.json not found.')
  console.error('')
  console.error('To get it:')
  console.error('  1. Open the app and tap the 🔔 bell icon to enable notifications')
  console.error('  2. In browser DevTools console, run:')
  console.error('       copy(localStorage.getItem("push_subscription"))')
  console.error('  3. Paste the result into a file called subscription.json here')
  process.exit(1)
}

let subscription
try {
  subscription = JSON.parse(readFileSync(subPath, 'utf-8'))
} catch {
  console.error('❌ subscription.json is not valid JSON. Re-copy it from the browser console.')
  process.exit(1)
}

if (!subscription?.endpoint) {
  console.error('❌ subscription.json is missing the endpoint field.')
  process.exit(1)
}

const [,, title = 'FoodSocial', body = 'You have a new notification 🍜'] = process.argv
const payload = JSON.stringify({ title, body, url: '/' })

try {
  await webPush.sendNotification(subscription, payload)
  console.log(`✅ Notification sent: "${title}" — ${body}`)
} catch (err) {
  console.error('❌ Failed to send notification:', err.message)
  if (err.statusCode === 410) {
    console.error('   Subscription expired. Re-enable notifications in the app to get a new one.')
  }
  process.exit(1)
}

import { createContext, useContext } from 'react'

type BadgeContextType = {
  badgeCount: number
  increment: () => void
  clear: () => void
}

export const BadgeContext = createContext<BadgeContextType>({
  badgeCount: 0,
  increment: () => {},
  clear: () => {},
})

export function useBadge() {
  return useContext(BadgeContext)
}

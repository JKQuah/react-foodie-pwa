import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { FOOD_POSTS, USERS } from '../data'

export type Comment = {
  id: string
  userId: string
  name: string
  avatar?: string
  text: string
  time: string
}

export type FeedPost = {
  id: string
  userId: string
  dish: string
  location: string
  caption?: string
  image?: string
  images?: string[]
  likes: number
  comments: number
  time: string
}

type FeedContextType = {
  posts: FeedPost[]
  likedIds: Set<string>
  likeCounts: Record<string, number>
  toggleLike: (postId: string) => void
  commentLists: Record<string, Comment[]>
  addComment: (postId: string, text: string) => void
  createPost: (data: { dish: string; location: string; caption: string; images: string[] }) => void
}

const SEED_COMMENTS: Record<string, Comment[]> = {
  p1: [
    { id: 'sc1-1', userId: '2', name: 'Marcus T.', avatar: USERS[1].avatar, text: 'Where exactly is this? Need to go 😍', time: '2h' },
    { id: 'sc1-2', userId: '3', name: 'Jessica W.', avatar: USERS[2].avatar, text: 'Going there next week!', time: '1h' },
    { id: 'sc1-3', userId: '2', name: 'Marcus T.', avatar: USERS[1].avatar, text: 'We should plan this together 👀', time: '45m' },
  ],
  p2: [
    { id: 'sc2-1', userId: '1', name: 'Sophie L.', avatar: USERS[0].avatar, text: 'That cheese pull!!! 🧀🤤', time: '4h' },
    { id: 'sc2-2', userId: '3', name: 'Jessica W.', avatar: USERS[2].avatar, text: 'Burger Joint never disappoints', time: '3h' },
    { id: 'sc2-3', userId: '1', name: 'Sophie L.', avatar: USERS[0].avatar, text: 'Can we go this weekend?', time: '2h' },
  ],
  p3: [
    { id: 'sc3-1', userId: '2', name: 'Marcus T.', avatar: USERS[1].avatar, text: 'The salmon looks so fresh 🐟', time: '12h' },
    { id: 'sc3-2', userId: '1', name: 'Sophie L.', avatar: USERS[0].avatar, text: 'Sushi Zanmai is always great ✨', time: '10h' },
    { id: 'sc3-3', userId: '2', name: 'Marcus T.', avatar: USERS[1].avatar, text: 'Adding this to my list!', time: '8h' },
  ],
}

const FeedContext = createContext<FeedContextType | null>(null)

// The currently logged-in user (Sophie)
export const CURRENT_USER = USERS[0]

export function FeedProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<FeedPost[]>(FOOD_POSTS)
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set())
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>(
    Object.fromEntries(FOOD_POSTS.map(p => [p.id, p.likes]))
  )
  const [commentLists, setCommentLists] = useState<Record<string, Comment[]>>(
    { ...SEED_COMMENTS }
  )

  const toggleLike = useCallback((postId: string) => {
    setLikedIds(prev => {
      const next = new Set(prev)
      if (next.has(postId)) {
        next.delete(postId)
        setLikeCounts(c => ({ ...c, [postId]: c[postId] - 1 }))
      } else {
        next.add(postId)
        setLikeCounts(c => ({ ...c, [postId]: c[postId] + 1 }))
      }
      return next
    })
  }, [])

  const addComment = useCallback((postId: string, text: string) => {
    const comment: Comment = {
      id: `c_${Date.now()}`,
      userId: CURRENT_USER.id,
      name: 'You',
      avatar: CURRENT_USER.avatar,
      text,
      time: 'Just now',
    }
    setCommentLists(prev => ({
      ...prev,
      [postId]: [...(prev[postId] ?? []), comment],
    }))
  }, [])

  const createPost = useCallback((data: { dish: string; location: string; caption: string; images: string[] }) => {
    const id = `p_${Date.now()}`
    const newPost: FeedPost = {
      id,
      userId: CURRENT_USER.id,
      dish: data.dish,
      location: data.location,
      caption: data.caption,
      image: data.images[0],
      images: data.images,
      likes: 0,
      comments: 0,
      time: 'Just now',
    }
    setPosts(prev => [newPost, ...prev])
    setLikeCounts(prev => ({ ...prev, [id]: 0 }))
    setCommentLists(prev => ({ ...prev, [id]: [] }))
  }, [])

  return (
    <FeedContext.Provider value={{ posts, likedIds, likeCounts, toggleLike, commentLists, addComment, createPost }}>
      {children}
    </FeedContext.Provider>
  )
}

export function useFeed() {
  const ctx = useContext(FeedContext)
  if (!ctx) throw new Error('useFeed must be used within FeedProvider')
  return ctx
}

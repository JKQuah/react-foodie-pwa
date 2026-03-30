import { useState, useRef } from 'react'
import { Search, MapPin, MoreHorizontal, Heart, MessageCircle, Send, Plus, PenLine, X } from 'lucide-react'
import { USERS } from '../data'
import { useFeed, CURRENT_USER } from '../context/FeedContext'
import { Link, useNavigate } from 'react-router'

export function Feed() {
  const navigate = useNavigate()
  const { posts, likedIds, likeCounts, toggleLike, commentLists, addComment } = useFeed()
  const [openComments, setOpenComments] = useState<Set<string>>(new Set())
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({})
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  function toggleComments(postId: string) {
    setOpenComments(prev => {
      const next = new Set(prev)
      if (next.has(postId)) {
        next.delete(postId)
      } else {
        next.add(postId)
        setTimeout(() => inputRefs.current[postId]?.focus(), 100)
      }
      return next
    })
  }

  function handleSendComment(postId: string) {
    const text = (commentInputs[postId] ?? '').trim()
    if (!text) return
    addComment(postId, text)
    setCommentInputs(prev => ({ ...prev, [postId]: '' }))
  }

  return (
    <div className="pb-28 pt-12 px-4 bg-gray-50/50 min-h-full">
      {/* Header */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <p className="text-[#DE6543] font-bold flex items-center gap-1 text-sm">
            <MapPin className="w-4 h-4" /> Near you
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mt-1">Discover</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/post/create')}
            className="w-10 h-10 bg-[#DE6543] shadow-md shadow-orange-500/25 rounded-full flex items-center justify-center active:scale-95 transition-transform"
          >
            <PenLine className="w-4.5 h-4.5 text-white" />
          </button>
          <Link
            to="/search"
            className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center active:scale-95 transition-transform"
          >
            <Search className="w-5 h-5 text-gray-600" />
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3 mb-8">
        <Link to="/match" className="flex-1 bg-[#DE6543] text-white py-3.5 px-4 rounded-2xl font-bold shadow-md shadow-orange-500/20 text-center text-sm">
          Find People Now
        </Link>
        <Link to="/host/create" className="flex-1 bg-white border border-gray-100 text-gray-900 py-3.5 px-4 rounded-2xl font-bold shadow-sm text-center text-sm">
          Start a Plan
        </Link>
      </div>

      {/* Feed */}
      <div className="flex flex-col gap-0 border-t border-gray-100 -mx-4 bg-white">
        {posts.map(post => {
          const user = post.userId === CURRENT_USER.id
            ? { ...CURRENT_USER, name: 'You' }
            : USERS.find(u => u.id === post.userId)
          const isLiked = likedIds.has(post.id)
          const likeCount = likeCounts[post.id] ?? post.likes
          const comments = commentLists[post.id] ?? []
          const isCommentsOpen = openComments.has(post.id)
          const inputVal = commentInputs[post.id] ?? ''

          return (
            <div key={post.id} className="bg-white border-b border-gray-100">
              <div className="p-4 py-5 flex gap-3">
                {/* Avatar */}
                <div className="flex-shrink-0 relative h-fit mt-1">
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-10 h-10 rounded-full object-cover border border-gray-100"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 border border-gray-200 shadow-sm z-10">
                    <Plus className="w-3 h-3 text-gray-900" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[15px] text-gray-900">{user?.name}</span>
                      <span className="text-[14px] text-gray-500">{post.time}</span>
                    </div>
                    <MoreHorizontal className="w-5 h-5 text-gray-400" />
                  </div>

                  {/* Body */}
                  <div className="mb-3">
                    <p className="text-[15px] text-gray-900 font-bold mb-0.5 flex items-center gap-1.5">
                      {post.dish} <span className="text-lg">🤤</span>
                    </p>
                    <p className="text-[14px] text-gray-500 flex items-center gap-1 mb-2">
                      <MapPin className="w-3.5 h-3.5" />{post.location}
                    </p>
                    {post.caption && <p className="text-[14px] text-gray-800">{post.caption}</p>}
                  </div>

                  {/* Images */}
                  {(post.images ?? (post.image ? [post.image] : [])).length > 0 && (
                    <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                      {(post.images ?? [post.image!]).map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt={`${post.dish} ${i}`}
                          className="w-[240px] h-[300px] object-cover rounded-2xl border border-gray-100 flex-shrink-0"
                        />
                      ))}
                    </div>
                  )}

                  {/* Interaction Actions */}
                  <div className="flex items-center gap-5 mt-3 text-gray-500">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className="flex items-center gap-1.5 transition-colors group active:scale-90"
                    >
                      <Heart
                        className={`w-[22px] h-[22px] transition-all duration-150 ${
                          isLiked ? 'fill-[#DE6543] text-[#DE6543] scale-110' : 'group-hover:text-gray-900'
                        }`}
                      />
                      <span className={`text-[13px] font-medium ${isLiked ? 'text-[#DE6543]' : ''}`}>
                        {likeCount}
                      </span>
                    </button>

                    <button
                      onClick={() => toggleComments(post.id)}
                      className="flex items-center gap-1.5 transition-colors group"
                    >
                      <MessageCircle
                        className={`w-[22px] h-[22px] transition-colors ${
                          isCommentsOpen ? 'text-gray-900' : 'group-hover:text-gray-900'
                        }`}
                      />
                      <span className="text-[13px] font-medium">{comments.length}</span>
                    </button>

                    <button
                      onClick={() => alert(`Shared "${post.dish}" to chat!`)}
                      className="flex items-center gap-1.5 hover:text-gray-900 transition-colors group"
                    >
                      <Send className="w-[22px] h-[22px] group-active:scale-90 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Comment Section */}
              {isCommentsOpen && (
                <div className="border-t border-gray-50 bg-gray-50/50 px-4 pb-3">
                  {/* Comment list */}
                  {comments.length > 0 && (
                    <div className="pt-3 flex flex-col gap-3 mb-3">
                      {comments.map(comment => (
                        <div key={comment.id} className="flex gap-2.5">
                          <img
                            src={comment.avatar}
                            alt={comment.name}
                            className="w-7 h-7 rounded-full object-cover flex-shrink-0 mt-0.5"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 border border-gray-100 shadow-sm">
                              <span className="text-[12px] font-bold text-gray-900 mr-1.5">{comment.name}</span>
                              <span className="text-[13px] text-gray-800">{comment.text}</span>
                            </div>
                            <span className="text-[11px] text-gray-400 ml-2 mt-0.5 block">{comment.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Comment input */}
                  <div className="flex gap-2 items-center pt-1">
                    <img
                      src={CURRENT_USER.avatar}
                      alt="You"
                      className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-full px-3.5 py-1.5 gap-2 shadow-sm">
                      <input
                        ref={el => { inputRefs.current[post.id] = el }}
                        type="text"
                        value={inputVal}
                        onChange={e => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                        onKeyDown={e => e.key === 'Enter' && handleSendComment(post.id)}
                        placeholder="Add a comment..."
                        className="flex-1 text-[13px] text-gray-900 bg-transparent outline-none placeholder:text-gray-400"
                      />
                      {inputVal.trim() ? (
                        <button
                          onClick={() => handleSendComment(post.id)}
                          className="text-[#DE6543] font-bold text-[13px] active:opacity-70 transition-opacity"
                        >
                          Post
                        </button>
                      ) : (
                        <button
                          onClick={() => toggleComments(post.id)}
                          className="text-gray-400 active:opacity-70 transition-opacity"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

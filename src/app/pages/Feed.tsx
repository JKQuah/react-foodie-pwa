import { Search, MapPin, MoreHorizontal, Heart, MessageCircle, Repeat2, Send, Plus } from "lucide-react";
import { FOOD_POSTS, USERS } from "../data";
import { Link } from "react-router";

export function Feed() {
  return (
    <div className="pb-28 pt-12 px-4 bg-gray-50/50 min-h-full">
      <div className="flex justify-between items-end mb-6">
        <div>
          <p className="text-[#DE6543] font-bold flex items-center gap-1 text-sm"><MapPin className="w-4 h-4" /> Near you</p>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mt-1">Discover</h1>
        </div>
        <Link to="/search" className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center active:scale-95 transition-transform">
          <Search className="w-5 h-5 text-gray-600" />
        </Link>
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
        {FOOD_POSTS.map(post => {
          const user = USERS.find(u => u.id === post.userId);
          return (
            <div key={post.id} className="bg-white p-4 py-5 border-b border-gray-100 flex gap-3">
              {/* Left col: Avatar */}
              <div className="flex-shrink-0 relative h-fit mt-1">
                <img src={user?.avatar} alt={user?.name} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 border border-gray-200 shadow-sm z-10">
                   <Plus className="w-3 h-3 text-gray-900" />
                </div>
              </div>

              {/* Right col: Content */}
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
                   <p className="text-[15px] text-gray-900 font-bold mb-0.5 flex items-center gap-1.5">{post.dish} <span className="text-lg">🤤</span></p>
                   <p className="text-[14px] text-gray-500 flex items-center gap-1 mb-2"><MapPin className="w-3.5 h-3.5" />{post.location}</p>
                   {post.caption && <p className="text-[14px] text-gray-800">{post.caption}</p>}
                </div>
                
                {/* Scrollable Images */}
                {(post.images || [post.image]).length > 0 && (
                  <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                     {(post.images || [post.image]).map((img, i) => (
                       <img key={i} src={img} alt={`${post.dish} ${i}`} className="w-[240px] h-[300px] object-cover rounded-2xl border border-gray-100 flex-shrink-0" />
                     ))}
                  </div>
                )}
                
                {/* Interaction Actions */}
                <div className="flex items-center gap-5 mt-3 text-gray-500">
                   <button className="flex items-center gap-1.5 hover:text-gray-900 transition-colors group">
                     <Heart className="w-[22px] h-[22px] group-active:scale-90 transition-transform" />
                     <span className="text-[13px] font-medium">{post.likes}</span>
                   </button>
                   <button className="flex items-center gap-1.5 hover:text-gray-900 transition-colors group">
                     <MessageCircle className="w-[22px] h-[22px] group-active:scale-90 transition-transform" />
                     <span className="text-[13px] font-medium">{post.comments}</span>
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
          );
        })}
      </div>
    </div>
  );
}
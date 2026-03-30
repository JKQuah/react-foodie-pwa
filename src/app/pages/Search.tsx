import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Search as SearchIcon, X, Clock, MapPin, Send } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { FOOD_POSTS, PLANS, USERS } from "../data";

const CATEGORIES = [
  { icon: "🍣", label: "Sushi Spots", color: "bg-orange-50" },
  { icon: "☕️", label: "Late Night", color: "bg-blue-50" },
  { icon: "🌶", label: "Spicy", color: "bg-red-50" },
  { icon: "🥑", label: "Healthy", color: "bg-green-50" },
  { icon: "🍔", label: "Burgers", color: "bg-yellow-50" },
  { icon: "🍰", label: "Desserts", color: "bg-pink-50" },
];

const RECENT_SEARCHES = ["Nasi Lemak", "Oasis Cafe", "Ramen near me"];

export function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto focus the search bar when the page loads
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const hasQuery = query.trim().length > 0;

  // Simple mock filtering
  const filteredPosts = FOOD_POSTS.filter(post => 
    post.dish.toLowerCase().includes(query.toLowerCase()) || 
    post.location.toLowerCase().includes(query.toLowerCase())
  );
  
  const filteredPlans = PLANS.filter(plan => 
    plan.title.toLowerCase().includes(query.toLowerCase()) || 
    plan.restaurant.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="h-full bg-white flex flex-col absolute inset-0 z-50 animate-in slide-in-from-right-2 duration-300 pb-safe">
      {/* Header */}
      <div className="pt-12 pb-4 px-4 bg-white border-b border-gray-100 flex items-center gap-3 shadow-sm z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-900 active:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex-1 bg-gray-100 rounded-full flex items-center px-4 py-2.5 relative">
          <SearchIcon className="w-5 h-5 text-gray-400 mr-2" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search cravings, places, or plans..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-[15px] font-medium text-gray-900 placeholder:text-gray-400"
          />
          {query && (
            <button onClick={() => setQuery("")} className="p-1 text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Body Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {!hasQuery ? (
          <div className="p-5 space-y-8 animate-in fade-in duration-300">
            {/* Recent Searches */}
            <div>
              <h3 className="text-[15px] font-bold text-gray-900 mb-3">Recent Searches</h3>
              <div className="flex flex-col gap-3">
                {RECENT_SEARCHES.map((term, i) => (
                  <button 
                    key={i} 
                    onClick={() => setQuery(term)}
                    className="flex items-center gap-3 text-left group"
                  >
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-[15px] text-gray-600 font-medium group-active:text-[#DE6543]">{term}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tap-to-Search Categories */}
            <div className="space-y-8">
              {/* Trending Nearby */}
              <div>
                <h3 className="text-[15px] font-bold text-gray-900 mb-3">Trending Nearby</h3>
                <div className="flex gap-2.5 overflow-x-auto pb-2 -mx-5 px-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {['🍣 Sushi', '🍔 Burger', '🍜 Ramen', '🍕 Pizza', '🥗 Salad'].map(chip => (
                    <button 
                      key={chip} 
                      onClick={() => setQuery(chip.split(' ')[1] || chip)}
                      className="bg-white border border-gray-100 rounded-full px-5 py-2.5 text-sm font-bold text-gray-700 whitespace-nowrap shadow-sm flex-shrink-0 active:scale-95 transition-transform"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tap-to-Search Categories */}
              <div>
                <h3 className="text-[15px] font-bold text-gray-900 mb-3">Explore Categories</h3>
                <div className="grid grid-cols-2 gap-3">
                  {CATEGORIES.map((cat, i) => (
                    <button 
                      key={i}
                      onClick={() => setQuery(cat.label)}
                      className={`${cat.color} rounded-2xl p-4 flex items-center gap-3 text-left active:scale-95 transition-transform`}
                    >
                      <span className="text-2xl">{cat.icon}</span>
                      <span className="font-bold text-[15px] text-gray-800">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-6 animate-in fade-in duration-300">
            {/* Search Results */}
            
            {/* Active Plans Results */}
            {filteredPlans.length > 0 && (
              <div>
                <h3 className="text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-3 px-1">Active Plans</h3>
                <div className="flex flex-col gap-3">
                  {filteredPlans.map(plan => {
                    const host = USERS.find(u => u.id === plan.hostId);
                    return (
                      <Link to={`/host/${plan.id}`} key={plan.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 active:scale-[0.98] transition-transform">
                        <img src={host?.avatar} alt={host?.name} className="w-12 h-12 rounded-full object-cover border border-gray-100" />
                        <div className="flex-1">
                          <h4 className="font-bold text-[15px] text-gray-900">{plan.title}</h4>
                          <p className="text-sm text-gray-500">{plan.restaurant} • {plan.time}</p>
                          <div className="mt-2 inline-block bg-[#DE6543]/10 text-[#DE6543] text-[11px] font-bold px-2 py-1 rounded-md">
                            {plan.currentJoined}/{plan.maxJoined} Joined
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Food Posts Results */}
            {filteredPosts.length > 0 && (
              <div>
                <h3 className="text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-3 px-1">Food Posts</h3>
                <div className="flex flex-col gap-4">
                  {filteredPosts.map(post => {
                    const user = USERS.find(u => u.id === post.userId);
                    return (
                      <div key={post.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <img src={post.image} alt={post.dish} className="w-16 h-16 rounded-xl object-cover" />
                          <div className="flex-1">
                            <h4 className="font-bold text-[15px] text-gray-900">{post.dish}</h4>
                            <p className="text-sm text-gray-500 flex items-center gap-1"><MapPin className="w-3 h-3" /> {post.location}</p>
                            <p className="text-xs text-gray-400 mt-1">Shared by {user?.name}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <Link to="/host/create" className="flex-1 bg-[#DE6543] text-white py-2 rounded-xl text-sm font-bold text-center active:scale-95 transition-transform">
                            Plan this meal
                          </Link>
                          <button className="px-4 bg-gray-100 text-gray-900 rounded-xl flex items-center justify-center active:scale-95 transition-transform">
                            <Send className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {filteredPlans.length === 0 && filteredPosts.length === 0 && (
              <div className="text-center pt-10">
                <span className="text-4xl mb-3 block">🍽️</span>
                <h3 className="text-lg font-bold text-gray-900 mb-1">No results found</h3>
                <p className="text-gray-500">Try searching for another craving!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
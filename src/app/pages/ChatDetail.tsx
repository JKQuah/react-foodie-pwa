import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { ChevronLeft, Info, Calendar, MapPin, Send, RotateCw, Play, MoreHorizontal } from "lucide-react";
import { CHATS, MESSAGES, USERS, FOOD_POSTS } from "../data";

export function ChatDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const chat = CHATS.find(c => c.id === id);
  const messages = MESSAGES[id || ''] || [];
  
  const [showPlanOverlay, setShowPlanOverlay] = useState(false);
  
  // Auto-scroll
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!chat) return <div>Chat not found</div>;

  const participants = chat.participants.map(pid => USERS.find(u => u.id === pid));

  return (
    <div className="absolute inset-0 flex flex-col bg-[#F7F7F8] z-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md pt-2 flex flex-col z-20 border-b border-gray-100 pb-3 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        <div className="flex items-center justify-between px-2 h-14">
          <button onClick={() => navigate(-1)} className="p-3 text-[#DE6543] active:scale-95 transition-transform flex items-center">
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="flex flex-col items-center justify-center flex-1">
            <div className="flex items-center gap-1.5 mb-0.5">
              <div className="flex -space-x-1.5 mr-1">
                {participants.slice(0, 2).map((p, i) => (
                  <img key={i} src={p?.avatar} alt="" className="w-5 h-5 rounded-full object-cover border border-white relative z-10" />
                ))}
              </div>
              <h2 className="font-bold text-[17px] text-gray-900 leading-none">{chat.name}</h2>
            </div>
            {chat.planDetails && (
              <p className="text-[12px] text-gray-500 mt-1 font-medium flex items-center gap-1">
                {chat.planDetails.time} • {chat.planDetails.restaurant}
              </p>
            )}
            {!chat.planDetails && (
              <p className="text-[12px] text-gray-500 mt-1 font-medium flex items-center gap-1">
                {participants.length} Participants
              </p>
            )}
          </div>
          
          <button className="p-3 text-[#DE6543] active:scale-95 transition-transform">
            <Info className="w-6 h-6" />
          </button>
        </div>

        {/* Status Banner */}
        <div className="px-6 flex justify-center mt-1">
          {chat.status === 'Planning' && (
            <div className="bg-orange-100 text-[#DE6543] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Planning in Progress
            </div>
          )}
          {chat.status === 'Confirmed' && (
            <div className="bg-green-100 text-green-700 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Plan Confirmed
            </div>
          )}
          {chat.status === 'Completed' && (
            <div className="bg-gray-200 text-gray-600 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Meal Completed
            </div>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-4 relative">
        {messages.map((msg, index) => {
          const isMe = msg.senderId === '1'; // Assuming '1' is the current user (Sophie)
          const sender = USERS.find(u => u.id === msg.senderId);
          
          if (msg.type === 'system') {
            return (
              <div key={msg.id} className="flex justify-center my-2">
                <span className="bg-gray-200/50 text-gray-500 text-[12px] px-3 py-1 rounded-full font-medium">
                  {msg.text}
                </span>
              </div>
            );
          }

          if (msg.type === 'plan') {
            return (
              <div key={msg.id} className="flex justify-center my-3 w-full">
                <div className="bg-white border-2 border-[#DE6543]/20 rounded-2xl p-4 w-[85%] shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#DE6543]/10 flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-[#DE6543]" />
                    </div>
                    <span className="font-bold text-[14px] text-gray-900">Plan Confirmed!</span>
                  </div>
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-3.5 h-3.5" />
                      <span className="text-[13px] font-medium">{msg.plan.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="text-[13px] font-medium">{msg.plan.restaurant}</span>
                    </div>
                  </div>
                  <div className="flex -space-x-2">
                    {msg.plan.participants.map((pid: string) => {
                      const p = USERS.find(u => u.id === pid);
                      return <img key={pid} src={p?.avatar} alt="" className="w-6 h-6 rounded-full object-cover border-2 border-white" />;
                    })}
                  </div>
                </div>
              </div>
            );
          }

          if (msg.type === 'post') {
            const post = FOOD_POSTS.find(p => p.id === msg.postId);
            if (!post) return null;
            return (
              <div key={msg.id} className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'} mb-2`}>
                {!isMe && (
                  <img src={sender?.avatar} alt="" className="w-8 h-8 rounded-full object-cover mr-2 self-end" />
                )}
                <div className="flex flex-col gap-1 max-w-[80%]">
                  {msg.text && (
                    <div className={`p-3 rounded-2xl text-[15px] shadow-sm ${isMe ? 'bg-[#DE6543] text-white rounded-br-sm' : 'bg-white text-gray-900 border border-gray-100 rounded-bl-sm'}`}>
                      {msg.text}
                    </div>
                  )}
                  <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm mt-1">
                    <img src={post.image} alt="" className="w-full h-40 object-cover" />
                    <div className="p-3">
                      <p className="font-bold text-[14px] text-gray-900">{post.dish}</p>
                      <p className="text-[12px] text-gray-500 mb-3">{post.location}</p>
                      <button 
                        onClick={() => setShowPlanOverlay(true)}
                        className="w-full bg-[#DE6543] text-white text-[13px] font-bold py-2 rounded-xl flex items-center justify-center gap-1 active:scale-[0.98] transition-transform"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        Plan this meal
                      </button>
                    </div>
                  </div>
                  <span className={`text-[11px] text-gray-400 mt-0.5 ${isMe ? 'text-right' : 'text-left'}`}>{msg.time}</span>
                </div>
              </div>
            );
          }

          // Default Text Message
          return (
            <div key={msg.id} className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}>
              {!isMe && (
                <img src={sender?.avatar} alt="" className="w-8 h-8 rounded-full object-cover mr-2 self-end" />
              )}
              <div className="flex flex-col max-w-[75%]">
                <div className={`p-3 rounded-2xl text-[15px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] ${isMe ? 'bg-[#DE6543] text-white rounded-br-sm' : 'bg-white text-gray-900 border border-gray-100 rounded-bl-sm'}`}>
                  {msg.text}
                </div>
                <span className={`text-[11px] text-gray-400 mt-1 ${isMe ? 'text-right' : 'text-left'}`}>{msg.time}</span>
              </div>
            </div>
          );
        })}
        
        {/* Actions for Completed Plans */}
        {chat.status === 'Completed' && (
          <div className="flex justify-center mt-4 mb-2">
            <button className="bg-white border border-gray-200 text-gray-900 text-[14px] font-bold py-3 px-6 rounded-2xl flex items-center gap-2 shadow-sm active:scale-95 transition-transform">
              <RotateCw className="w-4 h-4 text-[#DE6543]" />
              Repeat Plan
            </button>
          </div>
        )}
        
        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-100 p-4 pb-8 flex items-end gap-3 z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
        <button className="p-2 text-gray-400 active:scale-95 transition-transform">
          <MoreHorizontal className="w-6 h-6" />
        </button>
        <div className="flex-1 bg-gray-100 rounded-2xl p-1 flex items-center">
          <input 
            type="text" 
            placeholder="Message..." 
            className="w-full bg-transparent px-3 py-2 text-[15px] focus:outline-none placeholder:text-gray-500"
          />
        </div>
        <button className="p-2.5 bg-[#DE6543] text-white rounded-full active:scale-95 transition-transform shadow-md shadow-orange-500/20">
          <Send className="w-4 h-4" />
        </button>
      </div>

      {/* Plan Interface Overlay */}
      {showPlanOverlay && (
        <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end justify-center">
          <div className="bg-white w-full rounded-t-3xl p-6 pb-12 animate-in slide-in-from-bottom shadow-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Start a Plan</h3>
            
            <div className="space-y-4 mb-8">
              <div>
                <label className="text-sm font-bold text-gray-700 mb-2 block">When?</label>
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-2xl p-4">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <input type="text" placeholder="e.g. Tonight, 7PM" className="bg-transparent border-none focus:outline-none flex-1 font-medium text-[15px]" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-bold text-gray-700 mb-2 block">Where?</label>
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-2xl p-4">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <input type="text" placeholder="Restaurant Name" className="bg-transparent border-none focus:outline-none flex-1 font-medium text-[15px]" defaultValue="Burger Joint" />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowPlanOverlay(false)}
                className="flex-1 bg-gray-100 text-gray-900 font-bold py-3.5 rounded-2xl active:scale-95 transition-transform"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowPlanOverlay(false);
                  // Mock creating plan
                  alert('Plan proposed to chat!');
                }}
                className="flex-1 bg-[#DE6543] text-white font-bold py-3.5 rounded-2xl active:scale-95 transition-transform shadow-md shadow-orange-500/20"
              >
                Propose
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
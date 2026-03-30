import { Link } from "react-router";
import { CHATS, USERS } from "../data";

export function ChatList() {
  return (
    <div className="pb-28 pt-12 px-4 bg-gray-50/50 min-h-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Chats</h1>
      </div>

      <div className="flex flex-col gap-2">
        {CHATS.map(chat => {
          // Get participant avatars
          const participants = chat.participants.map(pid => USERS.find(u => u.id === pid));
          
          return (
            <Link 
              key={chat.id} 
              to={`/chats/${chat.id}`}
              className="bg-white p-4 rounded-3xl flex items-center gap-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 active:scale-[0.98] transition-transform"
            >
              {/* Avatars */}
              <div className="relative w-12 h-12 flex-shrink-0">
                {participants.length === 1 ? (
                  <img src={participants[0]?.avatar} alt="" className="w-12 h-12 rounded-full object-cover border border-gray-100" />
                ) : (
                  <>
                    <img src={participants[0]?.avatar} alt="" className="w-8 h-8 rounded-full object-cover border-2 border-white absolute top-0 left-0 z-10" />
                    <img src={participants[1]?.avatar} alt="" className="w-8 h-8 rounded-full object-cover border-2 border-white absolute bottom-0 right-0 z-0" />
                  </>
                )}
                {chat.unread > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#DE6543] rounded-full text-white text-[10px] font-bold flex items-center justify-center border-2 border-white z-20">
                    {chat.unread}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-[16px] text-gray-900 truncate pr-2">{chat.name}</h3>
                  <span className="text-[12px] text-gray-400 flex-shrink-0">{chat.timestamp}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <p className={`text-[14px] truncate flex-1 ${chat.unread > 0 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                    {chat.lastMessage}
                  </p>
                </div>
                
                <div className="mt-2 flex">
                  {chat.status === 'Planning' && (
                    <span className="bg-orange-100 text-[#DE6543] text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">Planning</span>
                  )}
                  {chat.status === 'Confirmed' && (
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">Confirmed</span>
                  )}
                  {chat.status === 'Completed' && (
                    <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">Completed</span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
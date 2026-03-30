import { Plus } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import { PLANS, USERS } from "../data";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import emptyIllustration from "figma:asset/85f09a27c3ee3ceb3b15e681bcdcb1a7896ea29c.png";

export function HostJoin() {
  const [tab, setTab] = useState<'nearby' | 'mine'>('nearby');

  return (
    <div className="pb-28 pt-12 px-5 h-full relative flex flex-col bg-gray-50/50">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Meal Plans</h1>
      
      <div className="flex gap-6 border-b border-gray-200 mb-6">
        <button 
          onClick={() => setTab('nearby')}
          className={`pb-3 text-[15px] font-bold transition-all relative ${tab === 'nearby' ? 'text-gray-900' : 'text-gray-400'}`}
        >
          Nearby Plans
          {tab === 'nearby' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-t-full" />}
        </button>
        <button 
          onClick={() => setTab('mine')}
          className={`pb-3 text-[15px] font-bold transition-all relative ${tab === 'mine' ? 'text-gray-900' : 'text-gray-400'}`}
        >
          My Plans
          {tab === 'mine' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-t-full" />}
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-5 overflow-y-auto pb-10 scrollbar-hide">
        {tab === 'nearby' ? (
          PLANS.map(plan => {
            const host = USERS.find(u => u.id === plan.hostId);
            return (
              <Link to={`/host/${plan.id}`} key={plan.id} className="bg-white p-6 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col gap-5 active:scale-[0.98] transition-transform">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">{plan.title}</h3>
                    <p className="text-gray-500 text-sm mt-1">{plan.restaurant}</p>
                  </div>
                  <div className="bg-[#DE6543]/10 text-[#DE6543] text-xs font-bold px-3 py-1.5 rounded-lg">
                    {plan.time}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-2 pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-3">
                    <img src={host?.avatar} alt={host?.name} className="w-9 h-9 rounded-full object-cover border border-gray-100" />
                    <span className="text-[13px] font-bold text-gray-500">Hosted by <span className="text-gray-900">{host?.name}</span></span>
                  </div>
                  <div className="text-[13px] font-bold text-gray-900 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full">
                    {plan.currentJoined}/{plan.maxJoined} joined
                  </div>
                </div>
              </Link>
            )
          })
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 mt-4 animate-in fade-in zoom-in-95 duration-300">
            <ImageWithFallback src="https://images.unsplash.com/photo-1654648663068-0093ade5069e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwZm9vZCUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NzQ3MTA3Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" alt="No plans" className="w-56 h-56 object-cover rounded-full mb-8 shadow-sm" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">No upcoming plans</h3>
            <p className="text-gray-500 text-center mb-8 max-w-[280px] leading-relaxed">You haven't joined or hosted any meals yet. Start organizing one to meet new people!</p>
            <Link to="/host/create" className="bg-[#DE6543] text-white px-8 py-3.5 rounded-full font-bold shadow-md shadow-orange-500/20 active:scale-95 transition-transform">
              Host a Meal
            </Link>
          </div>
        )}
      </div>

      <Link to="/host/create" className="absolute bottom-28 right-5 bg-gray-900 text-white p-4 rounded-full shadow-xl shadow-gray-900/20 flex items-center justify-center z-10 active:scale-95 transition-transform border border-white/20">
        <Plus className="w-7 h-7" />
      </Link>
    </div>
  );
}
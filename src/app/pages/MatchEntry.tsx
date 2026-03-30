import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Zap, Sparkles } from "lucide-react";

export function MatchEntry() {
  const navigate = useNavigate();

  return (
    <div className="pb-28 pt-12 px-5 h-full bg-gray-50 flex flex-col font-sans overflow-y-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">Eat Together</h1>
        <p className="text-gray-500 font-medium text-[16px]">Choose how you want to find your next meal.</p>
      </div>

      <div className="flex-1 flex flex-col gap-6">
        
        {/* Swipe Mode */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate('/match/swipe')}
          className="relative w-full bg-white rounded-[2.5rem] p-8 text-left shadow-[0_8px_30px_rgba(0,0,0,0.04)] border-[3px] border-transparent hover:border-orange-100 transition-colors overflow-hidden group flex flex-col"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-orange-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
          
          <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
            <Sparkles className="w-8 h-8 text-orange-500" />
          </div>
          
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Discover Foods</h2>
          <p className="text-gray-500 font-medium text-[15px] leading-relaxed mb-6">
            Not sure what you want? Playfully swipe through a curated menu of 10 tasty options.
          </p>
          
          <div className="mt-auto flex items-center gap-3">
             <div className="flex -space-x-3">
                <span className="w-10 h-10 rounded-full bg-white border-2 border-orange-50 flex items-center justify-center text-xl shadow-sm z-30">🍕</span>
                <span className="w-10 h-10 rounded-full bg-white border-2 border-orange-50 flex items-center justify-center text-xl shadow-sm z-20">🍣</span>
                <span className="w-10 h-10 rounded-full bg-white border-2 border-orange-50 flex items-center justify-center text-xl shadow-sm z-10">🍔</span>
             </div>
             <span className="text-sm font-bold text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full">Swipe Mode</span>
          </div>
        </motion.button>

        {/* Fast Match Mode */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate('/match/finding', { state: { foods: ["Popular Nearby Foods"] } })}
          className="relative w-full bg-[#DE6543] rounded-[2.5rem] p-8 text-left shadow-lg shadow-orange-500/20 overflow-hidden group flex flex-col"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
          
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-white/20">
            <Zap className="w-8 h-8 text-white fill-white" />
          </div>
          
          <h2 className="text-2xl font-extrabold text-white mb-2">Quick Match</h2>
          <p className="text-white/80 font-medium text-[15px] leading-relaxed mb-6">
            Bypass the swiping. We'll instantly group you for the most popular trending food nearby.
          </p>

          <div className="mt-auto flex items-center gap-3">
             <span className="text-sm font-bold text-[#DE6543] bg-white px-4 py-2 rounded-full shadow-sm">
               Auto-Match Now
             </span>
          </div>
        </motion.button>

      </div>
    </div>
  );
}
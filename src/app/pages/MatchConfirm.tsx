import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { CheckCircle2, MessageCircle, MapPin, Clock, CalendarHeart } from "lucide-react";
import { useEffect } from "react";
import confetti from "canvas-confetti";
import { USERS } from "../data";

export function MatchConfirm() {
  const navigate = useNavigate();

  useEffect(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.4 },
      colors: ['#DE6543', '#10B981', '#3B82F6', '#FBBF24']
    });
  }, []);

  return (
    <div className="pb-10 pt-16 px-5 h-full bg-white flex flex-col fixed inset-0 z-50 overflow-y-auto max-w-md mx-auto">
      <div className="flex-1 flex flex-col items-center">
        
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-24 h-24 bg-green-50 rounded-[2rem] flex items-center justify-center mb-6 shadow-sm border border-green-100"
        >
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </motion.div>

        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-2 text-center">
          Meetup Confirmed!
        </h1>
        <p className="text-gray-500 font-medium text-[16px] mb-10 text-center">
          Your plan is locked in. Get ready to eat!
        </p>

        {/* Plan Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full bg-white rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-6 mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50/50 rounded-bl-full -z-10" />
          
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-[13px] font-bold text-[#DE6543] uppercase tracking-wider mb-1">The Plan</p>
              <h2 className="text-xl font-bold text-gray-900">Village Park Nasi Lemak</h2>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-xl">
              🥥
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3 text-gray-600">
              <Clock className="w-5 h-5 text-gray-400" />
              <span className="font-semibold">Tonight at 7:00 PM</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span className="font-semibold">Damansara Utama (2.1km)</span>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-5">
            <p className="text-[13px] font-bold text-gray-400 mb-3 uppercase tracking-wider">Who's going</p>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-3">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&q=80" alt="Me" className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm z-30" />
                {USERS.slice(0, 2).map((user, i) => (
                  <img key={user.id} src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm" style={{ zIndex: 20 - i }} />
                ))}
                <div className="w-12 h-12 rounded-full border-2 border-white bg-gray-50 flex items-center justify-center text-gray-500 font-bold z-0 shadow-sm text-sm">
                  +1
                </div>
              </div>
              <span className="bg-green-50 text-green-600 font-bold px-3 py-1 rounded-full text-[13px]">
                4 Confirmed
              </span>
            </div>
          </div>
        </motion.div>

        {/* Group Chat Unlock Banner */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
              <MessageCircle className="w-5 h-5 text-blue-500 fill-blue-500/20" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-[15px]">Group Chat Unlocked!</p>
              <p className="text-gray-500 text-[13px] font-medium">Coordinate your arrival</p>
            </div>
          </div>
          <button className="bg-blue-500 text-white font-bold px-4 py-2 rounded-full text-[14px] shadow-sm active:scale-95 transition-transform">
            Open
          </button>
        </motion.div>
      </div>

      <div className="mt-8">
        <button 
          onClick={() => navigate('/')} 
          className="w-full bg-gray-100 mb-24 text-gray-900 py-4 rounded-2xl font-bold text-[17px] active:scale-[0.98] transition-transform flex justify-center items-center gap-2"
        >
          <CalendarHeart className="w-5 h-5 text-gray-500" />
          Add to Calendar & Return Home
        </button>
      </div>
    </div>
  );
}
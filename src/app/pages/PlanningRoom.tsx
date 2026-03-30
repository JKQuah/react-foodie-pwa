import { useState } from "react";
import { ChevronLeft, Check, MapPin, Clock } from "lucide-react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { USERS } from "../data";

const RESTAURANTS = [
  { id: 'r1', name: 'Village Park Nasi Lemak', distance: '1.2km', rating: 4.8 },
  { id: 'r2', name: 'Mamak Stall 24/7', distance: '2.5km', rating: 4.5 },
  { id: 'r3', name: 'Madam Kwan\'s', distance: '3.1km', rating: 4.9 },
];

export function PlanningRoom() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<'voting' | 'suggestion'>('voting');
  
  // Voting State
  const [time, setTime] = useState<string | null>(null);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);

  const isVotingComplete = time && restaurantId;

  return (
    <div className="pb-10 pt-12 px-5 h-full bg-gray-50/50 flex flex-col fixed inset-0 z-50 overflow-y-auto max-w-md mx-auto">
      <div className="flex items-center mb-6 relative">
        <button onClick={() => navigate(-1)} className="absolute left-0 p-2 -ml-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors z-10">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold mx-auto text-gray-900">Planning Room</h1>
      </div>

      <div className="flex flex-col items-center justify-center mb-8 bg-white p-5 rounded-[2rem] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        <div className="flex -space-x-3 mb-3">
          <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&q=80" alt="Me" className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm z-30" />
          {USERS.slice(0, 2).map((user, i) => (
            <img key={user.id} src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm" style={{ zIndex: 20 - i }} />
          ))}
        </div>
        <p className="text-[16px] font-bold text-gray-900 text-center">You and 3 others want <span className="text-[#DE6543]">Nasi Lemak</span></p>
      </div>

      <AnimatePresence mode="wait">
        {phase === 'voting' ? (
          <motion.div 
            key="voting"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col space-y-8"
          >
            {/* Time Selection */}
            <section>
              <h2 className="text-[15px] font-bold text-gray-900 mb-3 px-1">When works for you?</h2>
              <div className="flex gap-2">
                {['Tonight', 'Tomorrow', 'Weekend'].map(t => (
                  <button
                    key={t}
                    onClick={() => setTime(t)}
                    className={`flex-1 py-3.5 px-2 rounded-2xl text-[14px] font-bold transition-all border ${time === t ? 'bg-[#DE6543] text-white border-[#DE6543] shadow-md shadow-orange-500/20' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </section>

            {/* Restaurant Selection */}
            <section>
              <h2 className="text-[15px] font-bold text-gray-900 mb-3 px-1">Preferred spots</h2>
              <div className="space-y-3">
                {RESTAURANTS.map(r => (
                  <button
                    key={r.id}
                    onClick={() => setRestaurantId(r.id)}
                    className={`w-full text-left p-5 rounded-2xl flex items-center justify-between border transition-all ${restaurantId === r.id ? 'bg-orange-50/50 border-[#DE6543] ring-1 ring-[#DE6543]' : 'bg-white border-gray-100 hover:bg-gray-50'}`}
                  >
                    <div>
                      <p className="font-bold text-gray-900 text-[16px]">{r.name}</p>
                      <p className="text-[13px] font-semibold text-gray-500 mt-0.5">{r.distance} • ⭐ {r.rating}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${restaurantId === r.id ? 'bg-[#DE6543] border-[#DE6543] text-white' : 'border-gray-300'}`}>
                      {restaurantId === r.id && <Check className="w-4 h-4" />}
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Group Status */}
            <section className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl flex items-center justify-between">
               <span className="font-bold text-blue-900 text-[14px]">Group Status</span>
               <span className="bg-white px-3 py-1 rounded-full text-sm font-bold text-blue-600 shadow-sm">2 ready, 1 maybe</span>
            </section>

            <div className="mt-auto pt-4">
              <button 
                disabled={!isVotingComplete}
                onClick={() => setPhase('suggestion')}
                className={`w-full py-4 mb-24 rounded-2xl font-bold text-[17px] transition-all ${isVotingComplete ? 'bg-[#DE6543] text-white shadow-lg shadow-orange-500/20 active:scale-[0.98]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
              >
                Submit Preferences
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="suggestion"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 flex flex-col"
          >
            <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 mt-4 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -z-10" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-50 rounded-tr-full -z-10" />

              <div className="w-16 h-16 bg-[#DE6543]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">✨</span>
              </div>
              
              <h2 className="text-2xl font-extrabold text-gray-900 mb-2">You're all free {time}!</h2>
              <p className="text-gray-500 font-medium text-[15px] mb-8">Based on the group's votes, here is the best match for your meetup.</p>

              <div className="bg-gray-50 rounded-2xl p-5 text-left border border-gray-100 mb-8 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#DE6543]" />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-gray-400">Time</p>
                    <p className="text-[16px] font-bold text-gray-900">{time === 'Tonight' ? 'Tonight at 7:00 PM' : `${time} at 12:30 PM`}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#DE6543]" />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-gray-400">Suggested Place</p>
                    <p className="text-[16px] font-bold text-gray-900">{RESTAURANTS.find(r => r.id === restaurantId)?.name}</p>
                    <p className="text-[13px] text-gray-500 font-medium mt-0.5">{RESTAURANTS.find(r => r.id === restaurantId)?.distance} away</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => navigate('/match/confirm')}
                  className="w-full bg-[#DE6543] text-white py-4 rounded-2xl font-bold text-[17px] shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-transform"
                >
                  Accept & Confirm
                </button>
                <button 
                  onClick={() => setPhase('voting')}
                  className="w-full bg-white text-gray-500 py-4 rounded-2xl font-bold text-[17px] border border-gray-100 active:scale-[0.98] transition-transform"
                >
                  Suggest Another Option
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
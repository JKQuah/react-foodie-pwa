import { useNavigate, useLocation } from "react-router";
import { USERS } from "../data";
import { Users, Sparkles } from "lucide-react";
import { useEffect } from "react";
import confetti from "canvas-confetti";

export function MatchResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const foods: string[] = location.state?.foods || ["Nasi Lemak"];

  useEffect(() => {
    // Light celebration on finding a group
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#DE6543', '#FFB085', '#FFF']
    });
  }, []);

  const foodDisplay = foods.length > 2 
    ? `${foods.slice(0, 2).join(', ')} & more` 
    : foods.join(' or ');

  return (
    <div className="pb-10 pt-12 px-5 h-full bg-white flex flex-col fixed inset-0 z-50 overflow-y-auto max-w-md mx-auto">
      
      <div className="flex-1 flex flex-col items-center justify-center animate-in zoom-in-95 duration-500">
        
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-8 relative border-4 border-white shadow-md">
          <Sparkles className="w-10 h-10" />
          <div className="absolute -top-2 -right-2 w-7 h-7 bg-green-500 text-white text-xs font-bold flex items-center justify-center rounded-full border-2 border-white">
            3
          </div>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-4 text-center">
          You've been matched!
        </h1>
        <p className="text-gray-500 font-medium text-[17px] mb-10 leading-relaxed text-center px-4">
          We found 3 people nearby who also want <span className="text-[#DE6543] font-bold">{foodDisplay}</span>.
        </p>

        <div className="flex flex-col items-center bg-gray-50/80 w-full p-8 rounded-[2rem] border border-gray-100">
          <div className="flex -space-x-4 mb-5">
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&q=80" alt="Me" className="w-16 h-16 rounded-full border-4 border-gray-50 object-cover shadow-sm z-30" />
            {USERS.slice(0, 2).map((user, i) => (
              <img key={user.id} src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full border-4 border-gray-50 object-cover shadow-sm" style={{ zIndex: 20 - i }} />
            ))}
            <div className="w-16 h-16 rounded-full border-4 border-gray-50 bg-white flex items-center justify-center text-gray-500 font-bold z-0 shadow-sm">
              +1
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
             <span className="w-2 h-2 rounded-full bg-green-500"></span>
             <span className="font-bold text-gray-900 text-sm">Free tonight</span>
          </div>
        </div>
      </div>
      
      <div className="mt-auto pt-8">
        <button 
          onClick={() => navigate('/match/room')} 
          className="w-full flex justify-center items-center gap-2 bg-[#DE6543] text-white py-4 rounded-2xl font-bold text-[17px] shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-transform"
        >
          <Users className="w-5 h-5" />
          Continue
        </button>
        <button onClick={() => navigate('/match')} className="w-full mt-3 bg-transparent text-gray-400 py-4 rounded-2xl font-bold text-[17px] active:scale-[0.98] transition-transform">
          Cancel Match
        </button>
      </div>
    </div>
  );
}
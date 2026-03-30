import { ChevronLeft, MapPin, Clock, Users } from "lucide-react";
import { useParams, useNavigate } from "react-router";
import { PLANS, USERS } from "../data";

export function PlanDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const plan = PLANS.find(p => p.id === id) || PLANS[0];
  const host = USERS.find(u => u.id === plan.hostId);

  return (
    <div className="pb-10 pt-12 px-5 h-full bg-white flex flex-col fixed inset-0 z-50 overflow-y-auto max-w-md mx-auto">
      <div className="flex items-center mb-8">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="mb-10">
        <div className="inline-block bg-[#DE6543]/10 text-[#DE6543] text-[11px] uppercase tracking-wider font-extrabold px-3 py-1.5 rounded-md mb-4">
          {plan.type} Dining
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-3">{plan.title}</h1>
      </div>

      <div className="space-y-6 mb-10">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-900 border border-gray-100">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400 mb-0.5">When</p>
            <p className="font-bold text-[17px] text-gray-900">{plan.time}</p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-900 border border-gray-100">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400 mb-0.5">Where</p>
            <p className="font-bold text-[17px] text-gray-900">{plan.restaurant}</p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-900 border border-gray-100">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400 mb-0.5">Group Size</p>
            <p className="font-bold text-[17px] text-gray-900">{plan.currentJoined} / {plan.maxJoined} joined</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50/80 p-5 rounded-3xl flex items-center gap-4 border border-gray-100 mb-6">
        <img src={host?.avatar} alt={host?.name} className="w-14 h-14 rounded-full object-cover shadow-sm" />
        <div>
          <p className="text-sm font-bold text-gray-400">Hosted by</p>
          <p className="font-bold text-lg text-gray-900">{host?.name}</p>
        </div>
      </div>

      <div className="mt-auto pt-6">
        <button className="w-full bg-[#DE6543] text-white py-4 rounded-2xl font-bold text-[17px] shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-transform">
          Request to Join
        </button>
      </div>
    </div>
  );
}
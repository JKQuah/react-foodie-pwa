import { ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";

export function HostCreate() {
  const navigate = useNavigate();
  return (
    <div className="pb-24 pt-12 px-5 h-full bg-gray-50/50 flex flex-col fixed inset-0 z-50 overflow-y-auto max-w-md mx-auto">
      <div className="flex items-center mb-8 relative">
        <button onClick={() => navigate(-1)} className="absolute left-0 p-2 -ml-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold mx-auto text-gray-900">Host a Meal</h1>
      </div>

      <div className="bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 mb-8 p-1">
        <div className="p-5 border-b border-gray-50 flex items-center justify-between">
          <label className="font-bold text-gray-900">Title</label>
          <input type="text" placeholder="e.g. Burgers & Beers" className="text-right text-gray-500 outline-none font-medium placeholder:text-gray-300 w-1/2" />
        </div>
        <div className="p-5 border-b border-gray-50 flex items-center justify-between">
          <label className="font-bold text-gray-900">Time</label>
          <input type="datetime-local" className="text-right text-gray-500 outline-none font-medium w-1/2 bg-transparent" />
        </div>
        <div className="p-5 border-b border-gray-50 flex items-center justify-between">
          <label className="font-bold text-gray-900">Restaurant</label>
          <input type="text" placeholder="Optional" className="text-right text-gray-500 outline-none font-medium placeholder:text-gray-300 w-1/2" />
        </div>
        <div className="p-5 flex items-center justify-between">
          <label className="font-bold text-gray-900">Group Size</label>
          <select className="text-right text-[#DE6543] outline-none bg-transparent font-bold cursor-pointer">
            <option>2 people</option>
            <option>3 people</option>
            <option>4 people</option>
            <option>5+ people</option>
          </select>
        </div>
      </div>
      
      <div className="mt-auto pt-6">
        <button onClick={() => navigate('/host')} className="w-full bg-[#DE6543] text-white py-4 rounded-2xl font-bold text-[17px] shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-transform">
          Publish Plan
        </button>
      </div>
    </div>
  );
}
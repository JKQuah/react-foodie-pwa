import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { ChevronLeft, Search } from "lucide-react";

export function MatchPreferences() {
  const location = useLocation();
  const navigate = useNavigate();
  const foods: string[] = location.state?.foods || ["Sushi"];
  
  // Filter states
  const [distance, setDistance] = useState("Nearby (≤3km)");
  const [time, setTime] = useState("Now / Tonight");
  const [size, setSize] = useState("2–3 people");
  const [vibe, setVibe] = useState("Quick meal");

  const startSearch = () => {
    navigate('/match/finding', { state: { foods } });
  };

  const foodDisplay = foods.length > 2 
    ? `${foods.slice(0, 2).join(', ')} & more` 
    : foods.join(' or ');

  return (
    <div className="pb-28 pt-12 px-5 h-full bg-gray-50 flex flex-col fixed inset-0 z-50 overflow-y-auto max-w-md mx-auto">
      <div className="flex items-center mb-6 relative">
        <button onClick={() => navigate(-1)} className="absolute left-0 p-2 -ml-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors z-10">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold mx-auto text-gray-900">Preferences</h1>
      </div>

      <div className="mb-6">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Ready for {foodDisplay}?</h2>
        <p className="text-gray-500 font-medium text-[15px]">Adjust your meetup preferences before we find your group.</p>
      </div>

      <div className="flex-1 space-y-8 mb-8">
        <FilterSection title="Distance" options={["Nearby (≤3km)", "Flexible (≤10km)", "Far (≤20km)"]} selected={distance} onSelect={setDistance} />
        <FilterSection title="Time" options={["Now / Tonight", "Tomorrow", "Weekend"]} selected={time} onSelect={setTime} />
        <FilterSection title="Group Size (Optional)" options={["2–3 people", "3–5 people"]} selected={size} onSelect={setSize} />
        <FilterSection title="Vibe (Optional)" options={["Quick meal", "Chill hangout"]} selected={vibe} onSelect={setVibe} />
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-gray-50 via-gray-50 to-transparent pt-10 max-w-md mx-auto z-20 pb-8">
        <button 
          onClick={startSearch}
          className="w-full flex items-center justify-center gap-2 bg-[#DE6543] text-white py-4 rounded-2xl font-bold text-[17px] shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-transform"
        >
          <Search className="w-5 h-5" />
          Start Finding Matches
        </button>
      </div>
    </div>
  );
}

function FilterSection({ title, options, selected, onSelect }: { title: string, options: string[], selected: string, onSelect: (val: string) => void }) {
  return (
    <div className="bg-white p-5 rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100">
      <h3 className="text-[15px] font-bold text-gray-900 mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2.5">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className={`px-5 py-2.5 rounded-full text-[14px] font-bold transition-all border ${
              selected === opt
                ? "bg-[#DE6543] text-white border-[#DE6543] shadow-md shadow-orange-500/20"
                : "bg-gray-50 text-gray-600 border-transparent hover:bg-gray-100"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
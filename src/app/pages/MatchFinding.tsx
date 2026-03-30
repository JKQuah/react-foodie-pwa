import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Drawer } from "vaul";
import { Settings2 } from "lucide-react";
import { motion } from "motion/react";

export function MatchFinding() {
  const location = useLocation();
  const navigate = useNavigate();
  const foods: string[] = location.state?.foods || ["Nasi Lemak"];
  
  const [isOpen, setIsOpen] = useState(false);
  
  // Filter states
  const [distance, setDistance] = useState("Nearby (≤3km)");
  const [time, setTime] = useState("Now / Tonight");
  const [size, setSize] = useState("2–3 people");
  const [vibe, setVibe] = useState("Quick meal");

  useEffect(() => {
    // If the drawer is open, we pause the match timer so the user can filter.
    if (isOpen) return;

    const timer = setTimeout(() => {
      navigate('/match/results', { state: { foods } });
    }, 4000);

    return () => clearTimeout(timer);
  }, [isOpen, navigate, foods]);

  const foodDisplay = foods.length > 2 
    ? `${foods.slice(0, 2).join(', ')} & more` 
    : foods.join(' or ');

  return (
    <div className="pb-10 pt-12 px-5 h-full bg-white flex flex-col fixed inset-0 z-50 overflow-hidden max-w-md mx-auto items-center justify-center">
      
      <div className="relative w-48 h-48 flex items-center justify-center mb-10">
        <motion.div
          animate={{ scale: [1, 1.8, 2.2], opacity: [0.8, 0.3, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 bg-blue-100 rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.4, 1.8], opacity: [0.8, 0.3, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
          className="absolute inset-0 bg-blue-200 rounded-full"
        />
        <div className="w-24 h-24 bg-white rounded-full z-10 flex items-center justify-center shadow-lg shadow-blue-500/20 text-5xl border-4 border-blue-50">
          🍽️
        </div>
      </div>

      <h1 className="text-2xl font-extrabold text-gray-900 text-center mb-2 animate-pulse px-4">
        Finding people who want {foodDisplay}...
      </h1>
      <p className="text-gray-500 font-medium text-[15px] text-center mb-12">
        Grouping you with nearby foodies automatically.
      </p>

      <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
        <Drawer.Trigger asChild>
          <button className="flex items-center gap-2 bg-gray-50 text-gray-700 font-bold px-6 py-3.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 active:scale-95 transition-transform">
            <Settings2 className="w-5 h-5 text-gray-400" />
            Adjust Preferences
          </button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm" />
          <Drawer.Content className="bg-gray-50 flex flex-col rounded-t-[2.5rem] mt-24 fixed bottom-0 left-0 right-0 z-[70] max-h-[90vh] max-w-md mx-auto outline-none">
            <div className="p-6 bg-white rounded-t-[2.5rem] flex-1 overflow-y-auto pb-safe">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-200 mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Filters</h2>
              
              <div className="space-y-7 mb-8">
                <FilterSection title="Distance" options={["Nearby (≤3km)", "Flexible (≤10km)", "Far (≤20km)"]} selected={distance} onSelect={setDistance} />
                <FilterSection title="Time" options={["Now / Tonight", "Tomorrow", "Weekend"]} selected={time} onSelect={setTime} />
                <FilterSection title="Group Size (Optional)" options={["2–3 people", "3–5 people"]} selected={size} onSelect={setSize} />
                <FilterSection title="Vibe (Optional)" options={["Quick meal", "Chill hangout"]} selected={vibe} onSelect={setVibe} />
              </div>

              <button 
                onClick={() => setIsOpen(false)}
                className="w-full bg-[#DE6543] text-white py-4 rounded-2xl font-bold text-[17px] shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-transform"
              >
                Apply & Continue Search
              </button>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}

function FilterSection({ title, options, selected, onSelect }: { title: string, options: string[], selected: string, onSelect: (val: string) => void }) {
  return (
    <div>
      <h3 className="text-[15px] font-bold text-gray-900 mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2.5">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className={`px-5 py-2.5 rounded-full text-[14px] font-bold transition-all border ${
              selected === opt
                ? "bg-[#DE6543] text-white border-[#DE6543] shadow-md shadow-orange-500/20"
                : "bg-gray-50 text-gray-600 border-gray-100 hover:bg-gray-100"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
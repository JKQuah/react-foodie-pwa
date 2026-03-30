import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Heart, UtensilsCrossed } from "lucide-react";
import { useNavigate } from "react-router";
import { MATCH_FOODS } from "../data";

export function MatchGame() {
  // Shuffle and limit to 10 cards per session for less decision fatigue
  const getSessionCards = () => [...MATCH_FOODS].sort(() => 0.5 - Math.random()).slice(0, 10);
  
  const [cards, setCards] = useState(getSessionCards());
  const [likedFoods, setLikedFoods] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSwipe = (direction: "left" | "right", specificCard?: any) => {
    if (cards.length === 0) return;
    const targetCard = specificCard || cards[0];
    
    if (direction === "right") {
      setLikedFoods(prev => {
        if (!prev.includes(targetCard.name)) {
          return [...prev, targetCard.name];
        }
        return prev;
      });
    }

    setTimeout(() => {
      setCards(prev => prev.slice(1));
    }, 250); 
  };

  return (
    <div className="pb-32 pt-14 px-5 h-full flex flex-col bg-gray-50/50 overflow-hidden font-sans">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">What do you feel like?</h1>
        <p className="text-gray-500 text-[15px] mt-2 font-medium">Swipe right to add, left to skip</p>
      </div>

      <div className="flex-1 relative flex items-center justify-center w-full max-w-[340px] mx-auto perspective-1000">
        <AnimatePresence>
          {cards.map((card, index) => {
            const isFront = index === 0;
            if (index > 2) return null;

            return (
              <motion.div
                key={card.id}
                className="absolute w-full aspect-[3/4] rounded-[2.5rem] shadow-[0_12px_40px_rgba(0,0,0,0.08)] overflow-hidden border-[6px] border-white flex flex-col items-center justify-center cursor-grab active:cursor-grabbing"
                style={{
                  backgroundColor: card.bgColor,
                  zIndex: 10 - index,
                  rotate: isFront ? 0 : index % 2 === 0 ? index * 2 : index * -2,
                }}
                drag={isFront ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.8}
                onDragEnd={(e, { offset }) => {
                  const swipeThreshold = 80;
                  if (offset.x > swipeThreshold) {
                    handleSwipe("right", card);
                  } else if (offset.x < -swipeThreshold) {
                    handleSwipe("left", card);
                  }
                }}
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ 
                  scale: 1 - index * 0.05, 
                  opacity: 1, 
                  y: isFront ? 0 : index * 15 
                }}
                exit={{ 
                  x: 300, 
                  opacity: 0, 
                  scale: 0.8, 
                  rotate: 25, 
                  transition: { type: "spring", stiffness: 200, damping: 20 } 
                }}
                whileTap={{ scale: 1.05 }}
              >
                {/* Optional Tag Pill */}
                <div className="absolute top-6 w-full px-6 flex justify-center z-20 pointer-events-none">
                  {card.tag && (
                    <span className="bg-white/70 backdrop-blur-md px-4 py-1.5 rounded-full text-[13px] font-extrabold text-gray-700 tracking-wide shadow-sm">
                      {card.tag}
                    </span>
                  )}
                </div>

                {/* 2D Cute Illustration */}
                <div className="flex-1 flex items-center justify-center relative w-full mt-4 pointer-events-none">
                  <div className="absolute w-40 h-40 bg-white/40 rounded-full blur-xl mix-blend-overlay"></div>
                  <motion.span 
                    className="text-[120px] drop-shadow-xl z-10"
                    animate={isFront ? { y: [0, -8, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  >
                    {card.illustration}
                  </motion.span>
                </div>

                {/* Food Name Bar */}
                <div className="w-full bg-white/40 backdrop-blur-md flex items-center justify-center p-6 border-t border-white/50 pointer-events-none">
                  <h2 className="text-3xl font-extrabold text-gray-900 text-center drop-shadow-sm">{card.name}</h2>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {cards.length === 0 && (
           <motion.div 
             initial={{ scale: 0.8, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="text-center"
           >
             <div className="w-24 h-24 bg-orange-100 rounded-[2rem] mx-auto mb-6 flex items-center justify-center shadow-sm border-[4px] border-white">
               <UtensilsCrossed className="w-10 h-10 text-orange-400" />
             </div>
             <p className="text-2xl font-extrabold text-gray-900 mb-2">Menu finished!</p>
             <p className="text-gray-500 font-medium mb-6">You've seen all the cravings.</p>
             <button 
               onClick={() => { setCards(getSessionCards()); setLikedFoods([]); }} 
               className="text-[#DE6543] font-bold bg-[#DE6543]/10 px-6 py-3 rounded-2xl active:scale-95 transition-transform"
             >
               Refresh Menu
             </button>
           </motion.div>
        )}
      </div>

      <div className="flex justify-center items-center gap-4 mt-10 mb-2 z-10">
        <motion.button 
          whileTap={{ scale: 0.85 }}
          onClick={() => handleSwipe("left")}
          className="w-[64px] h-[64px] bg-white rounded-2xl flex items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,0.04)] border border-gray-100 text-gray-400 hover:text-gray-500 flex-shrink-0"
        >
          <X className="w-8 h-8 stroke-[3]" />
        </motion.button>

        <motion.button 
          key={likedFoods.length}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          disabled={likedFoods.length === 0}
          onClick={() => navigate("/match/finding", { state: { foods: likedFoods } })}
          className={`flex-1 h-[64px] rounded-2xl font-extrabold flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(0,0,0,0.06)] border ${
            likedFoods.length > 0 
              ? 'bg-[#DE6543] text-white border-[#DE6543]' 
              : 'bg-white text-gray-400 border-gray-100'
          }`}
        >
          {likedFoods.length > 0 ? (
            <span className="text-[17px]">Find Match ({likedFoods.length})</span>
          ) : (
            <span className="text-[17px]">Swipe to Pick</span>
          )}
        </motion.button>

        <motion.button 
          whileTap={{ scale: 0.85 }}
          onClick={() => handleSwipe("right")}
          className="w-[64px] h-[64px] bg-white rounded-2xl flex items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,0.04)] border border-gray-100 text-rose-400 flex-shrink-0"
        >
          <Heart className="w-7 h-7 stroke-[3] fill-current" />
        </motion.button>
      </div>
    </div>
  );
}
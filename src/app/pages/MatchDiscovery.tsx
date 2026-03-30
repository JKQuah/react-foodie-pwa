import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { RefreshCw, Check, Sparkles, X, ChevronUp } from "lucide-react";
import { Drawer } from "vaul";

export const ALL_FOODS = [
  // Local Favorites
  { id: '1', name: 'Nasi Lemak', tag: 'Local', icon: '🥥', color: '#FEF3C7' },
  { id: '2', name: 'Nasi Campur', icon: '🍛', color: '#FFEDD5' },
  { id: '3', name: 'Roti Canai', icon: '🫓', color: '#FEF9C3' },
  { id: '4', name: 'Char Kuey Teow', icon: '🍜', color: '#FED7AA' },
  { id: '5', name: 'Laksa', icon: '🍲', color: '#FECACA' },
  { id: '6', name: 'Satay', icon: '🍢', color: '#FDE68A' },
  // Noodles & Soups
  { id: '7', name: 'Ramen', tag: 'Popular', icon: '🍜', color: '#E0E7FF' },
  { id: '8', name: 'Pan Mee', icon: '🍝', color: '#FEF08A' },
  { id: '9', name: 'Wantan Mee', icon: '🥡', color: '#FFEDD5' },
  { id: '10', name: 'Mee Goreng', icon: '🍝', color: '#FDBA74' },
  { id: '11', name: 'Kuey Teow Soup', icon: '🥣', color: '#E0F2FE' },
  // Western / Casual
  { id: '12', name: 'Burger', tag: 'Craving', icon: '🍔', color: '#FEE2E2' },
  { id: '13', name: 'Fried Chicken', icon: '🍗', color: '#FFEDD5' },
  { id: '14', name: 'Steak', icon: '🥩', color: '#FECACA' },
  { id: '15', name: 'Pasta', icon: '🍝', color: '#FEF08A' },
  { id: '16', name: 'Fish & Chips', icon: '🍟', color: '#FEF9C3' },
  // Asian Popular
  { id: '17', name: 'Sushi', icon: '🍣', color: '#FCE7F3' },
  { id: '18', name: 'Korean BBQ', icon: '🥩', color: '#FEE2E2' },
  { id: '19', name: 'Bibimbap', icon: '🍲', color: '#D1FAE5' },
  { id: '20', name: 'Hotpot', tag: 'Social', icon: '🥘', color: '#FFEDD5' },
  { id: '21', name: 'Dim Sum', icon: '🥟', color: '#FEF3C7' },
  // Cafe & Light
  { id: '22', name: 'Coffee & Pastry', icon: '☕', color: '#E0E7FF' },
  { id: '23', name: 'Brunch', icon: '🍳', color: '#FEF9C3' },
  { id: '24', name: 'Sandwich', icon: '🥪', color: '#DCFCE7' },
  { id: '25', name: 'Salad Bowl', icon: '🥗', color: '#D1FAE5' },
  // Street Food / Snacks
  { id: '26', name: 'Lok Lok', icon: '🍡', color: '#FCE7F3' },
  { id: '27', name: 'Night Market', icon: '🦑', color: '#E0E7FF' },
  { id: '28', name: 'Bubble Tea', icon: '🧋', color: '#FAE8FF' },
  { id: '29', name: 'Dessert', icon: '🍧', color: '#FCE7F3' },
  // Social
  { id: '30', name: 'Pizza', tag: 'Sharing', icon: '🍕', color: '#FEE2E2' },
];

export function MatchDiscovery() {
  const navigate = useNavigate();
  const [displayedFoods, setDisplayedFoods] = useState<typeof ALL_FOODS>([]);
  const [selectedFoods, setSelectedFoods] = useState<Set<string>>(new Set());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const loadRandomFoods = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const unselectedPool = ALL_FOODS.filter(food => !selectedFoods.has(food.name));
      const shuffled = [...unselectedPool].sort(() => 0.5 - Math.random());
      setDisplayedFoods(shuffled.slice(0, 12));
      setIsRefreshing(false);
    }, 300);
  };

  useEffect(() => {
    loadRandomFoods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleSelection = (foodName: string) => {
    const next = new Set(selectedFoods);
    if (next.has(foodName)) {
      next.delete(foodName);
      if (next.size === 0) setIsDrawerOpen(false);
    } else {
      next.add(foodName);
    }
    setSelectedFoods(next);
  };

  const handleMatch = () => {
    if (selectedFoods.size === 0) return;
    navigate('/match/finding', { state: { foods: Array.from(selectedFoods) } });
  };

  const selectedItems = Array.from(selectedFoods).map(name => 
    ALL_FOODS.find(f => f.name === name)
  ).filter(Boolean);

  return (
    <div className="pb-32 pt-12 px-5 h-full bg-gray-50 flex flex-col font-sans overflow-y-auto relative">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-2">What are you craving?</h1>
        <p className="text-gray-500 font-medium text-[15px]">Tap to select your favorites. We'll find a group for you.</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={isRefreshing ? 'refreshing' : 'loaded'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-2 gap-4 pb-8"
        >
          {displayedFoods.map((food) => {
            const isSelected = selectedFoods.has(food.name);
            return (
              <motion.button
                whileTap={{ scale: 0.95 }}
                key={food.id}
                onClick={() => toggleSelection(food.name)}
                className={`relative aspect-[4/5] rounded-[2rem] p-4 flex flex-col items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all overflow-hidden ${
                  isSelected ? 'ring-4 ring-[#DE6543] bg-white' : 'border-2 border-transparent'
                }`}
                style={{ backgroundColor: isSelected ? '#ffffff' : food.color }}
              >
                {/* Check Badge */}
                {isSelected && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#DE6543] text-white flex items-center justify-center shadow-md z-20"
                  >
                    <Check className="w-5 h-5 stroke-[3]" />
                  </motion.div>
                )}

                {/* Tag */}
                {food.tag && !isSelected && (
                  <div className="absolute top-3 w-full px-3 flex justify-center z-20 pointer-events-none">
                    <span className="bg-white/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-extrabold text-gray-700 tracking-wide shadow-sm uppercase">
                      {food.tag}
                    </span>
                  </div>
                )}

                {/* 2D Cute Illustration */}
                <div className="flex-1 flex items-center justify-center relative w-full mt-4">
                  <div className="absolute w-24 h-24 bg-white/40 rounded-full blur-xl mix-blend-overlay"></div>
                  <span className="text-[70px] drop-shadow-xl z-10 filter hover:scale-110 transition-transform">
                    {food.icon}
                  </span>
                </div>

                {/* Name */}
                <div className="mt-2 w-full text-center z-10">
                  <h2 className={`font-extrabold text-[15px] leading-tight ${isSelected ? 'text-gray-900' : 'text-gray-800'}`}>
                    {food.name}
                  </h2>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Slide-Up Panel for Selections */}
      <Drawer.Root open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm" />
          <Drawer.Content className="bg-white flex flex-col rounded-t-[2.5rem] mt-24 fixed bottom-0 left-0 right-0 z-[70] max-h-[85vh] max-w-md mx-auto outline-none">
            <div className="p-6 bg-white rounded-t-[2.5rem] flex-1 overflow-y-auto pb-safe">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-200 mb-6" />
              
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Your Selection</h2>
                <span className="bg-[#DE6543] text-white px-3 py-1 rounded-full text-sm font-bold">
                  {selectedFoods.size} items
                </span>
              </div>
              
              {selectedFoods.size === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500 font-medium">Nothing selected yet!</p>
                </div>
              ) : (
                <div className="space-y-3 mb-8">
                  {selectedItems.map((item) => item && (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      key={item.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl">
                          {item.icon}
                        </div>
                        <span className="font-bold text-gray-900 text-[16px]">{item.name}</span>
                      </div>
                      <button 
                        onClick={() => toggleSelection(item.name)}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}

              <button 
                onClick={() => { setIsDrawerOpen(false); handleMatch(); }}
                disabled={selectedFoods.size === 0}
                className={`w-full py-4 rounded-2xl font-bold text-[17px] shadow-lg active:scale-[0.98] transition-transform ${
                  selectedFoods.size > 0 ? 'bg-[#DE6543] text-white shadow-orange-500/20' : 'bg-gray-200 text-gray-400'
                }`}
              >
                Find Match Now
              </button>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

      {/* Floating Bottom Button Bar */}
      <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-5 max-w-md mx-auto pointer-events-none">
        <div className="mb-24 pointer-events-auto bg-white/90 backdrop-blur-xl border border-gray-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-[2rem] p-2 flex gap-2 w-full">
          
          {/* Refresh Button */}
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={loadRandomFoods}
            className="w-[60px] h-[60px] bg-gray-50 border border-gray-100 text-gray-600 rounded-[1.5rem] flex items-center justify-center shadow-sm active:scale-95 transition-all flex-shrink-0"
          >
            <RefreshCw className={`w-[22px] h-[22px] ${isRefreshing ? 'animate-spin' : ''}`} />
          </motion.button>

          {/* Number / Slide-up Button */}
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsDrawerOpen(true)}
            className="w-[60px] h-[60px] relative bg-orange-50 border border-orange-100 text-orange-600 rounded-[1.5rem] flex flex-col items-center justify-center shadow-sm active:scale-95 transition-all flex-shrink-0"
          >
            <span className="font-extrabold text-[18px] leading-none mb-0.5">{selectedFoods.size}</span>
            
            {/* Ping indicator if selected */}
            {selectedFoods.size > 0 && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DE6543] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#DE6543] border-2 border-white"></span>
              </span>
            )}
          </motion.button>

          {/* Find Match Button */}
          <motion.button 
            whileTap={{ scale: selectedFoods.size > 0 ? 0.95 : 1 }}
            onClick={handleMatch}
            disabled={selectedFoods.size === 0}
            className={`flex-1 h-[60px] rounded-[1.5rem] flex items-center justify-center font-bold text-[16px] shadow-sm transition-all ${
              selectedFoods.size > 0 
                ? 'bg-[#DE6543] text-white' 
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            {selectedFoods.size > 0 ? (
              <span className="flex items-center gap-2">
                <Sparkles className="w-[18px] h-[18px]" />
                Find Match ({selectedFoods.size})
              </span>
            ) : (
              "Select Foods"
            )}
          </motion.button>

        </div>
      </div>
    </div>
  );
}
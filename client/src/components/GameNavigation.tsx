import { Button } from "@/components/ui/button";
import { Settings, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FaCrosshairs } from "react-icons/fa";
import { AiFillFire } from "react-icons/ai";
import { BsFillSuitSpadeFill } from "react-icons/bs";

interface GameNavigationProps {
  activeGame: string;
  setActiveGame: (game: string) => void;
  toggleAdminPanel: () => void;
  isAdmin: boolean;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

export default function GameNavigation({ 
  activeGame, 
  setActiveGame, 
  toggleAdminPanel,
  isAdmin,
  isOpen = true,
  setIsOpen = () => {}
}: GameNavigationProps) {
  return (
    <div className="flex flex-wrap justify-center items-center mb-8 border-b border-purple-900/50 pb-4 space-x-2 md:space-x-8 relative bg-gray-800/30 py-2 rounded-t-lg shadow-lg">
      {/* Close button (X) in the top-right corner */}
      <button 
        className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors duration-200"
        onClick={() => setIsOpen(false)}
        aria-label="Close navigation"
      >
        <X size={20} />
      </button>
      
      <button 
        className={`game-tab py-2 px-4 text-lg font-orbitron flex items-center gap-2 transition-all duration-200 ${
          activeGame === 'crossfire' 
            ? 'tab-active text-red-500' 
            : 'text-gray-400 hover:text-gray-200'
        }`} 
        onClick={() => setActiveGame('crossfire')}
      >
        <FaCrosshairs className={activeGame === 'crossfire' ? 'text-red-500' : 'text-gray-500'} />
        <span>CrossFire</span>
      </button>
      
      <button 
        className={`game-tab py-2 px-4 text-lg font-orbitron flex items-center gap-2 transition-all duration-200 ${
          activeGame === 'pubg' 
            ? 'tab-active text-yellow-500' 
            : 'text-gray-400 hover:text-gray-200'
        }`}
        onClick={() => setActiveGame('pubg')}
      >
        <BsFillSuitSpadeFill className={activeGame === 'pubg' ? 'text-yellow-500' : 'text-gray-500'} />
        <span>PUBG Mobile</span>
      </button>
      
      <button 
        className={`game-tab py-2 px-4 text-lg font-orbitron flex items-center gap-2 transition-all duration-200 ${
          activeGame === 'freefire' 
            ? 'tab-active text-green-500' 
            : 'text-gray-400 hover:text-gray-200'
        }`}
        onClick={() => setActiveGame('freefire')}
      >
        <AiFillFire className={activeGame === 'freefire' ? 'text-green-500' : 'text-gray-500'} />
        <span>Free Fire</span>
      </button>
    </div>
  );
}

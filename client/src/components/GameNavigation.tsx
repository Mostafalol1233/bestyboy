import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FaCrosshairs } from "react-icons/fa";
import { AiFillFire } from "react-icons/ai";
import { BsFillSuitSpadeFill } from "react-icons/bs";

interface GameNavigationProps {
  activeGame: string;
  setActiveGame: (game: string) => void;
  toggleAdminPanel: () => void;
  isAdmin: boolean;
}

export default function GameNavigation({ 
  activeGame, 
  setActiveGame, 
  toggleAdminPanel,
  isAdmin
}: GameNavigationProps) {
  return (
    <div className="flex flex-wrap justify-center items-center mb-8 border-b border-purple-900/30 pb-4 space-x-2 md:space-x-8 relative">
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
      
      {isAdmin && (
        <div className="absolute right-0 top-0">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={toggleAdminPanel}
                  className="text-purple-400 hover:text-purple-300 hover:border-purple-600 transition-colors"
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Admin Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
    <div className="flex flex-wrap justify-center mb-8 border-b border-gray-800 pb-4 space-x-2 md:space-x-8 relative">
      <button 
        className={`game-tab py-2 px-4 text-lg font-rajdhani ${activeGame === 'crossfire' ? 'tab-active' : 'text-gray-400'}`} 
        onClick={() => setActiveGame('crossfire')}
      >
        CrossFire
      </button>
      <button 
        className={`game-tab py-2 px-4 text-lg font-rajdhani ${activeGame === 'pubg' ? 'tab-active' : 'text-gray-400'}`}
        onClick={() => setActiveGame('pubg')}
      >
        PUBG Mobile
      </button>
      <button 
        className={`game-tab py-2 px-4 text-lg font-rajdhani ${activeGame === 'freefire' ? 'tab-active' : 'text-gray-400'}`}
        onClick={() => setActiveGame('freefire')}
      >
        Free Fire
      </button>
      
      {isAdmin && (
        <div className="absolute right-0 top-0">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={toggleAdminPanel}
                  className="text-gray-400 hover:text-white transition-colors"
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

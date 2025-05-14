import { useMemo } from "react";
import { Voucher } from "@shared/schema";
import GameCard from "@/components/GameCard";
import { Skeleton } from "@/components/ui/skeleton";

// Game background images
const baseUrl = window.location.origin;
const gameBackgrounds = {
  crossfire: `${baseUrl}/attached_assets/FB_IMG_1747248207377.jpg`,
  pubg: `${baseUrl}/attached_assets/images(5).jpg`,
  freefire: `${baseUrl}/attached_assets/FB_IMG_1747248882099.jpg`
};

// Game section titles
const gameTitles = {
  crossfire: {
    main: "CrossFire",
    accent: "Vouchers",
    color: "text-red-500"
  },
  pubg: {
    main: "PUBG Mobile",
    accent: "Vouchers",
    color: "text-yellow-500"
  },
  freefire: {
    main: "Free Fire",
    accent: "Vouchers",
    color: "text-green-500"
  }
};

// Buy button color by game type - Now using gaming-btn class

interface GameSectionProps {
  gameType: string;
  vouchers: Voucher[];
  isLoading: boolean;
}

export default function GameSection({ 
  gameType, 
  vouchers,
  isLoading
}: GameSectionProps) {
  const { main, accent, color } = useMemo(() => 
    gameTitles[gameType as keyof typeof gameTitles] || gameTitles.crossfire,
    [gameType]
  );
  
  const background = useMemo(() => 
    gameBackgrounds[gameType as keyof typeof gameBackgrounds] || gameBackgrounds.crossfire,
    [gameType]
  );
  
  // We're now using the gaming-btn class instead of custom button styles
  const buttonStyle = "";

  return (
    <section className="game-section mb-10">
      {/* Game Hero Banner */}
      <div className="game-bg rounded-xl overflow-hidden mb-8 relative h-48 md:h-64 shadow-[0_0_15px_rgba(124,58,237,0.5)] border border-purple-900">
        <img 
          src={background} 
          alt={`${main} game background`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <h2 className="text-3xl md:text-6xl font-orbitron font-bold text-white text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {main} <span className={color + " neon-text"}>{accent}</span>
          </h2>
        </div>
      </div>
      
      {/* Game Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Loading skeletons
          Array(3).fill(0).map((_, index) => (
            <div key={`skeleton-${index}`} className="game-card">
              <Skeleton className="h-40 w-full" />
              <div className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2 mx-auto" />
                <Skeleton className="h-4 w-5/6 mb-4 mx-auto" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            </div>
          ))
        ) : vouchers.length > 0 ? (
          // Actual voucher cards
          vouchers.map((voucher) => (
            <GameCard 
              key={voucher.id}
              voucher={voucher}
              buttonStyle={buttonStyle}
            />
          ))
        ) : (
          // No vouchers found
          <div className="col-span-full text-center py-10">
            <h3 className="text-xl font-medium text-gray-400">No vouchers available for this game.</h3>
          </div>
        )}
      </div>
    </section>
  );
}

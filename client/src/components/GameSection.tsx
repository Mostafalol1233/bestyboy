import { useMemo } from "react";
import { Voucher } from "@shared/schema";
import GameCard from "@/components/GameCard";
import { Skeleton } from "@/components/ui/skeleton";

// Game background images
const gameBackgrounds = {
  crossfire: "https://cdn.akamai.steamstatic.com/steam/apps/1150/header.jpg?t=1624467053",
  pubg: "https://cdn1.epicgames.com/offer/4f85a887f57a40b88d5d27c36fceb7df/EGS_PUBGBATTLEGROUNDS_KraftonInc_S1_2560x1440-fb7aeacea0277acd08caf4b246773880",
  freefire: "https://cdn.pocket-lint.com/r/s/970x/assets/images/159604-games-review-garena-free-fire-image1-e2nakk37tw-jpg.webp"
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
      <div className="game-bg rounded-xl overflow-hidden mb-8 relative h-48 md:h-64">
        <img 
          src={background} 
          alt={`${main} game background`} 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <h2 className="text-3xl md:text-5xl font-rajdhani font-bold text-white text-center">
            {main} <span className={color}>{accent}</span>
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

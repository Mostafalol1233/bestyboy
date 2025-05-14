import { useMemo } from "react";
import { Voucher } from "@shared/schema";
import GameCard from "@/components/GameCard";
import { Skeleton } from "@/components/ui/skeleton";

// Game background images
const gameBackgrounds = {
  crossfire: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=500",
  pubg: "https://pixabay.com/get/g0ee5207bfa58adebc1ceed150ddd46cf189eb1e2b7b0ac6e7dace4c1022bed7e0e0c350e11e5591cc4254c5ff9d77e573a63b86dfbb46fe702b331ad019d8edc_1280.jpg",
  freefire: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=500"
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

// Buy button color by game type
const buyButtonColors = {
  crossfire: "bg-blue-500 hover:bg-blue-600",
  pubg: "bg-yellow-500 hover:bg-yellow-600 text-black",
  freefire: "bg-green-500 hover:bg-green-600"
};

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
  
  const buttonStyle = useMemo(() => 
    buyButtonColors[gameType as keyof typeof buyButtonColors] || buyButtonColors.crossfire,
    [gameType]
  );

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

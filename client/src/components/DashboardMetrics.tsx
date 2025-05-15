import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Voucher } from "@shared/schema";

interface DashboardMetricsProps {
  vouchers: Voucher[];
}

interface GameStats {
  totalVouchers: number;
  totalValue: number;
  averageBonus: number;
  highestPrice: number;
  lowestPrice: number;
}

export default function DashboardMetrics({ vouchers }: DashboardMetricsProps) {
  const [gameTypeStats, setGameTypeStats] = useState<Record<string, GameStats>>({});
  const [totalStats, setTotalStats] = useState<GameStats>({
    totalVouchers: 0,
    totalValue: 0,
    averageBonus: 0,
    highestPrice: 0,
    lowestPrice: 0
  });

  useEffect(() => {
    // Process vouchers to calculate statistics by game type
    const stats: Record<string, GameStats> = {};
    const gameTypes = Array.from(new Set(vouchers.map(v => v.gameType)));
    
    let overallHighestPrice = 0;
    let overallLowestPrice = Infinity;
    let overallTotalVouchers = 0;
    let overallTotalValue = 0;
    let overallTotalBonus = 0;
    
    gameTypes.forEach(gameType => {
      const gameVouchers = vouchers.filter(v => v.gameType === gameType);
      const totalVouchers = gameVouchers.length;
      const totalValue = gameVouchers.reduce((sum, v) => sum + v.amount, 0);
      const totalBonus = gameVouchers.reduce((sum, v) => sum + v.bonus, 0);
      const averageBonus = totalBonus / totalVouchers;
      
      const prices = gameVouchers.map(v => v.price || 0).filter(p => p > 0);
      const highestPrice = Math.max(...(prices.length ? prices : [0]));
      const lowestPrice = Math.min(...(prices.length ? prices : [Infinity]));
      
      // Update overall statistics
      overallTotalVouchers += totalVouchers;
      overallTotalValue += totalValue;
      overallTotalBonus += totalBonus;
      overallHighestPrice = Math.max(overallHighestPrice, highestPrice);
      overallLowestPrice = Math.min(overallLowestPrice, lowestPrice === Infinity ? Infinity : lowestPrice);
      
      stats[gameType] = {
        totalVouchers,
        totalValue,
        averageBonus,
        highestPrice,
        lowestPrice: lowestPrice === Infinity ? 0 : lowestPrice
      };
    });
    
    // Calculate overall averages
    setTotalStats({
      totalVouchers: overallTotalVouchers,
      totalValue: overallTotalValue,
      averageBonus: overallTotalVouchers ? overallTotalBonus / overallTotalVouchers : 0,
      highestPrice: overallHighestPrice,
      lowestPrice: overallLowestPrice === Infinity ? 0 : overallLowestPrice
    });
    
    setGameTypeStats(stats);
  }, [vouchers]);

  // Format game type for display
  const formatGameType = (type: string): string => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div className="dashboard-metrics w-full mb-6">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="all" className="font-orbitron">All Games</TabsTrigger>
          {Object.keys(gameTypeStats).map(gameType => (
            <TabsTrigger key={gameType} value={gameType} className="font-orbitron">
              {formatGameType(gameType)}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatsCard
              title="Total Vouchers"
              value={totalStats.totalVouchers.toString()}
              description="Across all games"
              className="bg-purple-900/20"
              icon="🎮"
            />
            <StatsCard
              title="Total Value"
              value={`${(totalStats.totalValue / 1000).toFixed(0)}K`}
              description="Currency value"
              className="bg-green-900/20"
              icon="💰"
            />
            <StatsCard
              title="Average Bonus"
              value={totalStats.averageBonus.toFixed(0)}
              description="Per voucher"
              className="bg-blue-900/20"
              icon="🎁"
            />
            <StatsCard
              title="Price Range"
              value={`${totalStats.lowestPrice} - ${totalStats.highestPrice}`}
              description="جنيه مصري"
              className="bg-red-900/20"
              icon="💲"
            />
          </div>
        </TabsContent>
        
        {Object.entries(gameTypeStats).map(([gameType, stats]) => (
          <TabsContent key={gameType} value={gameType} className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatsCard
                title={`${formatGameType(gameType)} Vouchers`}
                value={stats.totalVouchers.toString()}
                description="Total count"
                className="bg-purple-900/20"
                icon="🎮"
              />
              <StatsCard
                title="Total Value"
                value={`${(stats.totalValue / 1000).toFixed(0)}K`}
                description={gameType === 'crossfire' ? 'ZP' : gameType === 'pubg' ? 'UC' : 'Diamonds'}
                className="bg-green-900/20"
                icon="💰"
              />
              <StatsCard
                title="Average Bonus"
                value={stats.averageBonus.toFixed(0)}
                description="Per voucher"
                className="bg-blue-900/20"
                icon="🎁"
              />
              <StatsCard
                title="Price Range"
                value={`${stats.lowestPrice} - ${stats.highestPrice}`}
                description="جنيه مصري"
                className="bg-red-900/20"
                icon="💲"
              />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  className?: string;
  icon: string;
}

function StatsCard({ title, value, description, className, icon }: StatsCardProps) {
  return (
    <Card className={`border border-purple-900/30 ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-2xl">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
import { useState, useEffect } from "react";
import GameNavigation from "@/components/GameNavigation";
import GameSection from "@/components/GameSection";
import { useToast } from "@/hooks/use-toast";
import { useVouchers } from "@/hooks/use-vouchers";
import { useAuth } from "@/hooks/use-auth";
import AdminPanel from "@/components/AdminPanel";

export default function Home() {
  const [activeGame, setActiveGame] = useState<string>("crossfire");
  const [adminPanelVisible, setAdminPanelVisible] = useState(false);
  const { isAdmin } = useAuth();
  const { 
    vouchers,
    isLoading,
    isError,
    refetch
  } = useVouchers(activeGame);
  const { toast } = useToast();
  
  useEffect(() => {
    refetch();
  }, [activeGame, refetch]);

  useEffect(() => {
    if (isError) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load vouchers. Please try again later.",
      });
    }
  }, [isError, toast]);

  const toggleAdminPanel = () => {
    if (isAdmin) {
      setAdminPanelVisible(!adminPanelVisible);
    } else {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "You need admin privileges to access this panel.",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 relative">
      {isAdmin && adminPanelVisible && (
        <AdminPanel 
          onClose={() => setAdminPanelVisible(false)}
          gameTypes={["crossfire", "pubg", "freefire"]}
          activeGame={activeGame}
        />
      )}
      
      <GameNavigation 
        activeGame={activeGame} 
        setActiveGame={setActiveGame}
        toggleAdminPanel={toggleAdminPanel}
        isAdmin={isAdmin}
      />

      <GameSection 
        gameType={activeGame}
        vouchers={vouchers || []}
        isLoading={isLoading}
      />
      
      {/* Featured Anime Character - Only visible on desktop */}
      <div className="fixed bottom-0 right-0 md:right-10 z-10 pointer-events-none hidden md:block">
        <img 
          src="https://images.unsplash.com/photo-1534237710431-e2fc698436d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&h=400" 
          alt="Gaming character" 
          className="h-60 w-auto object-contain opacity-80"
        />
      </div>
    </div>
  );
}

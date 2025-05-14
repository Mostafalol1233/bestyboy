import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import GameNavigation from "@/components/GameNavigation";
import GameSection from "@/components/GameSection";
import { useToast } from "@/hooks/use-toast";
import { useVouchers } from "@/hooks/use-vouchers";
import { useAuth } from "@/hooks/use-auth";
import AdminPanel from "@/components/AdminPanel";

export default function Home() {
  const [activeGame, setActiveGame] = useState<string>("crossfire");
  const [adminPanelVisible, setAdminPanelVisible] = useState(false);
  const [, navigate] = useLocation();
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
  
  // Add keyboard shortcuts for admin access
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+Shift+A to navigate to admin login page
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        navigate('/admin');
      }
      
      // Ctrl+Shift+P to toggle admin panel for authenticated admins
      if (event.ctrlKey && event.shiftKey && event.key === 'P') {
        if (isAdmin) {
          setAdminPanelVisible(!adminPanelVisible);
          toast({
            title: adminPanelVisible ? "Admin Panel Closed" : "Admin Panel Opened",
            description: adminPanelVisible 
              ? "Admin panel has been hidden" 
              : "Welcome to the admin panel. You can manage vouchers here.",
            variant: "default"
          });
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate, isAdmin, adminPanelVisible]);

  const toggleAdminPanel = () => {
    if (isAdmin) {
      setAdminPanelVisible(!adminPanelVisible);
      toast({
        title: adminPanelVisible ? "Admin Panel Closed" : "Admin Panel Opened",
        description: adminPanelVisible 
          ? "Admin panel has been hidden" 
          : "Welcome to the admin panel. You can manage vouchers here.",
        variant: "default"
      });
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
      
      {/* Featured Gaming Character - Only visible on desktop */}
      <div className="fixed bottom-0 right-0 md:right-10 z-10 pointer-events-none hidden md:block">
        <img 
          src="/attached_assets/FB_IMG_1747248882099.jpg" 
          alt="Gaming character" 
          className="h-72 w-auto object-contain"
        />
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import GameNavigation from "@/components/GameNavigation";
import GameSection from "@/components/GameSection";
import { useToast } from "@/hooks/use-toast";
import { useVouchers } from "@/hooks/use-vouchers";
import { useAuth } from "@/hooks/use-auth";
import AdminPanel from "@/components/AdminPanel";
import { X, Settings } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [activeGame, setActiveGame] = useState<string>("crossfire");
  const [adminPanelVisible, setAdminPanelVisible] = useState(false);
  const [redeemCode, setRedeemCode] = useState("");
  const [showNavigation, setShowNavigation] = useState(true);
  const redeemDialogCloseRef = useRef<HTMLButtonElement>(null);
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
  
  // Handle redeem code verification
  const handleRedeemCode = () => {
    if (redeemCode === "00001") {
      // Close the dialog
      if (redeemDialogCloseRef.current) {
        redeemDialogCloseRef.current.click();
      }
      
      // Navigate to admin page for login
      navigate('/admin');
      
      // Notify user
      toast({
        title: "Code Accepted",
        description: "Redirecting to admin login page...",
        variant: "default"
      });
    } else {
      toast({
        variant: "destructive",
        title: "Invalid Code",
        description: "The code you entered is not valid.",
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
      
      {/* Settings button visible when admin is logged in */}
      {isAdmin && (
        <Button 
          variant="outline" 
          onClick={toggleAdminPanel}
          className="fixed top-5 right-5 z-50 gaming-btn bg-purple-700 hover:bg-purple-800 shadow-glow-green flex items-center gap-2"
        >
          <Settings size={18} /> Admin Settings
        </Button>
      )}
        
      {/* Redeem Code Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            className="fixed bottom-5 right-5 z-50 gaming-btn shadow-glow-green"
          >
            Redeem Code
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-card border-purple-800">
          <DialogHeader>
            <DialogTitle className="text-xl font-orbitron text-white">Enter Redeem Code</DialogTitle>
            <DialogDescription>
              Enter your code to access exclusive admin features.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Enter code..."
              className="bg-background/50 border-purple-800"
              value={redeemCode}
              onChange={(e) => setRedeemCode(e.target.value)}
            />
            <Button 
              className="gaming-btn w-full" 
              onClick={handleRedeemCode}
            >
              Verify Code
            </Button>
          </div>
          <DialogClose ref={redeemDialogCloseRef} className="hidden" />
        </DialogContent>
      </Dialog>
      
      {showNavigation && (
        <GameNavigation 
          activeGame={activeGame}
          setActiveGame={setActiveGame}
          toggleAdminPanel={toggleAdminPanel}
          isAdmin={isAdmin}
          isOpen={showNavigation}
          setIsOpen={setShowNavigation}
        />
      )}
      
      {!showNavigation && (
        <Button 
          variant="ghost" 
          className="mb-4 text-purple-400 hover:text-purple-300 hover:bg-purple-900/20"
          onClick={() => setShowNavigation(true)}
        >
          Show Game Navigation
        </Button>
      )}

      <GameSection 
        gameType={activeGame}
        vouchers={vouchers || []}
        isLoading={isLoading}
      />
      
      {/* Featured Gaming Character - Only visible on desktop */}
      {!adminPanelVisible && (
        <div className="fixed bottom-0 right-0 md:right-10 z-10 hidden md:block relative">
          <button 
            onClick={() => {
              document.getElementById('characterImage')?.classList.add('hidden');
            }}
            className="absolute top-0 right-0 bg-red-600 rounded-full w-8 h-8 flex items-center justify-center 
                      cursor-pointer z-20 shadow-lg transform translate-x-4 -translate-y-4"
            aria-label="Close character image"
          >
            <X size={18} className="text-white" />
          </button>
          <img 
            id="characterImage"
            src={`${window.location.origin}/attached_assets/FB_IMG_1747248882099.jpg`}
            alt="Gaming character" 
            className="h-72 w-auto object-contain pointer-events-none"
          />
        </div>
      )}
    </div>
  );
}

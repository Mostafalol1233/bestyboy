import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import GameNavigation from "@/components/GameNavigation";
import GameSection from "@/components/GameSection";
import { useToast } from "@/hooks/use-toast";
import { useVouchers } from "@/hooks/use-vouchers";
import { useAuth } from "@/hooks/use-auth";
import AdminPanel from "@/components/AdminPanel";
import { X, Settings, Play } from "lucide-react";
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
// Import config values - will be populated with hardcoded values for now
const redeemCodes = {
  admin: "00001",
  crossfireVideo: "11111",
  pubgVideo: "22222", 
  freefireVideo: "33333"
};

const gameVideos = {
  crossfire: "https://www.youtube.com/watch?v=SxTaf18Hndw",
  pubg: "https://www.youtube.com/watch?v=SxTaf18Hndw",
  freefire: "https://www.youtube.com/watch?v=SxTaf18Hndw"
};

export default function Home() {
  const [activeGame, setActiveGame] = useState<string>("crossfire");
  const [adminPanelVisible, setAdminPanelVisible] = useState(false);
  const [redeemCode, setRedeemCode] = useState("");
  const [showNavigation, setShowNavigation] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoGameType, setVideoGameType] = useState("");
  const redeemDialogCloseRef = useRef<HTMLButtonElement>(null);
  const videoDialogCloseRef = useRef<HTMLButtonElement>(null);
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
    // Admin access code
    if (redeemCode === redeemCodes.admin) {
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
      
      // Reset code
      setRedeemCode("");
      return;
    }
    
    // Game video codes
    if (redeemCode === redeemCodes.crossfireVideo) {
      showGameVideo('crossfire');
      return;
    }
    
    if (redeemCode === redeemCodes.pubgVideo) {
      showGameVideo('pubg');
      return;
    }
    
    if (redeemCode === redeemCodes.freefireVideo) {
      showGameVideo('freefire');
      return;
    }
    
    // Invalid code
    toast({
      variant: "destructive",
      title: "Invalid Code",
      description: "The code you entered is not valid.",
    });
  };
  
  // Show game video in a dialog
  const showGameVideo = (gameType: 'crossfire' | 'pubg' | 'freefire') => {
    // Close the redeem code dialog
    if (redeemDialogCloseRef.current) {
      redeemDialogCloseRef.current.click();
    }
    
    // Set video details
    setVideoGameType(gameType);
    setVideoUrl(gameVideos[gameType]);
    
    // Show video dialog
    setShowVideo(true);
    
    // Reset code
    setRedeemCode("");
    
    // Notify user
    toast({
      title: "Exclusive Content Unlocked",
      description: `Watch the exclusive ${gameType.charAt(0).toUpperCase() + gameType.slice(1)} video!`,
      variant: "default"
    });
    
    // Automatically close video after 10 seconds
    setTimeout(() => {
      setShowVideo(false);
    }, 10000); // 10 seconds
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
              Enter your code to access exclusive features & videos.
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
      
      {/* Game Video Dialog */}
      {showVideo && (
        <Dialog open={showVideo} onOpenChange={setShowVideo}>
          <DialogContent className="sm:max-w-2xl sm:max-h-screen bg-black border-purple-800 p-0 overflow-hidden">
            <DialogHeader className="p-4 bg-gradient-to-r from-black to-purple-900/50">
              <DialogTitle className="text-xl font-orbitron text-white flex items-center">
                <Play className="mr-2 text-red-500" /> 
                Exclusive {videoGameType.charAt(0).toUpperCase() + videoGameType.slice(1)} Video
              </DialogTitle>
            </DialogHeader>
            <div className="w-full h-[56.25vw] max-h-[calc(90vh-6rem)] bg-black flex items-center justify-center">
              <iframe 
                width="100%" 
                height="100%" 
                src={videoUrl.replace('watch?v=', 'embed/') + '?autoplay=1&controls=0'} 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                title={`${videoGameType} Video`}
              ></iframe>
            </div>
            <div className="p-4 flex justify-end">
              <Button 
                className="gaming-btn bg-red-600 hover:bg-red-700" 
                onClick={() => setShowVideo(false)}
              >
                Close Video
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
      
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

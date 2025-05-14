import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { FaFacebook, FaYoutube, FaGamepad } from "react-icons/fa";
import { useAuth } from "@/hooks/use-auth";

export default function Header() {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const [location] = useLocation();
  
  // Only show admin controls when already authenticated or on the admin page
  const showAdminControls = isAuthenticated || location === "/admin";

  return (
    <header className="py-4 px-4 md:px-8 flex items-center justify-between border-b border-purple-900/30">
      {/* Logo */}
      <Link href="/">
        <div className="flex items-center gap-2 cursor-pointer">
          <img 
            src={`${window.location.origin}/assets/FB_IMG_1747248882099.jpg`} 
            alt="Highway Gaming" 
            className="w-10 h-10 rounded-full border-2 border-purple-600"
          />
          <span className="text-2xl md:text-3xl font-orbitron font-bold text-white neon-text">
            <span className="text-purple-500">Highway</span>
            <span className="text-red-500">Gaming</span>
          </span>
        </div>
      </Link>
      
      {/* Social Media and Admin Links */}
      <div className="flex items-center space-x-4">
        <a 
          href="https://www.facebook.com/share/1A6xtu99yR/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-blue-500 transition-colors"
          aria-label="Facebook"
        >
          <FaFacebook className="text-xl" />
        </a>
        <a 
          href="https://m.youtube.com/c/HighWayGaming" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-red-500 transition-colors"
          aria-label="YouTube"
        >
          <FaYoutube className="text-xl" />
        </a>
        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            {isAdmin && (
              <span className="text-xs text-purple-400 font-medium hidden md:inline">Admin</span>
            )}
            <Button 
              className="gaming-btn bg-red-600 hover:bg-red-700"
              size="sm" 
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          showAdminControls && (
            <Link href="/admin">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-gray-400 hover:text-purple-400"
              >
                Admin
              </Button>
            </Link>
          )
        )}
      </div>
    </header>
  );
}

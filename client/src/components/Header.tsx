import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { useAuth } from "@/hooks/use-auth";

export default function Header() {
  const { isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <header className="py-4 px-4 md:px-8 flex items-center justify-between border-b border-gray-800">
      {/* Logo */}
      <Link href="/">
        <a className="text-2xl md:text-3xl font-rajdhani font-bold text-white">
          <span className="text-blue-500">Highway</span>
          <span className="text-red-500">Gaming</span>
        </a>
      </Link>
      
      {/* Social Media and Admin Links */}
      <div className="flex items-center space-x-4">
        <a 
          href="https://www.facebook.com/share/1A6xtu99yR/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors"
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
              <span className="text-xs text-emerald-500 font-medium hidden md:inline">Admin</span>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={logout}
              className="text-gray-400 hover:text-white"
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link href="/admin">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              Admin
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}

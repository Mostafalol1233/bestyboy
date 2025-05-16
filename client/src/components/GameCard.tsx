import { Voucher } from "@shared/schema";
import { FaWhatsapp, FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";

interface GameCardProps {
  voucher: Voucher;
  buttonStyle: string;
}

export default function GameCard({ voucher, buttonStyle }: GameCardProps) {
  // Get the appropriate image for the card based on game type and amount
  const getCardImage = (voucher: Voucher): string => {
    const { gameType, amount } = voucher;
    
    if (gameType === 'crossfire') {
      // Different CrossFire images based on card value
      if (amount === 5000) return 'images(3).jpg';
      if (amount === 10000) return 'images(2).jpg';
      if (amount === 20000) return 'images(1).jpg';
      if (amount === 50000) return 'images(1).jpg';
      if (amount === 100000) return 'images.jpg';
      return 'images.jpg'; // Default
    }
    
    if (gameType === 'pubg') {
      // Different PUBG images based on card value
      if (amount === 5000) return 'images(4).jpg';
      if (amount === 10000) return 'images(5).jpg';
      if (amount === 50000) return 'images(6).jpg';
      return 'images(5).jpg'; // Default
    }
    
    if (gameType === 'freefire') {
      // Updated Free Fire images with new assets
      if (amount === 5000) return 'freefire.png'; 
      if (amount === 10000) return 'freefire2.png';
      if (amount === 50000) return 'freefire.png';
      return 'freefire2.png'; // Default
    }
    
    // Fallback image 
    return 'image_1747413124482.png';
  };
  const formattedAmount = voucher.amount.toLocaleString();
  const formattedK = (voucher.amount / 1000).toFixed(0);
  
  // Format description based on game type
  const getFormattedDescription = () => {
    let bonus = "";
    if (voucher.bonus) {
      const bonusInK = (voucher.bonus/1000).toFixed(0);
      if (voucher.gameType === 'crossfire') bonus = `+ ${bonusInK}k zp bonus`;
      if (voucher.gameType === 'pubg') bonus = `+ ${bonusInK}k UC bonus`;
      if (voucher.gameType === 'freefire') bonus = `+ ${bonusInK}k Diamonds bonus`;
    }
    
    const gameType = voucher.gameType.toLowerCase();
    return `${gameType} card ${formattedK}k ${bonus}`.trim();
  };
  
  // Generate WhatsApp link with custom message based on card value
  const generateWhatsAppLink = () => {
    const message = encodeURIComponent(`I want to buy ${getFormattedDescription()}`);
    return `https://wa.me/201096065772?text=${message}`;
  };

  return (
    <motion.div 
      className="game-card border border-purple-900"
      whileHover={{ y: -8, scale: 1.03, boxShadow: '0 0 25px rgba(124, 58, 237, 0.4)' }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={`/assets/${getCardImage(voucher)}`}
          alt={`${voucher.gameType} game card`} 
          className="w-full h-full object-cover"
          style={{ imageRendering: 'high-quality', maxWidth: '100%' }}
        />
        
        <div className="absolute top-3 right-3">
          <div className="price-badge flex items-center justify-center">
            <span className="gaming-digits">{formattedK}K {voucher.currency}</span>
          </div>
        </div>
        
        <div className="absolute bottom-3 left-3">
          <div className="bonus-badge flex items-center justify-center">
            <span className="gaming-digits">+{(voucher.bonus/1000).toFixed(0)}K BONUS</span>
          </div>
        </div>
        
        {/* Price badge */}
        <div className="absolute top-3 left-3">
          <div className="real-price-badge flex items-center justify-center bg-green-600 rounded-md px-2 py-1 shadow-glow-green">
            <span className="gaming-digits text-white text-sm font-bold" lang="en">
              {/* Get price based on amount if voucher.price is undefined */}
              {(() => {
                // Default prices based on amount
                let defaultPrice = 120; // 5k
                if (voucher.amount === 10000) defaultPrice = 240; // 10k
                if (voucher.amount === 20000) defaultPrice = 455; // 20k
                if (voucher.amount === 50000) defaultPrice = 1120; // 50k
                if (voucher.amount === 100000) defaultPrice = 2300; // 100k
                
                // Use actual price if available, otherwise use calculated default
                const actualPrice = voucher.price || defaultPrice;
                return `${actualPrice} ج.م`;
              })()}
            </span>
          </div>
        </div>
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h3 className="font-orbitron text-2xl font-bold text-white text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] neon-text">
            {voucher.gameType.charAt(0).toUpperCase() + voucher.gameType.slice(1)}
          </h3>
        </div>
      </div>
      
      <div className="p-5 text-center">
        <p className="text-gray-300 mb-5 line-clamp-2 font-medium">{getFormattedDescription()}</p>
        <a 
          href={generateWhatsAppLink()} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="gaming-btn w-full flex items-center justify-center gap-2 py-3"
        >
          <FaShoppingCart className="text-lg" /> Buy Now
        </a>
      </div>
    </motion.div>
  );
}

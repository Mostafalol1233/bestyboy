import { Voucher } from "@shared/schema";
import { FaWhatsapp } from "react-icons/fa";

interface GameCardProps {
  voucher: Voucher;
  buttonStyle: string;
}

export default function GameCard({ voucher, buttonStyle }: GameCardProps) {
  const formattedAmount = voucher.amount.toLocaleString();
  
  // Generate WhatsApp link with custom message based on card value
  const generateWhatsAppLink = () => {
    const formattedK = (voucher.amount / 1000).toString();
    let textParam = `need%20${formattedK}k%20`;
    
    if (voucher.gameType === 'crossfire') textParam += 'zp%20card';
    if (voucher.gameType === 'pubg') textParam += 'UC%20card';
    if (voucher.gameType === 'freefire') textParam += 'Diamonds%20card';
    
    return `https://wa.me/201271916093?text=${textParam}`;
  };

  return (
    <div className="game-card">
      <div className="relative h-40 overflow-hidden">
        <img 
          src={voucher.imageUrl} 
          alt={`${voucher.gameType} game card`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 right-0 m-3 price-badge">
          <span>{formattedAmount} {voucher.currency}</span>
        </div>
        <div className="absolute bottom-0 left-0 m-3 bonus-badge">
          <span>BONUS: {voucher.bonus}</span>
        </div>
      </div>
      <div className="p-4 text-center">
        <h3 className="font-rajdhani text-xl font-semibold text-white mb-2">
          {voucher.gameType.charAt(0).toUpperCase() + voucher.gameType.slice(1)} Card
        </h3>
        <p className="text-gray-400 mb-4">{voucher.description}</p>
        <a 
          href={generateWhatsAppLink()} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`inline-block ${buttonStyle} text-white font-bold py-2 px-4 rounded-lg transition-colors w-full flex items-center justify-center gap-2`}
        >
          <FaWhatsapp className="text-lg" /> Buy Now
        </a>
      </div>
    </div>
  );
}

import { FaFacebook, FaYoutube, FaWhatsapp, FaGamepad, FaCrosshairs } from "react-icons/fa";
import { MdOutlineVideogameAsset, MdOutlineSportsEsports } from "react-icons/md";
import { AiFillFire } from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="bg-secondary py-6 px-4 border-t border-purple-900/30">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <FaGamepad className="text-xl text-purple-500" />
              <h2 className="text-xl font-orbitron font-bold text-white neon-text">
                <span className="text-purple-500">Besty</span>
                <span className="text-red-500">Boy</span>
              </h2>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <FaCrosshairs className="text-red-500" title="CrossFire" />
              <MdOutlineSportsEsports className="text-yellow-500" title="PUBG Mobile" />
              <AiFillFire className="text-green-500" title="Free Fire" />
            </div>
            <p className="text-gray-400 text-sm mt-2">Premium gaming vouchers & cards</p>
          </div>
          
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a 
              href="https://www.facebook.com/BestyBoyy/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-transform hover:scale-110"
              aria-label="Facebook"
            >
              <FaFacebook className="text-2xl" />
            </a>
            <a 
              href="https://www.youtube.com/@Besty_Boy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-red-500 transition-transform hover:scale-110"
              aria-label="YouTube"
            >
              <FaYoutube className="text-2xl" />
            </a>
            <a 
              href="https://wa.me/201096065772" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-green-500 transition-transform hover:scale-110"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="text-2xl" />
            </a>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-500 text-xs mt-1">© {new Date().getFullYear()} Besty Boy Gaming. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

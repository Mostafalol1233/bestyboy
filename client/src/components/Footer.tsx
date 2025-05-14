import { FaFacebook, FaYoutube, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-secondary py-6 px-4 border-t border-gray-800">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-xl font-rajdhani font-bold text-white">
              <span className="text-blue-500">Highway</span>
              <span className="text-red-500">Gaming</span>
            </h2>
            <p className="text-gray-400 text-sm mt-1">Gaming vouchers and cards</p>
          </div>
          
          <div className="flex space-x-4 mb-4 md:mb-0">
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
            <a 
              href="https://wa.me/201271916093" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-green-500 transition-colors"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="text-xl" />
            </a>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">
              Developed by <a 
                href="https://www.linkedin.com/in/mostafa-mohamed-409540336/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Mostafa
              </a>
            </p>
            <p className="text-gray-500 text-xs mt-1">© {new Date().getFullYear()} Highway Gaming. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

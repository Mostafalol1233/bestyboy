import { Voucher } from "@shared/schema";
import { FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

interface GameCardProps { voucher: Voucher; }

const images: Record<string, string[]> = {
  crossfire: ["images(3).jpg", "images(2).jpg", "images(1).jpg", "images.jpg"],
  pubg: ["images(4).jpg", "images(5).jpg", "images(6).jpg"],
  freefire: ["freefire.png", "freefire2.png"],
};

function getCardImage(voucher: Voucher) {
  const list = images[voucher.gameType] || ["image_1747413124482.png"];
  return `/assets/${list[Math.max(0, Math.floor(voucher.id) % list.length)]}`;
}

export default function GameCard({ voucher }: GameCardProps) {
  const { addItem } = useCart();
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const amountK = (voucher.amount / 1000).toFixed(0);
  const bonusK = (voucher.bonus / 1000).toFixed(0);
  const price = voucher.price || 0;
  const description = language === "ar" ? `${voucher.gameType} ${amountK} ألف ${voucher.currency} + ${bonusK} ألف هدية` : `${voucher.gameType} ${amountK}K ${voucher.currency} + ${bonusK}K bonus`;

  const handleAdd = () => {
    addItem(voucher);
    toast({ title: t("addedToCart"), description });
  };

  return (
    <motion.article className="game-card group" whileHover={{ y: -6 }} transition={{ duration: 0.2 }}>
      <div className="relative h-48 overflow-hidden">
        <img src={getCardImage(voucher)} alt={`${voucher.gameType} ${amountK} ${voucher.currency}`} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f18] via-transparent to-transparent" />
        <span className="absolute start-3 top-3 rounded-lg bg-emerald-400 px-2.5 py-1 font-orbitron text-xs font-bold text-slate-950">{price.toLocaleString()} {t("currency")}</span>
        <span className="absolute end-3 top-3 rounded-lg bg-fuchsia-500 px-2.5 py-1 font-orbitron text-xs font-bold text-white">{amountK}K {voucher.currency}</span>
        <span className="absolute bottom-3 start-3 rounded-lg bg-rose-500 px-2.5 py-1 text-xs font-bold text-white">+{bonusK}K {t("bonus")}</span>
        <span className="absolute bottom-3 end-3 rounded-lg border border-white/20 bg-black/50 px-2 py-1 text-xs text-slate-200">{voucher.gameType}</span>
      </div>
      <div className="p-4">
        <h3 className="font-rajdhani text-xl font-bold text-white">{voucher.gameType} {t("card")}</h3>
        <p className="mt-1 min-h-10 text-sm leading-6 text-slate-400">{description}</p>
        <button onClick={handleAdd} className="gaming-btn mt-4 flex w-full items-center justify-center gap-2"><FaShoppingCart />{t("addToCart")}</button>
      </div>
    </motion.article>
  );
}

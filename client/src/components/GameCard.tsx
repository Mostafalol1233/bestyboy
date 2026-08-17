import { Link } from "wouter";
import { FaShoppingCart } from "react-icons/fa";
import { ArrowUpRight, Flame } from "lucide-react";
import { Voucher } from "@shared/schema";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

interface GameCardProps { voucher: Voucher; }

const gameNames: Record<string, { en: string; ar: string }> = {
  crossfire: { en: "CrossFire", ar: "كروس فاير" },
  pubg: { en: "PUBG Mobile", ar: "ببجي موبايل" },
  freefire: { en: "Free Fire", ar: "فري فاير" },
  codm: { en: "Call of Duty Mobile", ar: "كول أوف ديوتي موبايل" },
  mobilelegends: { en: "Mobile Legends", ar: "موبايل ليجندز" },
  valorant: { en: "Valorant", ar: "فالورانت" },
  roblox: { en: "Roblox", ar: "روبلوكس" },
  fcmobile: { en: "FC Mobile", ar: "إف سي موبايل" },
};

const gameAccent: Record<string, string> = {
  crossfire: "#38bdf8",
  pubg: "#fbbf24",
  freefire: "#fb7185",
  codm: "#a3e635",
  mobilelegends: "#60a5fa",
  valorant: "#fb7185",
  roblox: "#e2e8f0",
  fcmobile: "#34d399",
};

function getCardImage(voucher: Voucher) {
  return voucher.id >= 1 && voucher.id <= 34
    ? `/assets/packages/bundle-${voucher.id}.svg`
    : voucher.imageUrl || "/assets/packages/bundle-1.svg";
}

export default function GameCard({ voucher }: GameCardProps) {
  const { addItem } = useCart();
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const gameName = gameNames[voucher.gameType]?.[language === "ar" ? "ar" : "en"] || voucher.gameType;
  const price = voucher.price || 0;
  const amount = voucher.amount.toLocaleString(language === "ar" ? "ar-EG" : "en-EG");
  const bonus = voucher.bonus.toLocaleString(language === "ar" ? "ar-EG" : "en-EG");
  const accent = gameAccent[voucher.gameType] || "#22d3ee";
  const description = language === "ar"
    ? `${amount} ${voucher.currency} مع ${bonus} هدية إضافية`
    : `${amount} ${voucher.currency} with ${bonus} bonus`;

  const handleAdd = () => {
    addItem(voucher);
    toast({ title: t("addedToCart"), description });
  };

  return (
    <article className="package-card group">
      <Link href={`/game/${voucher.gameType}`} className="package-card-media" aria-label={`${gameName} ${amount} ${voucher.currency}`}>
        <img src={getCardImage(voucher)} alt={`${gameName} ${amount} ${voucher.currency}`} loading="lazy" />
        <div className="package-card-shade" />
        {voucher.bonus > 0 && <span className="package-badge"><Flame size={13} fill="currentColor" />+{bonus} {t("bonus")}</span>}
        <span className="package-game-label" style={{ borderColor: `${accent}66`, color: accent }}>{gameName}</span>
      </Link>
      <div className="package-card-body">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="package-kicker">{gameName}</p>
            <h3 className="package-title">{amount} {voucher.currency}</h3>
          </div>
          <span className="package-price">{price.toLocaleString(language === "ar" ? "ar-EG" : "en-EG")} <small>{t("currency")}</small></span>
        </div>
        <p className="package-description">{description}</p>
        <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
          <button onClick={handleAdd} className="gaming-btn package-buy-button"><FaShoppingCart size={14} />{t("addToCart")}</button>
          <Link href={`/game/${voucher.gameType}`} className="package-view-button" aria-label={t("viewAll")}><ArrowUpRight size={17} /></Link>
        </div>
      </div>
    </article>
  );
}

export { gameNames, gameAccent };

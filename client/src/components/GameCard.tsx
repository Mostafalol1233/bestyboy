import { Link } from "wouter";
import { FaShoppingCart } from "react-icons/fa";
import { ArrowUpRight, Flame } from "lucide-react";
import { Voucher } from "@shared/schema";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { getOriginalPrice, formatGameNumber } from "@/lib/pricing";

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
  crossfire: "#38bdf8", pubg: "#fbbf24", freefire: "#fb7185", codm: "#a3e635",
  mobilelegends: "#60a5fa", valorant: "#fb7185", roblox: "#e2e8f0", fcmobile: "#34d399",
};

const gameWallpapers: Record<string, string> = {
  crossfire: "/assets/games/crossfire.webp",
  pubg: "/assets/games/pubg.webp",
  freefire: "/assets/games/freefire.webp",
  codm: "/assets/games/codm.webp",
  mobilelegends: "/assets/games/mobilelegends.webp",
  valorant: "/assets/games/valorant.jpg",
  roblox: "/assets/games/roblox.jpg",
  fcmobile: "/assets/games/fcmobile.webp",
};

export default function GameCard({ voucher }: GameCardProps) {
  const { addItem } = useCart();
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const gameName = gameNames[voucher.gameType]?.[language === "ar" ? "ar" : "en"] || voucher.gameType;
  const amount = formatGameNumber(voucher.amount, language);
  const currentPriceValue = voucher.price || 0;
  const originalPrice = getOriginalPrice(currentPriceValue);
  const price = formatGameNumber(currentPriceValue, language);
  const originalPriceLabel = formatGameNumber(originalPrice, language);
  const bonus = formatGameNumber(voucher.bonus, language);
  const accent = gameAccent[voucher.gameType] || "#ef4059";
  const wallpaper = gameWallpapers[voucher.gameType] || "/assets/games/pubg.webp";
  const description = language === "ar" ? `${amount} ${voucher.currency} + ${bonus} هدية` : `${amount} ${voucher.currency} + ${bonus} bonus`;

  const handleAdd = () => {
    addItem(voucher);
    toast({ title: t("addedToCart"), description });
  };

  return (
    <article className="package-card package-card-compact group">
      <Link
        href={`/game/${voucher.gameType}`}
        className="package-card-media package-card-media-compact"
        aria-label={`${gameName} ${amount} ${voucher.currency}`}
      >
        <img src={wallpaper} alt="" loading="lazy" />
        <span className="package-card-media-shade" />
        {voucher.bonus > 0 && <span className="package-hot-badge"><Flame size={12} fill="currentColor" />{language === "ar" ? "عرض" : "HOT"}</span>}
        <span className="package-card-game-name">{gameName}</span>
        <span className="package-card-amount">{amount} <small>{voucher.currency}</small></span>
      </Link>
      <div className="package-card-body package-card-body-compact">
        <div className="package-card-meta-row">
          <span className="package-kicker">{language === "ar" ? "شحن فوري" : "Instant top-up"}</span>
          <span className="package-delivery-dot" />
        </div>
        {voucher.bonus > 0 && <p className="package-bonus-line">+{bonus} {t("bonus")}</p>}
        <div className="package-price-row package-price-row-discount">
          <span className="package-price-old gaming-digits">{originalPriceLabel} <small>{t("currency")}</small></span>
          <span className="package-price package-price-large gaming-digits">{price} <small>{t("currency")}</small></span>
        </div>
        <div className="package-actions">
          <button onClick={handleAdd} className="package-buy-button package-buy-button-compact"><FaShoppingCart size={12} />{t("addToCart")}</button>
          <Link href={`/game/${voucher.gameType}`} className="package-view-button package-view-button-compact" aria-label={t("viewAll")}><ArrowUpRight size={15} /></Link>
        </div>
      </div>
      <span className="package-card-accent" style={{ background: accent }} aria-hidden="true" />
    </article>
  );
}

export { gameNames, gameAccent, gameWallpapers };

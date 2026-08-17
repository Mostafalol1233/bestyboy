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
  crossfire: "#38bdf8", pubg: "#fbbf24", freefire: "#fb7185", codm: "#a3e635",
  mobilelegends: "#60a5fa", valorant: "#fb7185", roblox: "#e2e8f0", fcmobile: "#34d399",
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
  const numberLocale = language === "ar" ? "ar-EG" : "en-EG";
  const amount = voucher.amount.toLocaleString(numberLocale);
  const price = (voucher.price || 0).toLocaleString(numberLocale);
  const bonus = voucher.bonus.toLocaleString(numberLocale);
  const accent = gameAccent[voucher.gameType] || "#ef4059";
  const description = language === "ar" ? `${amount} ${voucher.currency} + ${bonus} هدية` : `${amount} ${voucher.currency} + ${bonus} bonus`;

  const handleAdd = () => {
    addItem(voucher);
    toast({ title: t("addedToCart"), description });
  };

  return (
    <article className="package-card package-card-compact group">
      <div className="package-card-topline">
        {voucher.bonus > 0 && <span className="package-hot-badge"><Flame size={12} fill="currentColor" />{language === "ar" ? "عرض" : "HOT"}</span>}
        <span className="package-card-icon" style={{ color: accent }} aria-hidden="true">{voucher.currency.slice(0, 2)}</span>
      </div>
      <Link href={`/game/${voucher.gameType}`} className="package-card-media package-card-media-compact" aria-label={`${gameName} ${amount} ${voucher.currency}`}>
        <img src={getCardImage(voucher)} alt="" loading="lazy" />
      </Link>
      <div className="package-card-body package-card-body-compact">
        <p className="package-kicker">{gameName}</p>
        <h3 className="package-title">{gameName} <span>({amount} {voucher.currency})</span></h3>
        {voucher.bonus > 0 && <p className="package-bonus-line">+{bonus} {t("bonus")}</p>}
        <div className="package-price-row"><span className="package-price package-price-large">{price} <small>{t("currency")}</small></span><span className="package-delivery-dot" /></div>
        <div className="package-actions">
          <button onClick={handleAdd} className="package-buy-button package-buy-button-compact"><FaShoppingCart size={12} />{t("addToCart")}</button>
          <Link href={`/game/${voucher.gameType}`} className="package-view-button package-view-button-compact" aria-label={t("viewAll")}><ArrowUpRight size={15} /></Link>
        </div>
      </div>
    </article>
  );
}

export { gameNames, gameAccent };

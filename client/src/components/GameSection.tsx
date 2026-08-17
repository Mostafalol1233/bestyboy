import { Link } from "wouter";
import { ArrowLeft, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { Voucher } from "@shared/schema";
import GameCard from "@/components/GameCard";
import { useLanguage } from "@/contexts/LanguageContext";

interface GameSectionProps { gameType: string; vouchers: Voucher[]; isLoading?: boolean; compact?: boolean; }

const gameMeta: Record<string, { title: string; titleAr: string; description: string; descriptionAr: string; color: string; image: string }> = {
  crossfire: { title: "CrossFire vouchers", titleAr: "بطاقات كروس فاير", description: "ZP vouchers with bonus points for every loadout.", descriptionAr: "بطاقات زد بي مع نقاط إضافية لكل عملية شحن.", color: "#22d3ee", image: "/assets/games/crossfire.webp" },
  pubg: { title: "PUBG Mobile UC", titleAr: "شدات ببجي موبايل", description: "Get UC quickly and keep your squad ready for the next match.", descriptionAr: "اشحن شداتك بسرعة واستعد للمباراة القادمة.", color: "#fbbf24", image: "/assets/games/pubg.webp" },
  freefire: { title: "Free Fire diamonds", titleAr: "جواهر فري فاير", description: "Diamonds for skins, bundles and your next victory.", descriptionAr: "جواهر للسكنات والباقات وانتصارك القادم.", color: "#fb7185", image: "/assets/games/freefire.webp" },
  codm: { title: "Call of Duty Mobile CP", titleAr: "نقاط كول أوف ديوتي موبايل", description: "CP bundles for your next loadout and battle pass.", descriptionAr: "باقات نقاط للعتاد والبطاقة الموسمية.", color: "#a3e635", image: "/assets/games/codm.webp" },
  mobilelegends: { title: "Mobile Legends diamonds", titleAr: "جواهر موبايل ليجندز", description: "Diamond packs for heroes, skins and ranked upgrades.", descriptionAr: "جواهر للأبطال والسكنات وترقية حسابك.", color: "#60a5fa", image: "/assets/games/mobilelegends.webp" },
  valorant: { title: "Valorant Points", titleAr: "نقاط فالورانت", description: "VP packs for skins and your next collection.", descriptionAr: "نقاط فالورانت للسكنات ومجموعتك القادمة.", color: "#f472b6", image: "/assets/games/valorant.jpg" },
  roblox: { title: "Roblox Robux", titleAr: "روبوكس روبلوكس", description: "Robux packs for outfits, game passes and your world.", descriptionAr: "روبوكس للأزياء واشتراكات الألعاب وعالمك الخاص.", color: "#f8fafc", image: "/assets/games/roblox.jpg" },
  fcmobile: { title: "FC Mobile Points", titleAr: "نقاط إف سي موبايل", description: "FC Points for packs, players and squad upgrades.", descriptionAr: "نقاط لتطوير التشكيلة وفتح الحزم واللاعبين.", color: "#34d399", image: "/assets/games/fcmobile.webp" },
};

export default function GameSection({ gameType, vouchers, isLoading }: GameSectionProps) {
  const { language, t } = useLanguage();
  const meta = gameMeta[gameType] || gameMeta.crossfire;
  const DirectionIcon = language === "ar" ? ArrowLeft : ArrowRight;
  const title = language === "ar" ? meta.titleAr : meta.title;
  return (
    <section className="game-store-section game-store-section-clean">
      <div className="game-section-head game-section-head-clean">
        <div className="game-section-heading-wrap">
          <div className="game-section-cover game-section-cover-clean"><img src={meta.image} alt="" /></div>
          <div className="min-w-0"><p className="game-section-overline" style={{ color: meta.color }}>{language === "ar" ? "الباقات المتاحة" : "Available products"}</p><h2 className="game-section-title">{title}</h2><p className="game-section-description">{language === "ar" ? meta.descriptionAr : meta.description}</p></div>
        </div>
        <Link href={`/game/${gameType}`} className="game-section-link">{language === "ar" ? "عرض صفحة اللعبة" : "Open game page"}<DirectionIcon size={16} /></Link>
      </div>
      <div className="game-section-trust"><span><Zap size={14} style={{ color: meta.color }} />{t("instantDelivery")}</span><span><ShieldCheck size={14} style={{ color: meta.color }} />{t("securePayment")}</span></div>
      {isLoading ? <div className="package-grid package-grid-clean"><div className="package-skeleton" /><div className="package-skeleton" /><div className="package-skeleton" /></div> : vouchers.length === 0 ? <div className="empty-products">{t("noOrders")}</div> : <div className="package-grid package-grid-clean">{vouchers.map((voucher) => <GameCard key={voucher.id} voucher={voucher} />)}</div>}
    </section>
  );
}

export { gameMeta };

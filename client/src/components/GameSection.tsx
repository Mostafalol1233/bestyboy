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
  codm: { title: "Call of Duty Mobile CP", titleAr: "نقاط كول أوف ديوتي موبايل", description: "CP bundles for your next loadout, battle pass and legendary drop.", descriptionAr: "باقات نقاط للعتاد والبطاقة الموسمية وأحدث العناصر.", color: "#a3e635", image: "/assets/games/codm.webp" },
  mobilelegends: { title: "Mobile Legends diamonds", titleAr: "جواهر موبايل ليجندز", description: "Diamond packs for heroes, skins and fast ranked upgrades.", descriptionAr: "جواهر للأبطال والسكنات وترقية حسابك بسرعة.", color: "#60a5fa", image: "/assets/games/mobilelegends.webp" },
  valorant: { title: "Valorant Points", titleAr: "نقاط فالورانت", description: "VP packs with bonus value for skins and your next collection.", descriptionAr: "نقاط فالورانت للسكنات ومجموعتك القادمة بقيمة أفضل.", color: "#f472b6", image: "/assets/games/valorant.jpg" },
  roblox: { title: "Roblox Robux", titleAr: "روبوكس روبلوكس", description: "Robux packs for outfits, game passes and your Roblox world.", descriptionAr: "روبوكس للأزياء واشتراكات الألعاب وعالمك الخاص.", color: "#f8fafc", image: "/assets/games/roblox.jpg" },
  fcmobile: { title: "FC Mobile Points", titleAr: "نقاط إف سي موبايل", description: "FC Points for packs, players and your next squad upgrade.", descriptionAr: "نقاط لتطوير التشكيلة وفتح الحزم واللاعبين.", color: "#34d399", image: "/assets/games/fcmobile.webp" },
};

export default function GameSection({ gameType, vouchers, isLoading, compact }: GameSectionProps) {
  const { language, t } = useLanguage();
  const meta = gameMeta[gameType] || gameMeta.crossfire;
  const BackIcon = language === "ar" ? ArrowLeft : ArrowRight;
  return (
    <section className={`game-store-section relative overflow-hidden rounded-[2rem] ${compact ? "game-store-section-compact" : ""}`}>
      <div className="game-section-backdrop" style={{ backgroundImage: `url(${meta.image})` }} aria-hidden="true" />
      <div className="game-section-content">
        <div className="game-section-head">
          <div className="flex min-w-0 items-center gap-4">
            <div className="game-section-cover" style={{ borderColor: `${meta.color}66` }}><img src={meta.image} alt="" /></div>
            <div className="min-w-0">
              <p className="game-section-overline" style={{ color: meta.color }}>{language === "ar" ? "شحن مباشر وتسليم سريع" : "Direct top-up · Instant delivery"}</p>
              <h2 className="game-section-title">{language === "ar" ? meta.titleAr : meta.title}</h2>
              <p className="game-section-description">{language === "ar" ? meta.descriptionAr : meta.description}</p>
              <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-400"><span className="inline-flex items-center gap-1.5"><Zap size={13} style={{ color: meta.color }} />{t("instantDelivery")}</span><span className="inline-flex items-center gap-1.5"><ShieldCheck size={13} style={{ color: meta.color }} />{t("securePayment")}</span></div>
            </div>
          </div>
          {!compact && <Link href={`/game/${gameType}`} className="game-section-link">{t("viewAll")} <BackIcon size={16} /></Link>}
        </div>
        {isLoading ? <div className="package-grid"><div className="h-80 animate-pulse rounded-2xl bg-white/5" /><div className="h-80 animate-pulse rounded-2xl bg-white/5" /><div className="h-80 animate-pulse rounded-2xl bg-white/5" /></div> : vouchers.length === 0 ? <div className="rounded-2xl border border-dashed border-white/15 p-10 text-center text-slate-400">{t("noOrders")}</div> : <div className="package-grid">{vouchers.map((voucher) => <GameCard key={voucher.id} voucher={voucher} />)}</div>}
      </div>
    </section>
  );
}

export { gameMeta };

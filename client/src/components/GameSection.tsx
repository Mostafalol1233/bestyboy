import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { Voucher } from "@shared/schema";
import GameCard from "@/components/GameCard";
import { useLanguage } from "@/contexts/LanguageContext";

interface GameSectionProps { gameType: string; vouchers: Voucher[]; isLoading?: boolean; compact?: boolean; }

const gameMeta: Record<string, { title: string; titleAr: string; description: string; descriptionAr: string; color: string; image: string }> = {
  crossfire: { title: "CrossFire vouchers", titleAr: "بطاقات كروس فاير", description: "ZP vouchers with bonus points for every loadout.", descriptionAr: "بطاقات زد بي مع نقاط إضافية لكل عملية شحن.", color: "#22d3ee", image: "/attached_assets/image_1747413124482.png" },
  pubg: { title: "PUBG Mobile UC", titleAr: "شدات ببجي موبايل", description: "Get UC quickly and keep your squad ready for the next match.", descriptionAr: "اشحن شداتك بسرعة واستعد للمباراة القادمة.", color: "#fbbf24", image: "/attached_assets/image_1747413124482.png" },
  freefire: { title: "Free Fire diamonds", titleAr: "جواهر فري فاير", description: "Diamonds for skins, bundles and your next victory.", descriptionAr: "جواهر للسكنات والباقات وانتصارك القادم.", color: "#fb7185", image: "/attached_assets/image_1747413124482.png" },
};

export default function GameSection({ gameType, vouchers, isLoading, compact }: GameSectionProps) {
  const { language, t } = useLanguage();
  const meta = gameMeta[gameType] || gameMeta.crossfire;
  const BackIcon = language === "ar" ? ArrowLeft : ArrowRight;
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#10131d] p-5 shadow-2xl shadow-cyan-500/5 sm:p-8">
      {!compact && <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${meta.image})`, backgroundSize: "cover", backgroundPosition: "center" }} />}
      <div className="relative">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div><span className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: meta.color }}><Sparkles size={14} />{t("games")}</span><h2 className="font-rajdhani text-3xl font-bold text-white sm:text-4xl">{language === "ar" ? meta.titleAr : meta.title}</h2><p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">{language === "ar" ? meta.descriptionAr : meta.description}</p></div>
          {!compact && <Link href={`/game/${gameType}`} className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-white">{t("viewAll")} <BackIcon size={16} /></Link>}
        </div>
        {isLoading ? <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"><div className="h-80 animate-pulse rounded-2xl bg-white/5" /><div className="h-80 animate-pulse rounded-2xl bg-white/5" /><div className="h-80 animate-pulse rounded-2xl bg-white/5" /></div> : vouchers.length === 0 ? <div className="rounded-2xl border border-dashed border-white/15 p-10 text-center text-slate-400">{t("noOrders")}</div> : <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{vouchers.map((voucher) => <GameCard key={voucher.id} voucher={voucher} />)}</div>}
      </div>
    </section>
  );
}

export { gameMeta };

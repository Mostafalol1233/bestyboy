import { Link, useRoute } from "wouter";
import GameSection, { gameMeta } from "@/components/GameSection";
import { useVouchers } from "@/contexts/VoucherContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function GamePage() {
  const [, params] = useRoute<{ gameType: string }>("/game/:gameType");
  const { vouchers } = useVouchers();
  const { language, t } = useLanguage();
  const gameType = params?.gameType || "crossfire";
  const gameVouchers = vouchers.filter((voucher) => voucher.gameType === gameType);
  const meta = gameMeta[gameType];
  if (!meta) return <div className="container py-20 text-center"><h1 className="font-rajdhani text-4xl font-bold text-white">{t("gameNotFound")}</h1><Link href="/games" className="mt-6 inline-block text-cyan-300">{t("backToGames")}</Link></div>;
  return <div className="container py-12"><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><Link href="/games" className="text-sm text-cyan-300">← {t("backToGames")}</Link><h1 className="mt-3 font-rajdhani text-5xl font-bold text-white">{language === "ar" ? meta.titleAr : meta.title}</h1><p className="mt-2 max-w-2xl text-slate-400">{language === "ar" ? meta.descriptionAr : meta.description}</p></div><div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-center"><span className="block font-orbitron text-2xl font-bold text-cyan-300">{gameVouchers.length}</span><span className="text-xs text-slate-500">{t("card")}</span></div></div><GameSection gameType={gameType} vouchers={gameVouchers} compact /></div>;
}

import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Check, Search, ShieldCheck, Sparkles, Zap } from "lucide-react";
import GameSection from "@/components/GameSection";
import { useVouchers } from "@/contexts/VoucherContext";
import { useLanguage } from "@/contexts/LanguageContext";

const gameTypes = ["crossfire", "pubg", "freefire"];

export default function Home() {
  const { vouchers } = useVouchers();
  const { language, t } = useLanguage();
  const [query, setQuery] = useState("");
  const [activeGame, setActiveGame] = useState("all");
  const DirectionIcon = language === "ar" ? ArrowLeft : ArrowRight;
  const filtered = useMemo(() => vouchers.filter((voucher) => {
    const matchesGame = activeGame === "all" || voucher.gameType === activeGame;
    const haystack = `${voucher.gameType} ${voucher.currency} ${voucher.amount}`.toLowerCase();
    return matchesGame && haystack.includes(query.toLowerCase());
  }), [vouchers, activeGame, query]);
  const grouped = gameTypes.map((gameType) => ({ gameType, vouchers: filtered.filter((voucher) => voucher.gameType === gameType) }));

  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/10 bg-[#090b12]">
        <div className="hero-grid absolute inset-0 opacity-70" />
        <div className="absolute -start-24 top-10 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" /><div className="absolute -end-24 bottom-0 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="container relative grid items-center gap-10 py-20 lg:grid-cols-[1.1fr_.9fr] lg:py-28">
          <div>
            <span className="eyebrow"><Sparkles size={15} />{t("heroEyebrow")}</span>
            <h1 className="mt-5 max-w-3xl font-rajdhani text-5xl font-bold leading-[.95] text-white sm:text-7xl">{t("heroTitle")}<span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent">Besty Boy</span></h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">{t("heroText")}</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link href="/games" className="gaming-btn inline-flex items-center gap-2">{t("shopNow")} <DirectionIcon size={17} /></Link><Link href="/offers" className="rounded-xl border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:text-cyan-300">{t("bestOffers")}</Link></div>
            <div className="mt-10 flex flex-wrap gap-5 text-sm text-slate-400"><span className="flex items-center gap-2"><Zap size={16} className="text-cyan-300" />{t("instantDelivery")}</span><span className="flex items-center gap-2"><ShieldCheck size={16} className="text-fuchsia-300" />{t("securePayment")}</span><span className="flex items-center gap-2"><Check size={16} className="text-emerald-300" />{t("realSupport")}</span></div>
          </div>
          <div className="relative mx-auto w-full max-w-md"><div className="absolute inset-5 rounded-[2.5rem] bg-gradient-to-br from-cyan-400/20 to-fuchsia-500/20 blur-2xl" /><div className="relative overflow-hidden rounded-[2.5rem] border border-cyan-300/20 bg-white/[0.04] p-4 shadow-2xl shadow-cyan-500/10"><img src="/attached_assets/image_1747413124482.png" alt="Besty Boy gaming" className="h-80 w-full rounded-[2rem] object-cover opacity-90" /><div className="absolute inset-x-8 bottom-8 rounded-2xl border border-white/10 bg-[#0b0e17]/85 p-4 backdrop-blur"><div className="flex items-center justify-between"><div><span className="text-xs text-cyan-300">BESTY BOY MARKET</span><p className="mt-1 font-rajdhani text-2xl font-bold text-white">Ready for your next match?</p></div><span className="brand-mark"><Zap size={18} /></span></div></div></div></div>
        </div>
      </section>

      <section className="container py-12">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><span className="eyebrow">{t("games")}</span><h2 className="mt-2 font-rajdhani text-4xl font-bold text-white">{t("popularGames")}</h2></div><Link href="/games" className="text-sm font-semibold text-cyan-300">{t("viewAll")} <DirectionIcon className="inline" size={15} /></Link></div>
        <div className="grid gap-4 md:grid-cols-3">{gameTypes.map((gameType) => <Link key={gameType} href={`/game/${gameType}`} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-cyan-300/[0.05]"><div className="mb-5 flex items-center justify-between"><span className="rounded-xl bg-cyan-300/10 p-3 text-cyan-300"><Sparkles size={22} /></span><DirectionIcon size={18} className="text-slate-500 transition group-hover:text-cyan-300" /></div><h3 className="font-rajdhani text-2xl font-bold text-white">{gameType === "crossfire" ? "CrossFire" : gameType === "pubg" ? "PUBG Mobile" : "Free Fire"}</h3><p className="mt-1 text-sm text-slate-400">{vouchers.filter((voucher) => voucher.gameType === gameType).length} {t("card")}</p></Link>)}</div>
      </section>

      <section className="container pb-8"><div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:flex-row md:items-center"><div className="relative flex-1"><Search className="absolute start-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("searchPlaceholder")} className="w-full rounded-xl border border-white/10 bg-[#0d1019] py-3 ps-11 pe-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/40" /></div><div className="flex gap-2 overflow-auto"><button onClick={() => setActiveGame("all")} className={`filter-chip ${activeGame === "all" ? "filter-chip-active" : ""}`}>{t("allGames")}</button>{gameTypes.map((gameType) => <button key={gameType} onClick={() => setActiveGame(gameType)} className={`filter-chip ${activeGame === gameType ? "filter-chip-active" : ""}`}>{gameType}</button>)}</div></div></section>

      <section className="container space-y-8 pb-16">{grouped.map(({ gameType, vouchers: gameVouchers }) => <GameSection key={gameType} gameType={gameType} vouchers={gameVouchers} compact={activeGame !== "all"} />)}</section>
    </div>
  );
}

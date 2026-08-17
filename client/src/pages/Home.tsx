import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Check, Search, ShieldCheck, Sparkles, Zap } from "lucide-react";
import GameSection from "@/components/GameSection";
import { useVouchers } from "@/contexts/VoucherContext";
import { useLanguage } from "@/contexts/LanguageContext";

const gameTypes = ["crossfire", "pubg", "freefire"];
const popularSearches = ["PUBG Mobile", "Free Fire", "CrossFire", "بطاقات ألعاب", "شحن سريع"];

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
      <section className="gamzio-hero relative overflow-hidden">
        <div className="hero-orbit hero-orbit-one" /><div className="hero-orbit hero-orbit-two" />
        <div className="container relative py-16 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <span className="eyebrow justify-center"><Sparkles size={14} />{t("heroEyebrow")}</span>
            <h1 className="mt-5 font-rajdhani text-5xl font-bold leading-[.94] text-white sm:text-7xl lg:text-[6.5rem]">{t("heroTitle")}<span dir="ltr" className="hero-accent">Besty Boy</span></h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">{t("heroText")}</p>
            <div className="hero-search mx-auto mt-9 flex max-w-3xl items-center gap-3 rounded-2xl p-2">
              <Search className="ms-3 shrink-0 text-slate-500" size={20} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("searchPlaceholder")} className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-600" />
              <button onClick={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })} className="search-submit"><Search size={18} /></button>
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500"><span>{language === "ar" ? "عمليات بحث شائعة" : "Trending searches"}</span>{popularSearches.map((term) => <button key={term} onClick={() => setQuery(term === "بطاقات ألعاب" || term === "شحن سريع" ? "" : term.toLowerCase())} className="trending-chip">{term}</button>)}</div>
            <div className="mt-9 flex flex-wrap justify-center gap-3"><Link href="/games" className="gaming-btn inline-flex items-center gap-2">{t("shopNow")} <DirectionIcon size={16} /></Link><Link href="/offers" className="hero-secondary">{t("bestOffers")}</Link></div>
          </div>
          <div className="hero-showcase mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { title: "CrossFire", image: "/assets/images(2).jpg", tone: "rose" },
              { title: "PUBG Mobile", image: "/assets/images(4).jpg", tone: "violet" },
              { title: "Free Fire", image: "/assets/freefire2.png", tone: "blue" },
              { title: language === "ar" ? "عروض يومية" : "Daily offers", image: "/attached_assets/image_1747413124482.png", tone: "pink" },
            ].map((item) => <Link key={item.title} href={item.title === "CrossFire" ? "/game/crossfire" : item.title === "PUBG Mobile" ? "/game/pubg" : item.title === "Free Fire" ? "/game/freefire" : "/offers"} className={`hero-tile hero-tile-${item.tone}`}><img src={item.image} alt={item.title} /><span>{item.title}</span></Link>)}
          </div>
        </div>
      </section>

      <section className="container py-14 sm:py-20">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><span className="eyebrow">{t("games")}</span><h2 className="mt-2 font-rajdhani text-4xl font-bold text-white sm:text-5xl">{t("popularGames")}</h2></div><Link href="/games" className="section-link">{t("viewAll")} <DirectionIcon className="inline" size={15} /></Link></div>
        <div className="grid gap-4 md:grid-cols-3">{gameTypes.map((gameType) => <Link key={gameType} href={`/game/${gameType}`} className="game-category-card group"><div className="game-category-image"><img src={gameType === "crossfire" ? "/assets/images(2).jpg" : gameType === "pubg" ? "/assets/images(4).jpg" : "/assets/freefire2.png"} alt={gameType} /><span className="game-category-arrow"><DirectionIcon size={18} /></span></div><div className="p-5"><h3 className="font-rajdhani text-2xl font-bold text-white">{gameType === "crossfire" ? "CrossFire" : gameType === "pubg" ? "PUBG Mobile" : "Free Fire"}</h3><p className="mt-1 text-sm text-slate-500">{vouchers.filter((voucher) => voucher.gameType === gameType).length} {t("card")}</p></div></Link>)}</div>
      </section>

      <section id="catalog" className="container pb-8"><div className="catalog-toolbar flex flex-col gap-4 p-4 md:flex-row md:items-center"><div className="flex items-center gap-3 text-sm font-semibold text-white"><span className="catalog-dot" />{language === "ar" ? "استكشف المنتجات" : "Browse products"}</div><div className="flex gap-2 overflow-auto md:ms-auto"><button onClick={() => setActiveGame("all")} className={`filter-chip ${activeGame === "all" ? "filter-chip-active" : ""}`}>{t("allGames")}</button>{gameTypes.map((gameType) => <button key={gameType} onClick={() => setActiveGame(gameType)} className={`filter-chip ${activeGame === gameType ? "filter-chip-active" : ""}`}>{gameType}</button>)}</div></div></section>

      <section className="container space-y-10 pb-20">{grouped.map(({ gameType, vouchers: gameVouchers }) => <GameSection key={gameType} gameType={gameType} vouchers={gameVouchers} compact={activeGame !== "all"} />)}</section>

      <section className="container pb-16"><div className="trust-strip grid gap-5 rounded-3xl p-6 sm:grid-cols-3 sm:p-8"><div className="flex items-center gap-3"><span className="trust-icon"><Zap size={18} /></span><div><strong>{t("instantDelivery")}</strong><p>{language === "ar" ? "طلبك يصل بسرعة" : "Your order arrives fast"}</p></div></div><div className="flex items-center gap-3"><span className="trust-icon"><ShieldCheck size={18} /></span><div><strong>{t("securePayment")}</strong><p>{language === "ar" ? "دفع آمن وموثوق" : "Safe and trusted payment"}</p></div></div><div className="flex items-center gap-3"><span className="trust-icon"><Check size={18} /></span><div><strong>{t("realSupport")}</strong><p>{language === "ar" ? "نحن هنا لمساعدتك" : "We are here to help"}</p></div></div></div></section>
    </div>
  );
}

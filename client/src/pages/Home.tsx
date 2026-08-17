import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Check, Search, ShieldCheck, Sparkles, Zap } from "lucide-react";
import GameSection from "@/components/GameSection";
import { useVouchers } from "@/contexts/VoucherContext";
import { useLanguage } from "@/contexts/LanguageContext";

const gameTypes = ["crossfire", "pubg", "freefire", "codm", "mobilelegends", "valorant", "roblox", "fcmobile"];
const popularSearches = ["PUBG Mobile", "Free Fire", "Call of Duty", "Valorant", "Roblox", "Mobile Legends"];

const gameLabels: Record<string, string> = {
  crossfire: "CrossFire",
  pubg: "PUBG Mobile",
  freefire: "Free Fire",
  codm: "Call of Duty Mobile",
  mobilelegends: "Mobile Legends",
  valorant: "Valorant",
  roblox: "Roblox",
  fcmobile: "FC Mobile",
};

const gameImages: Record<string, string> = {
  crossfire: "/assets/images(2).jpg",
  pubg: "/assets/images(4).jpg",
  freefire: "/assets/freefire2.png",
  codm: "/assets/freefire.png",
  mobilelegends: "/assets/images(1).jpg",
  valorant: "/assets/images(3).jpg",
  roblox: "/assets/images.jpg",
  fcmobile: "/assets/images(4).jpg",
};

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

  const grouped = gameTypes.map((gameType) => ({
    gameType,
    vouchers: filtered.filter((voucher) => voucher.gameType === gameType),
  }));

  const heroTiles = [
    { title: "CrossFire", image: gameImages.crossfire, href: "/game/crossfire" },
    { title: "PUBG Mobile", image: gameImages.pubg, href: "/game/pubg" },
    { title: "Free Fire", image: gameImages.freefire, href: "/game/freefire" },
    { title: "Call of Duty Mobile", image: gameImages.codm, href: "/game/codm" },
    { title: "Mobile Legends", image: gameImages.mobilelegends, href: "/game/mobilelegends" },
    { title: "Valorant", image: gameImages.valorant, href: "/game/valorant" },
    { title: "Roblox", image: gameImages.roblox, href: "/game/roblox" },
    { title: "FC Mobile", image: gameImages.fcmobile, href: "/game/fcmobile" },
  ];

  return (
    <div>
      <section className="gamzio-hero relative overflow-hidden">
        <div className="hero-art-wall" aria-hidden="true">
          {heroTiles.map((tile) => <img key={`${tile.title}-background`} src={tile.image} alt="" />)}
        </div>
        <div className="hero-art-shade" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-one" /><div className="hero-orbit hero-orbit-two" />
        <div className="container relative py-20 sm:py-28 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <span className="eyebrow justify-center"><Sparkles size={14} />{t("heroEyebrow")}</span>
            <h1 className="hero-title mt-5 font-rajdhani font-bold leading-[.94] text-white">
              {t("heroTitle")}<span dir="ltr" className="hero-accent">Besty Boy</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">{t("heroText")}</p>
            <div className="hero-search mx-auto mt-9 flex max-w-3xl items-center gap-3 rounded-2xl p-2">
              <Search className="ms-3 shrink-0 text-slate-500" size={20} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("searchPlaceholder")} className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-500" />
              <button onClick={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })} className="search-submit" aria-label={t("searchPlaceholder")}><Search size={18} /></button>
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
              <span>{language === "ar" ? "الأكثر بحثًا" : "Trending searches"}</span>
              {popularSearches.map((term) => <button key={term} onClick={() => setQuery(term.toLowerCase())} className="trending-chip">{term}</button>)}
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/games" className="gaming-btn inline-flex items-center gap-2">{t("shopNow")} <DirectionIcon size={16} /></Link>
              <Link href="/offers" className="hero-secondary">{t("bestOffers")}</Link>
            </div>
          </div>
          <div className="hero-quick-grid mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4">
            {heroTiles.slice(0, 4).map((item) => <Link key={item.title} href={item.href} className="hero-tile"><img src={item.image} alt={item.title} /><span>{item.title}</span></Link>)}
          </div>
        </div>
      </section>

      <section className="container py-14 sm:py-20">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div><span className="eyebrow">{language === "ar" ? "مختارات المتجر" : "Store picks"}</span><h2 className="mt-2 font-rajdhani text-4xl font-bold uppercase text-white sm:text-5xl">{t("popularGames")}</h2></div>
          <Link href="/games" className="section-link">{t("viewAll")} <DirectionIcon className="inline" size={15} /></Link>
        </div>
        <div className="popular-game-grid">
          {heroTiles.slice(0, 8).map((item) => <Link key={`popular-${item.title}`} href={item.href} className="popular-game-card group"><img src={item.image} alt={item.title} /><span>{item.title}</span></Link>)}
        </div>
      </section>

      <section id="catalog" className="container pb-8"><div className="catalog-toolbar flex flex-col gap-4 p-4 md:flex-row md:items-center"><div className="flex items-center gap-3 text-sm font-semibold text-white"><span className="catalog-dot" />{language === "ar" ? "استكشف المنتجات" : "Browse products"}</div><div className="flex gap-2 overflow-auto md:ms-auto"><button onClick={() => setActiveGame("all")} className={`filter-chip ${activeGame === "all" ? "filter-chip-active" : ""}`}>{t("allGames")}</button>{gameTypes.map((gameType) => <button key={gameType} onClick={() => setActiveGame(gameType)} className={`filter-chip ${activeGame === gameType ? "filter-chip-active" : ""}`}>{gameLabels[gameType]}</button>)}</div></div></section>

      <section className="container space-y-10 pb-20">{grouped.map(({ gameType, vouchers: gameVouchers }) => <GameSection key={gameType} gameType={gameType} vouchers={gameVouchers} compact={activeGame !== "all"} />)}</section>

      <section className="container pb-16"><div className="trust-strip grid gap-5 rounded-3xl p-6 sm:grid-cols-3 sm:p-8"><div className="flex items-center gap-3"><span className="trust-icon"><Zap size={18} /></span><div><strong>{t("instantDelivery")}</strong><p>{language === "ar" ? "طلبك يصل بسرعة" : "Your order arrives fast"}</p></div></div><div className="flex items-center gap-3"><span className="trust-icon"><ShieldCheck size={18} /></span><div><strong>{t("securePayment")}</strong><p>{language === "ar" ? "دفع آمن وموثوق" : "Safe and trusted payment"}</p></div></div><div className="flex items-center gap-3"><span className="trust-icon"><Check size={18} /></span><div><strong>{t("realSupport")}</strong><p>{language === "ar" ? "نحن هنا لمساعدتك" : "We are here to help"}</p></div></div></div></section>
    </div>
  );
}

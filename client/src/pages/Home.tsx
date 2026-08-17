import { ArrowLeft, ArrowRight, Check, Search, ShieldCheck, Zap } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const gameImages: Record<string, string> = {
  crossfire: "/assets/games/crossfire.webp",
  pubg: "/assets/games/pubg.webp",
  freefire: "/assets/games/freefire.webp",
  codm: "/assets/games/codm.webp",
  mobilelegends: "/assets/games/mobilelegends.webp",
  valorant: "/assets/games/valorant.jpg",
  roblox: "/assets/games/roblox.jpg",
  fcmobile: "/assets/games/fcmobile.webp",
};

const games = [
  ["crossfire", "CrossFire"], ["pubg", "PUBG Mobile"], ["freefire", "Free Fire"], ["codm", "Call of Duty Mobile"],
  ["mobilelegends", "Mobile Legends"], ["valorant", "Valorant"], ["roblox", "Roblox"], ["fcmobile", "FC Mobile"],
];

export default function Home() {
  const { language, t } = useLanguage();
  const [query, setQuery] = useState("");
  const DirectionIcon = language === "ar" ? ArrowLeft : ArrowRight;
  const visibleGames = games.filter(([, name]) => name.toLowerCase().includes(query.toLowerCase()));
  const displayedGames = query.trim() ? visibleGames : visibleGames.slice(0, 4);
  const popularSearches = language === "ar" ? ["ببجي موبايل", "فري فاير", "روبلوكس", "فالورانت"] : ["PUBG Mobile", "Free Fire", "Roblox", "Valorant"];

  return (
    <div className="home-gamzio">
      <section className="gamzio-hero gamzio-hero-minimal relative overflow-hidden">
        <div className="hero-art-wall hero-art-wall-soft" aria-hidden="true">{games.map(([type]) => <img key={type} src={gameImages[type]} alt="" />)}</div>
        <div className="hero-art-shade" aria-hidden="true" />
        <div className="container relative py-20 sm:py-28 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="home-eyebrow">{language === "ar" ? "متجر الشحن والألعاب" : "Gaming top-ups marketplace"}</p>
            <h1 key={language} className="hero-title hero-heading-reveal mt-5 font-rajdhani font-bold leading-[.94] text-white"><span className="hero-title-line">{t("heroHeadingTop")}</span><span dir="ltr" className="hero-title-line hero-accent">{t("heroHeadingAccent")}</span></h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">{t("heroText")}</p>
            <div className="hero-search mx-auto mt-9 flex max-w-3xl items-center gap-3 rounded-2xl p-2"><Search className="ms-3 shrink-0 text-slate-500" size={20} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("searchPlaceholder")} className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-500" /><button onClick={() => document.getElementById("popular")?.scrollIntoView({ behavior: "smooth" })} className="search-submit" aria-label={t("searchPlaceholder")}><Search size={18} /></button></div>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400"><span>{language === "ar" ? "الأكثر بحثًا" : "Trending searches"}</span>{popularSearches.map((term) => <button key={term} onClick={() => setQuery(term)} className="trending-chip">{term}</button>)}</div>
            <div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/games" className="gaming-btn inline-flex items-center gap-2">{t("shopNow")} <DirectionIcon size={16} /></Link><Link href="/offers" className="hero-secondary">{t("bestOffers")}</Link></div>
          </div>
        </div>
      </section>

      <section id="popular" className="container py-14 sm:py-20">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><span className="eyebrow">{language === "ar" ? "ابدأ من هنا" : "Start here"}</span><h2 className="mt-2 font-rajdhani text-4xl font-bold uppercase text-white sm:text-5xl">{t("popularGames")}</h2></div><Link href="/games" className="section-link">{t("viewAll")} <DirectionIcon className="inline" size={15} /></Link></div>
        <div className="popular-game-grid popular-game-grid-gamzio">{displayedGames.map(([type, title]) => <Link key={type} href={`/game/${type}`} className="popular-game-card group"><img src={gameImages[type]} alt={title} /><span className="popular-game-card-title">{title}</span><small>{language === "ar" ? "شحن مباشر" : "DIRECT TOP-UPS"}</small></Link>)}</div>
        {displayedGames.length === 0 && <div className="empty-products mt-8">{language === "ar" ? "لم نعثر على لعبة بهذا الاسم" : "No game found"}</div>}
      </section>

      <section className="container pb-16"><div className="trust-strip grid gap-5 rounded-3xl p-6 sm:grid-cols-3 sm:p-8"><div className="flex items-center gap-3"><span className="trust-icon"><Zap size={18} /></span><div><strong>{t("instantDelivery")}</strong><p>{language === "ar" ? "طلبك يصل بسرعة" : "Your order arrives fast"}</p></div></div><div className="flex items-center gap-3"><span className="trust-icon"><ShieldCheck size={18} /></span><div><strong>{t("securePayment")}</strong><p>{language === "ar" ? "دفع آمن وموثوق" : "Safe and trusted payment"}</p></div></div><div className="flex items-center gap-3"><span className="trust-icon"><Check size={18} /></span><div><strong>{t("realSupport")}</strong><p>{language === "ar" ? "نحن هنا لمساعدتك" : "We are here to help"}</p></div></div></div></section>
    </div>
  );
}

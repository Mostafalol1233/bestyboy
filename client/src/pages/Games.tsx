import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { Link } from "wouter";
import { useMemo, useState } from "react";
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
  { type: "crossfire", en: "CrossFire", ar: "كروس فاير", category: "PC / Console" },
  { type: "pubg", en: "PUBG Mobile", ar: "ببجي موبايل", category: "Mobile top-up" },
  { type: "freefire", en: "Free Fire", ar: "فري فاير", category: "Mobile top-up" },
  { type: "codm", en: "Call of Duty Mobile", ar: "كول أوف ديوتي موبايل", category: "Mobile top-up" },
  { type: "mobilelegends", en: "Mobile Legends", ar: "موبايل ليجندز", category: "Mobile top-up" },
  { type: "valorant", en: "Valorant", ar: "فالورانت", category: "PC / Console" },
  { type: "roblox", en: "Roblox", ar: "روبلوكس", category: "Digital currency" },
  { type: "fcmobile", en: "FC Mobile", ar: "إف سي موبايل", category: "Mobile top-up" },
];

export default function Games() {
  const { language, t } = useLanguage();
  const [query, setQuery] = useState("");
  const DirectionIcon = language === "ar" ? ArrowLeft : ArrowRight;
  const filteredGames = useMemo(() => games.filter((game) => {
    const label = language === "ar" ? game.ar : game.en;
    return `${label} ${game.en} ${game.ar}`.toLowerCase().includes(query.toLowerCase());
  }), [language, query]);

  return (
    <div className="games-catalog-page">
      <section className="games-catalog-hero container">
        <div>
          <p className="home-eyebrow">{language === "ar" ? "كتالوج Besty Boy" : "Besty Boy catalogue"}</p>
          <h1 className="games-catalog-title">{language === "ar" ? "كل الألعاب" : "All games"}</h1>
          <p className="games-catalog-description">{language === "ar" ? "اختر لعبتك للوصول إلى كل الباقات والأسعار المتاحة." : "Choose a game to browse every available package and price."}</p>
        </div>
        <div className="games-catalog-count"><strong>{games.length}</strong><span>{language === "ar" ? "ألعاب متاحة" : "games available"}</span></div>
      </section>

      <section className="container pb-20">
        <div className="catalog-toolbar games-catalog-toolbar flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="hero-search games-catalog-search flex items-center gap-3 rounded-xl p-2 sm:w-[420px]"><Search className="ms-3 shrink-0 text-slate-500" size={19} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={language === "ar" ? "ابحث عن لعبة" : "Search games"} className="min-w-0 flex-1 bg-transparent py-2 text-sm text-white outline-none placeholder:text-slate-500" /></div>
          <Link href="/" className="section-link">{language === "ar" ? "العودة للرئيسية" : "Back home"} <DirectionIcon className="inline" size={15} /></Link>
        </div>

        {filteredGames.length > 0 ? <div className="all-games-grid mt-8">{filteredGames.map((game) => {
          const title = language === "ar" ? game.ar : game.en;
          return <Link key={game.type} href={`/game/${game.type}`} className="game-category-card all-games-card group">
            <div className="game-category-image all-games-image"><img src={gameImages[game.type]} alt={title} loading="lazy" /><span className="game-category-arrow"><DirectionIcon size={18} /></span></div>
            <div className="all-games-card-copy"><h2>{title}</h2><p>{language === "ar" ? "باقات شحن مباشرة" : "Direct top-ups"}</p><span>{game.category}</span></div>
          </Link>;
        })}</div> : <div className="empty-products mt-8">{language === "ar" ? "لم نعثر على لعبة بهذا الاسم" : "No game found"}</div>}
      </section>
    </div>
  );
}

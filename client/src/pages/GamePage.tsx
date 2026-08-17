import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
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
  const BackIcon = language === "ar" ? ArrowLeft : ArrowRight;

  if (!meta) return <div className="container py-20 text-center"><h1 className="font-rajdhani text-4xl font-bold text-white">{t("gameNotFound")}</h1><Link href="/games" className="mt-6 inline-block text-cyan-300">{t("backToGames")}</Link></div>;

  return (
    <div className="container py-8 sm:py-12">
      <div className="mb-5 flex items-center gap-2 text-xs text-slate-500"><Link href="/" className="hover:text-cyan-300">{t("home")}</Link><span>/</span><Link href="/games" className="hover:text-cyan-300">{t("games")}</Link><span>/</span><span className="text-slate-300">{language === "ar" ? meta.titleAr : meta.title}</span></div>
      <section className="game-product-hero">
        <div className="game-product-art"><img src={meta.image} alt={language === "ar" ? meta.titleAr : meta.title} /><div className="game-product-art-shade" /><span className="game-product-delivery"><Zap size={14} />{language === "ar" ? "تسليم فوري" : "Instant delivery"}</span></div>
        <div className="game-product-copy">
          <p className="game-section-overline" style={{ color: meta.color }}>{language === "ar" ? "شحن مباشر للعبة" : "Direct top-up"}</p>
          <h1 className="game-product-title">{language === "ar" ? meta.titleAr : meta.title}</h1>
          <p className="game-product-description">{language === "ar" ? meta.descriptionAr : meta.description}</p>
          <div className="game-product-trust"><span><CheckCircle2 size={16} />{t("instantDelivery")}</span><span><ShieldCheck size={16} />{t("securePayment")}</span></div>
          <div className="game-product-stat"><strong>{gameVouchers.length}</strong><span>{language === "ar" ? "باقة متاحة" : "available bundles"}</span></div>
          <Link href="#packages" className="gaming-btn mt-7 inline-flex items-center gap-2">{t("exploreGames")} <BackIcon size={16} /></Link>
        </div>
      </section>
      <div id="packages" className="mt-8"><GameSection gameType={gameType} vouchers={gameVouchers} compact /></div>
    </div>
  );
}

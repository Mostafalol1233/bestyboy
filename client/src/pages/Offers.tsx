import { Tag, TrendingDown } from "lucide-react";
import GameCard from "@/components/GameCard";
import { useVouchers } from "@/contexts/VoucherContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Offers() {
  const { vouchers } = useVouchers();
  const { t } = useLanguage();
  const offers = vouchers.filter((voucher) => voucher.bonus > 0).sort((a, b) => (b.bonus / Math.max(b.amount, 1)) - (a.bonus / Math.max(a.amount, 1))).slice(0, 12);
  return <div className="container py-12"><div className="mb-10 rounded-[2rem] border border-fuchsia-300/20 bg-gradient-to-br from-fuchsia-500/10 to-cyan-400/5 p-8"><span className="eyebrow"><Tag size={15} />{t("offers")}</span><h1 className="mt-3 font-rajdhani text-5xl font-bold text-white">{t("bestOffers")}</h1><p className="mt-3 max-w-2xl leading-7 text-slate-400">{t("heroText")}</p></div>{offers.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{offers.map((voucher) => <GameCard key={voucher.id} voucher={voucher} />)}</div> : <div className="rounded-2xl border border-dashed border-white/15 p-12 text-center text-slate-400"><TrendingDown className="mx-auto mb-3" />{t("noOrders")}</div>}</div>;
}

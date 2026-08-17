import { useMemo } from "react";
import { Link } from "wouter";
import { ClipboardList, UserRound } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getOrders } from "@/contexts/CartContext";

export default function Profile() {
  const { t, language } = useLanguage();
  const orders = useMemo(() => getOrders(), []);
  const statusLabel = (status: string) => ({ pending: t("pending"), paid: t("paid"), delivered: t("delivered"), cancelled: t("cancelled") }[status] || status);
  return <div className="container py-12"><div className="mb-10 flex items-center gap-4"><span className="brand-mark"><UserRound /></span><div><span className="eyebrow">{t("profile")}</span><h1 className="mt-2 font-rajdhani text-5xl font-bold text-white">{t("profile")}</h1></div></div>{orders.length === 0 ? <div className="rounded-[2rem] border border-dashed border-white/15 p-12 text-center"><ClipboardList className="mx-auto mb-4 text-slate-500" size={48} /><p className="text-slate-400">{t("noOrders")}</p><Link href="/games" className="mt-5 inline-block text-cyan-300">{t("shopNow")}</Link></div> : <div className="space-y-4">{orders.map((order) => <article key={order.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="font-orbitron text-sm text-cyan-300">{order.id}</p><p className="mt-1 text-xs text-slate-500">{new Date(order.createdAt).toLocaleDateString(language === "ar" ? "ar-EG" : "en-EG")}</p></div><span className="rounded-lg bg-amber-300/10 px-3 py-1 text-xs text-amber-200">{statusLabel(order.status)}</span></div><div className="mt-4 flex flex-wrap justify-between gap-3 text-sm text-slate-300"><span>{order.items.length} {t("card")}</span><strong className="font-orbitron text-white">{order.total.toLocaleString()} {t("currency")}</strong></div></article>)}</div>}</div>;
}

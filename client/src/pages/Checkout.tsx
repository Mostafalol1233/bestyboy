import { FormEvent, useState } from "react";
import { Link, useLocation } from "wouter";
import { CheckCircle2, LockKeyhole, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";

type PaymentKey = "vodafone" | "instapay" | "cash";
const paymentOptions: Array<{ value: string; labelKey: PaymentKey; icon: string; className: string }> = [
  { value: "vodafone", labelKey: "vodafone", icon: "/assets/payments/vodafone.svg", className: "payment-vodafone" },
  { value: "instapay", labelKey: "instapay", icon: "/assets/payments/instapay.svg", className: "payment-instapay" },
  { value: "whatsapp", labelKey: "cash", icon: "/assets/payments/whatsapp.svg", className: "payment-whatsapp" },
];

export default function Checkout() {
  const { items, subtotal, createOrder } = useCart();
  const { t, language } = useLanguage();
  const [, navigate] = useLocation();
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [form, setForm] = useState({ playerId: "", server: "", email: "", paymentMethod: "" });
  const money = (value: number) => `${value.toLocaleString(language === "ar" ? "ar-EG" : "en-EG")} ${t("currency")}`;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!form.playerId || !form.email || !form.paymentMethod) return;
    const order = createOrder(form);
    setSubmitted(order.id);
    const message = encodeURIComponent(`${language === "ar" ? "طلب جديد من Besty Boy" : "New Besty Boy order"}\n${t("orderNumber")}: ${order.id}\n${t("playerId")}: ${order.playerId}\n${t("server")}: ${order.server || "-"}\n${t("email")}: ${order.email}\n${t("subtotal")}: ${money(order.total)}\n${t("paymentMethod")}: ${order.paymentMethod}`);
    window.open(`https://wa.me/201096065772?text=${message}`, "_blank", "noopener,noreferrer");
  };

  if (submitted) return <div className="container flex min-h-[60vh] items-center justify-center py-16"><div className="max-w-lg rounded-[2rem] border border-emerald-300/20 bg-emerald-300/5 p-8 text-center"><CheckCircle2 className="mx-auto mb-5 text-emerald-300" size={54} /><h1 className="font-rajdhani text-4xl font-bold text-white">{t("orderSuccess")}</h1><p className="mt-3 leading-7 text-slate-400">{t("orderSuccessText")}</p><p className="mt-5 rounded-xl bg-white/5 p-3 text-sm text-slate-300">{t("orderNumber")}: <strong className="font-orbitron text-cyan-300">{submitted}</strong></p><Link href="/"><Button className="gaming-btn mt-6">{t("backHome")}</Button></Link></div></div>;
  if (!items.length) return <div className="container flex min-h-[60vh] items-center justify-center py-16"><div className="text-center"><ShoppingBag className="mx-auto mb-4 text-slate-500" size={48} /><h1 className="font-rajdhani text-4xl font-bold text-white">{t("emptyCart")}</h1><p className="mt-2 text-slate-400">{t("emptyCartText")}</p><Button onClick={() => navigate("/")} className="gaming-btn mt-6">{t("continueShopping")}</Button></div></div>;

  return <div className="container py-8 sm:py-12"><div className="mb-8"><span className="eyebrow"><LockKeyhole size={15} />{t("securePayment")}</span><h1 className="mt-3 font-rajdhani text-5xl font-bold text-white">{t("checkoutTitle")}</h1><p className="mt-2 text-slate-400">{t("deliveryNote")}</p></div><div className="grid gap-8 lg:grid-cols-[1fr_380px]"><form onSubmit={submit} className="checkout-panel"><div className="grid gap-5 sm:grid-cols-2"><label className="field-label">{t("playerId")}<input required value={form.playerId} onChange={(e) => setForm({ ...form, playerId: e.target.value })} className="field-input" placeholder="123456789" /></label><label className="field-label">{t("server")}<input value={form.server} onChange={(e) => setForm({ ...form, server: e.target.value })} className="field-input" placeholder={language === "ar" ? "مثال: الشرق الأوسط" : "Example: Middle East"} /></label><label className="field-label sm:col-span-2">{t("email")}<input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="field-input" placeholder="you@example.com" /></label></div><fieldset className="mt-7"><legend className="field-label mb-3">{t("paymentMethod")}</legend><div className="grid gap-3 sm:grid-cols-3">{paymentOptions.map((option) => <label key={option.value} className={`payment-option ${option.className} ${form.paymentMethod === option.value ? "payment-option-active" : ""}`}><input type="radio" name="payment" value={option.value} checked={form.paymentMethod === option.value} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })} /><img src={option.icon} alt={t(option.labelKey)} /><span>{t(option.labelKey)}</span></label>)}</div></fieldset><div className="payment-security-note"><LockKeyhole size={16} /><span>{language === "ar" ? "بياناتك لا تُحفظ إلا لإتمام الطلب والتواصل معك." : "Your details are only used to complete and confirm the order."}</span></div><Button type="submit" className="gaming-btn mt-8 w-full">{t("placeOrder")}</Button></form><aside className="checkout-summary"><h2 className="font-rajdhani text-2xl font-bold text-white">{t("cart")}</h2><div className="mt-5 space-y-4">{items.map(({ voucher, quantity }) => <div key={voucher.id} className="flex justify-between gap-4 border-b border-white/10 pb-4 text-sm"><div><p className="font-semibold text-white">{voucher.gameType} — {voucher.amount.toLocaleString()} {voucher.currency}</p><p className="mt-1 text-slate-500">{t("quantity")}: {quantity}</p></div><span className="font-orbitron text-cyan-300">{money((voucher.price || 0) * quantity)}</span></div>)}</div><div className="mt-5 flex justify-between text-lg font-bold text-white"><span>{t("subtotal")}</span><span className="font-orbitron text-cyan-300">{money(subtotal)}</span></div><div className="accepted-payments"><span>{language === "ar" ? "وسائل دفع موثوقة" : "Trusted payment options"}</span><div><img src="/assets/payments/visa.svg" alt="Visa" /><img src="/assets/payments/mastercard.svg" alt="Mastercard" /><img src="/assets/payments/applepay.svg" alt="Apple Pay" /><img src="/assets/payments/googlepay.svg" alt="Google Pay" /></div></div></aside></div></div>;
}

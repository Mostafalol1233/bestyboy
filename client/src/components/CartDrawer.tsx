import { Link } from "wouter";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const { t, language } = useLanguage();
  const money = (value: number) => `${value.toLocaleString(language === "ar" ? "ar-EG" : "en-EG")} ${t("currency")}`;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label={t("cart")}>
      <button className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-label={t("remove")} />
      <aside className="absolute top-0 end-0 h-full w-full max-w-md border-s border-white/10 bg-[#10131d] p-5 shadow-2xl shadow-cyan-500/10 animate-slide-in">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="rounded-xl bg-cyan-400/10 p-2 text-cyan-300"><ShoppingBag size={20} /></span>
            <div>
              <h2 className="font-rajdhani text-2xl font-bold text-white">{t("cart")}</h2>
              <p className="text-xs text-slate-400">{items.length} {t("card")}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-slate-400 hover:text-white"><X size={20} /></Button>
        </div>

        {items.length === 0 ? (
          <div className="flex h-[70%] flex-col items-center justify-center text-center">
            <div className="mb-4 rounded-3xl border border-cyan-300/20 bg-cyan-300/5 p-5 text-cyan-300"><ShoppingBag size={38} /></div>
            <h3 className="font-rajdhani text-2xl font-bold text-white">{t("emptyCart")}</h3>
            <p className="mt-2 max-w-xs text-sm text-slate-400">{t("emptyCartText")}</p>
            <Button onClick={onClose} className="mt-6 gaming-btn">{t("continueShopping")}</Button>
          </div>
        ) : (
          <>
            <div className="max-h-[calc(100vh-220px)] space-y-3 overflow-y-auto py-5">
              {items.map(({ voucher, quantity }) => (
                <div key={voucher.id} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                  <img src={voucher.imageUrl || "/attached_assets/image_1747412665992.png"} alt={voucher.description} className="h-20 w-20 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="truncate font-rajdhani text-lg font-bold text-white">{voucher.gameType}</h3>
                        <p className="text-xs text-slate-400">{voucher.amount.toLocaleString()} {voucher.currency}</p>
                      </div>
                      <button onClick={() => removeItem(voucher.id)} className="text-slate-500 transition hover:text-rose-400" aria-label={t("remove")}><Trash2 size={16} /></button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-lg border border-white/10 px-1 py-1">
                        <button onClick={() => updateQuantity(voucher.id, quantity - 1)} className="rounded p-1 text-slate-300 hover:bg-white/10"><Minus size={13} /></button>
                        <span className="min-w-5 text-center text-sm text-white">{quantity}</span>
                        <button onClick={() => updateQuantity(voucher.id, quantity + 1)} className="rounded p-1 text-slate-300 hover:bg-white/10"><Plus size={13} /></button>
                      </div>
                      <span className="font-orbitron text-sm font-bold text-cyan-300">{money((voucher.price || 0) * quantity)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute inset-x-5 bottom-5 border-t border-white/10 bg-[#10131d] pt-4">
              <div className="mb-3 flex items-center justify-between text-slate-300"><span>{t("subtotal")}</span><strong className="font-orbitron text-lg text-white">{money(subtotal)}</strong></div>
              <Link href="/checkout" onClick={onClose}><Button className="gaming-btn w-full">{t("checkout")}</Button></Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

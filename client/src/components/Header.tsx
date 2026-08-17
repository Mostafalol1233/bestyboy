import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { Gamepad2, Menu, ShoppingBag, X } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";

interface HeaderProps { onCartOpen: () => void; }

export default function Header({ onCartOpen }: HeaderProps) {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const [location] = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = [
    { href: "/", label: t("home") },
    { href: "/games", label: t("games") },
    { href: "/offers", label: t("offers") },
    { href: "/blog", label: t("blog") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#090b12]/85 backdrop-blur-xl">
      <div className="container flex min-h-20 items-center justify-between gap-4">
        <Link href="/" onClick={() => setMobileOpen(false)}>
          <div className="flex cursor-pointer items-center gap-3">
            <span className="brand-mark"><Gamepad2 size={22} /></span>
            <span className="font-orbitron text-xl font-bold tracking-tight text-white sm:text-2xl"><span className="text-cyan-300">Besty</span><span className="text-fuchsia-400"> Boy</span></span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => <Link key={link.href} href={link.href} className={`nav-link ${location === link.href ? "nav-link-active" : ""}`}>{link.label}</Link>)}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center rounded-full border border-white/10 bg-white/[0.04] p-1 sm:flex">
            <button onClick={() => setLanguage("ar")} className={`lang-pill ${language === "ar" ? "lang-pill-active" : ""}`}>ع</button>
            <button onClick={() => setLanguage("en")} className={`lang-pill ${language === "en" ? "lang-pill-active" : ""}`}>EN</button>
          </div>
          <button onClick={onCartOpen} className="relative rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-slate-200 transition hover:border-cyan-300/40 hover:text-cyan-300" aria-label={t("cart")}>
            <ShoppingBag size={20} />
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </button>
          <div className="hidden items-center gap-2 md:flex">
            <a href="https://www.facebook.com/BestyBoyy/" target="_blank" rel="noreferrer" className="social-icon"><FaFacebook /></a>
            <a href="https://www.youtube.com/@Besty_Boy" target="_blank" rel="noreferrer" className="social-icon"><FaYoutube /></a>
            {isAuthenticated && <Button size="sm" variant="outline" onClick={logout} className="border-white/15 text-slate-200">{t("logout")}</Button>}
            {isAdmin && <Link href="/admin" className="text-xs text-cyan-300">{t("admin")}</Link>}
          </div>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="rounded-xl border border-white/10 p-2 text-slate-200 lg:hidden" aria-label={mobileOpen ? "Close" : "Menu"}>{mobileOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </div>
      {mobileOpen && <div className="border-t border-white/10 bg-[#0d1019] p-4 lg:hidden"><nav className="container grid gap-2">{links.map((link) => <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className={`rounded-xl px-4 py-3 text-sm ${location === link.href ? "bg-cyan-300/10 text-cyan-300" : "text-slate-300"}`}>{link.label}</Link>)}<div className="flex items-center gap-2 pt-2"><button onClick={() => setLanguage("ar")} className={`lang-pill ${language === "ar" ? "lang-pill-active" : ""}`}>العربية</button><button onClick={() => setLanguage("en")} className={`lang-pill ${language === "en" ? "lang-pill-active" : ""}`}>English</button></div></nav></div>}
    </header>
  );
}

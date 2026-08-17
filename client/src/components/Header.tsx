import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { Menu, ShoppingBag, UserRound, X } from "lucide-react";
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
    <header className="site-header sticky top-0 z-50">
      <div className="top-strip hidden md:block">
        <div className="container flex items-center justify-between text-[11px] text-slate-500">
          <span>{language === "ar" ? "شحن رقمي سريع ودعم حقيقي عبر واتساب" : "Fast digital delivery with real WhatsApp support"}</span>
          <span>{language === "ar" ? "آمن • سريع • موثوق" : "Secure • Fast • Trusted"}</span>
        </div>
      </div>
      <div className="container flex min-h-[78px] items-center justify-between gap-4">
        <Link href="/" onClick={() => setMobileOpen(false)} className="shrink-0" aria-label="Besty Boy home">
          <img src="/logo.svg" alt="Besty Boy" className="brand-logo" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => <Link key={link.href} href={link.href} className={`nav-link ${location === link.href ? "nav-link-active" : ""}`}>{link.label}</Link>)}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center rounded-full border border-white/10 bg-white/[0.04] p-1 sm:flex">
            <button onClick={() => setLanguage("ar")} className={`lang-pill ${language === "ar" ? "lang-pill-active" : ""}`}>ع</button>
            <button onClick={() => setLanguage("en")} className={`lang-pill ${language === "en" ? "lang-pill-active" : ""}`}>EN</button>
          </div>
          <Link href="/profile" className="header-icon hidden sm:inline-flex" aria-label={t("profile")}><UserRound size={18} /></Link>
          <button onClick={onCartOpen} className="header-icon relative" aria-label={t("cart")}>
            <ShoppingBag size={19} />
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </button>
          <div className="hidden items-center gap-2 md:flex">
            <a href="https://www.facebook.com/BestyBoyy/" target="_blank" rel="noreferrer" className="social-icon"><FaFacebook /></a>
            <a href="https://www.youtube.com/@Besty_Boy" target="_blank" rel="noreferrer" className="social-icon"><FaYoutube /></a>
            {isAuthenticated && <Button size="sm" variant="outline" onClick={logout} className="border-white/15 text-slate-200">{t("logout")}</Button>}
            {isAdmin && <Link href="/admin" className="text-xs text-cyan-300">{t("admin")}</Link>}
          </div>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="header-icon lg:hidden" aria-label={mobileOpen ? "Close" : "Menu"}>{mobileOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </div>
      {mobileOpen && <div className="mobile-menu lg:hidden"><nav className="container grid gap-1 py-3">{links.map((link) => <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className={`mobile-nav-link ${location === link.href ? "mobile-nav-link-active" : ""}`}>{link.label}</Link>)}<Link href="/profile" onClick={() => setMobileOpen(false)} className="mobile-nav-link">{t("profile")}</Link><div className="flex items-center gap-2 border-t border-white/10 pt-3"><button onClick={() => setLanguage("ar")} className={`lang-pill ${language === "ar" ? "lang-pill-active" : ""}`}>العربية</button><button onClick={() => setLanguage("en")} className={`lang-pill ${language === "en" ? "lang-pill-active" : ""}`}>English</button></div></nav></div>}
    </header>
  );
}

import { Link } from "wouter";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { ShieldCheck, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="site-footer mt-20">
      <div className="container grid gap-12 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex" aria-label="Besty Boy home"><img src="/logo.svg" alt="Besty Boy" className="brand-logo brand-logo-footer" /></Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">{t("footerTagline")}</p>
          <div className="mt-6 flex gap-2"><a className="social-icon" href="https://www.facebook.com/BestyBoyy/" target="_blank" rel="noreferrer"><FaFacebook /></a><a className="social-icon" href="https://www.youtube.com/@Besty_Boy" target="_blank" rel="noreferrer"><FaYoutube /></a><a className="social-icon" href="https://wa.me/201096065772" target="_blank" rel="noreferrer"><FaWhatsapp /></a><a className="social-icon" href="#" aria-label="Instagram"><FaInstagram /></a><a className="social-icon" href="#" aria-label="TikTok"><FaTiktok /></a></div>
        </div>
        <div><h3 className="footer-title">{t("quickLinks")}</h3><div className="grid gap-3 text-sm text-slate-400"><Link href="/" className="footer-link">{t("home")}</Link><Link href="/games" className="footer-link">{t("games")}</Link><Link href="/offers" className="footer-link">{t("offers")}</Link><Link href="/blog" className="footer-link">{t("blog")}</Link><Link href="/contact" className="footer-link">{t("contact")}</Link></div></div>
        <div><h3 className="footer-title">{t("about")}</h3><div className="grid gap-4 text-sm text-slate-400"><p className="flex items-center gap-2"><Zap size={16} className="text-rose-400" />{t("instantDelivery")}</p><p className="flex items-center gap-2"><ShieldCheck size={16} className="text-rose-400" />{t("securePayment")}</p><p className="flex items-center gap-2"><FaWhatsapp className="text-emerald-400" />{t("realSupport")}</p></div></div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-500">© 2026 Besty Boy — {t("rights")}</div>
    </footer>
  );
}

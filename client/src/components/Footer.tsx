import { Link } from "wouter";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { Gamepad2, ShieldCheck, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#080a10]">
      <div className="container grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="mb-4 flex items-center gap-3"><span className="brand-mark"><Gamepad2 size={20} /></span><span className="font-orbitron text-xl font-bold text-white"><span className="text-cyan-300">Besty</span><span className="text-fuchsia-400"> Boy</span></span></div>
          <p className="max-w-sm text-sm leading-7 text-slate-400">{t("footerTagline")}</p>
          <div className="mt-5 flex gap-2"><a className="social-icon" href="https://www.facebook.com/BestyBoyy/" target="_blank" rel="noreferrer"><FaFacebook /></a><a className="social-icon" href="https://www.youtube.com/@Besty_Boy" target="_blank" rel="noreferrer"><FaYoutube /></a><a className="social-icon" href="https://wa.me/201096065772" target="_blank" rel="noreferrer"><FaWhatsapp /></a><a className="social-icon" href="#" aria-label="Instagram"><FaInstagram /></a><a className="social-icon" href="#" aria-label="TikTok"><FaTiktok /></a></div>
        </div>
        <div><h3 className="mb-4 font-rajdhani text-lg font-bold text-white">{t("quickLinks")}</h3><div className="grid gap-3 text-sm text-slate-400"><Link href="/" className="transition hover:text-cyan-300">{t("home")}</Link><Link href="/games" className="transition hover:text-cyan-300">{t("games")}</Link><Link href="/offers" className="transition hover:text-cyan-300">{t("offers")}</Link><Link href="/blog" className="transition hover:text-cyan-300">{t("blog")}</Link><Link href="/contact" className="transition hover:text-cyan-300">{t("contact")}</Link></div></div>
        <div><h3 className="mb-4 font-rajdhani text-lg font-bold text-white">{t("about")}</h3><div className="grid gap-4 text-sm text-slate-400"><p className="flex items-center gap-2"><Zap size={16} className="text-cyan-300" />{t("instantDelivery")}</p><p className="flex items-center gap-2"><ShieldCheck size={16} className="text-fuchsia-300" />{t("securePayment")}</p><p className="flex items-center gap-2"><FaWhatsapp className="text-emerald-400" />{t("realSupport")}</p></div></div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-500">© 2026 Besty Boy — {t("rights")}</div>
    </footer>
  );
}

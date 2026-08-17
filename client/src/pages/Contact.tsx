import { FaFacebook, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { Clock3, Mail, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  return <div className="container py-12"><div className="mx-auto max-w-3xl text-center"><span className="eyebrow"><MessageCircle size={15} />{t("contact")}</span><h1 className="mt-3 font-rajdhani text-5xl font-bold text-white">{t("contactTitle")}</h1><p className="mt-4 leading-8 text-slate-400">{t("contactText")}</p></div><div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-3"><a href="https://wa.me/201096065772" target="_blank" rel="noreferrer" className="contact-card"><FaWhatsapp className="text-3xl text-emerald-400" /><h2>{t("sendMessage")}</h2><span>+20 109 606 5772</span></a><a href="mailto:hello@bestyboy.com" className="contact-card"><Mail className="text-3xl text-cyan-300" /><h2>{t("email")}</h2><span>hello@bestyboy.com</span></a><div className="contact-card"><Clock3 className="text-3xl text-fuchsia-300" /><h2>{t("realSupport")}</h2><span>{t("instantDelivery")}</span></div></div><div className="mt-10 flex justify-center gap-3"><a className="social-icon" href="https://www.facebook.com/BestyBoyy/" target="_blank" rel="noreferrer"><FaFacebook /></a><a className="social-icon" href="https://www.youtube.com/@Besty_Boy" target="_blank" rel="noreferrer"><FaYoutube /></a><a className="social-icon" href="https://wa.me/201096065772" target="_blank" rel="noreferrer"><FaWhatsapp /></a></div></div>;
}

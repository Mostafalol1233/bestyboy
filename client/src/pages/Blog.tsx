import { BookOpen, CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const posts = [
  { key: "topup", title: "كيف تختار بطاقة الشحن المناسبة؟", titleEn: "How to choose the right top-up card", text: "تعرف على الفرق بين الرصيد الأساسي والمكافأة، وكيف تختار القيمة المناسبة لأسلوب لعبك.", textEn: "Learn the difference between base value and bonus, and choose the right amount for your play style." },
  { key: "security", title: "ثلاث نصائح لحماية حسابك", titleEn: "Three tips to protect your account", text: "لا تشارك كلمة المرور أو رمز التحقق، وتأكد من إدخال معرّف اللاعب الصحيح قبل تأكيد الطلب.", textEn: "Never share your password or verification code, and check your player ID before confirming an order." },
  { key: "offers", title: "كيف تستفيد من عروض Besty Boy؟", titleEn: "How to make the most of Besty Boy offers", text: "تابع صفحة العروض واطلب مبكرًا للحصول على البطاقات ذات المكافآت الأعلى.", textEn: "Follow the offers page and order early to get vouchers with the best bonuses." },
];

export default function Blog() {
  const { language, t } = useLanguage();
  const Forward = language === "ar" ? ChevronLeft : ChevronRight;
  return <div className="container py-12"><div className="mb-10"><span className="eyebrow"><BookOpen size={15} />{t("blog")}</span><h1 className="mt-3 font-rajdhani text-5xl font-bold text-white">{t("blogTitle")}</h1><p className="mt-3 max-w-2xl leading-7 text-slate-400">{t("blogText")}</p></div><div className="grid gap-5 md:grid-cols-3">{posts.map((post, index) => <article key={post.key} className="group rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-cyan-300/30"><div className="flex items-center justify-between text-xs text-slate-500"><span className="rounded-lg bg-cyan-300/10 px-2 py-1 text-cyan-300">0{index + 1}</span><span className="flex items-center gap-1"><CalendarDays size={13} />2026</span></div><h2 className="mt-7 font-rajdhani text-2xl font-bold text-white">{language === "ar" ? post.title : post.titleEn}</h2><p className="mt-3 text-sm leading-7 text-slate-400">{language === "ar" ? post.text : post.textEn}</p><button className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">{t("learnMore")} <Forward size={16} /></button></article>)}</div></div>;
}

import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";

type Language = "ar" | "en";
type TranslationKey = keyof typeof translations.ar;

const translations = {
  ar: {
    home: "الرئيسية",
    games: "الألعاب",
    offers: "العروض",
    blog: "المدونة",
    contact: "تواصل معنا",
    profile: "حسابي",
    admin: "لوحة الإدارة",
    cart: "السلة",
    shopNow: "تسوق الآن",
    exploreGames: "استكشف الألعاب",
    heroEyebrow: "منصتك الآمنة لعالم الألعاب",
    heroTitle: "اشحن لعبتك، وارفع مستواك",
    heroText: "بطاقات وشحن رقمي للألعاب المفضلة لديك، بتوصيل سريع ودعم حقيقي عبر واتساب.",
    instantDelivery: "توصيل سريع",
    securePayment: "دفع آمن",
    realSupport: "دعم حقيقي",
    popularGames: "الألعاب الأكثر طلباً",
    bestOffers: "عروض مختارة لك",
    allGames: "كل الألعاب",
    viewAll: "عرض الكل",
    searchPlaceholder: "ابحث عن لعبة أو بطاقة...",
    buyNow: "اشتر الآن",
    addToCart: "أضف للسلة",
    addedToCart: "تمت الإضافة إلى السلة",
    card: "بطاقة",
    bonus: "هدية إضافية",
    from: "يبدأ من",
    currency: "جنيه",
    emptyCart: "سلتك فارغة",
    emptyCartText: "أضف بطاقاتك المفضلة لتظهر هنا.",
    continueShopping: "تابع التسوق",
    subtotal: "الإجمالي الفرعي",
    checkout: "إتمام الطلب",
    remove: "حذف",
    quantity: "الكمية",
    checkoutTitle: "إتمام الطلب",
    playerId: "معرّف اللاعب",
    server: "الخادم أو المنطقة",
    email: "البريد الإلكتروني",
    paymentMethod: "طريقة الدفع",
    choosePayment: "اختر طريقة الدفع",
    vodafone: "فودافون كاش",
    instapay: "إنستاباي",
    cash: "تأكيد عبر واتساب",
    placeOrder: "تأكيد الطلب",
    orderSuccess: "تم استلام طلبك",
    orderSuccessText: "سنراجع بياناتك ونتواصل معك عبر واتساب لتأكيد الدفع والتوصيل.",
    orderNumber: "رقم الطلب",
    backHome: "العودة للرئيسية",
    language: "اللغة",
    arabic: "العربية",
    english: "English",
    featuresTitle: "لماذا Besty Boy؟",
    featuresText: "تجربة شحن أبسط، أسرع، وأكثر وضوحاً من أول نقرة حتى وصول البطاقة.",
    footerTagline: "متجرك الموثوق لشحن الألعاب والبطاقات الرقمية.",
    quickLinks: "روابط سريعة",
    followUs: "تابعنا",
    rights: "جميع الحقوق محفوظة",
    about: "عن Besty Boy",
    blogTitle: "أخبار ونصائح اللاعبين",
    blogText: "محتوى مختصر يساعدك على اختيار البطاقة المناسبة والاستفادة من عروضنا.",
    contactTitle: "نحن هنا لمساعدتك",
    contactText: "تواصل معنا عبر واتساب أو صفحاتنا الاجتماعية وسنرد عليك بأسرع وقت.",
    sendMessage: "تواصل عبر واتساب",
    gameNotFound: "اللعبة غير موجودة",
    backToGames: "العودة إلى الألعاب",
    adminDashboard: "لوحة تحكم Besty Boy",
    overview: "نظرة عامة",
    manageCards: "إدارة البطاقات",
    manageOrders: "إدارة الطلبات",
    customers: "العملاء",
    coupons: "الكوبونات",
    settings: "الإعدادات",
    backup: "نسخة احتياطية",
    totalProducts: "عدد المنتجات",
    totalOrders: "إجمالي الطلبات",
    totalRevenue: "إجمالي المبيعات",
    pendingOrders: "طلبات قيد المراجعة",
    save: "حفظ",
    status: "الحالة",
    pending: "قيد المراجعة",
    paid: "تم الدفع",
    delivered: "تم التوصيل",
    cancelled: "ملغي",
    noOrders: "لا توجد طلبات بعد",
    adminLogin: "تسجيل دخول الإدارة",
    username: "اسم المستخدم",
    password: "كلمة المرور",
    login: "دخول",
    logout: "تسجيل الخروج",
    loginHint: "استخدم بيانات الإدارة الحالية للوصول إلى لوحة التحكم.",
    learnMore: "اعرف المزيد",
    deliveryNote: "يتم تنفيذ الطلبات يدوياً بعد تأكيد الدفع.",
  },
  en: {
    home: "Home",
    games: "Games",
    offers: "Offers",
    blog: "Blog",
    contact: "Contact",
    profile: "My account",
    admin: "Admin",
    cart: "Cart",
    shopNow: "Shop now",
    exploreGames: "Explore games",
    heroEyebrow: "Your trusted gaming marketplace",
    heroTitle: "Power your game. Level up.",
    heroText: "Digital vouchers and top-ups for your favorite games, with fast delivery and real WhatsApp support.",
    instantDelivery: "Fast delivery",
    securePayment: "Secure payment",
    realSupport: "Real support",
    popularGames: "Popular games",
    bestOffers: "Handpicked offers",
    allGames: "All games",
    viewAll: "View all",
    searchPlaceholder: "Search a game or voucher...",
    buyNow: "Buy now",
    addToCart: "Add to cart",
    addedToCart: "Added to cart",
    card: "Card",
    bonus: "Bonus",
    from: "From",
    currency: "EGP",
    emptyCart: "Your cart is empty",
    emptyCartText: "Add your favorite vouchers and they will appear here.",
    continueShopping: "Continue shopping",
    subtotal: "Subtotal",
    checkout: "Checkout",
    remove: "Remove",
    quantity: "Quantity",
    checkoutTitle: "Checkout",
    playerId: "Player ID",
    server: "Server or region",
    email: "Email",
    paymentMethod: "Payment method",
    choosePayment: "Choose a payment method",
    vodafone: "Vodafone Cash",
    instapay: "InstaPay",
    cash: "Confirm via WhatsApp",
    placeOrder: "Place order",
    orderSuccess: "Order received",
    orderSuccessText: "We will review your details and contact you on WhatsApp to confirm payment and delivery.",
    orderNumber: "Order number",
    backHome: "Back home",
    language: "Language",
    arabic: "العربية",
    english: "English",
    featuresTitle: "Why Besty Boy?",
    featuresText: "A simpler, faster and clearer top-up experience from the first click to delivery.",
    footerTagline: "Your trusted store for gaming top-ups and digital vouchers.",
    quickLinks: "Quick links",
    followUs: "Follow us",
    rights: "All rights reserved",
    about: "About Besty Boy",
    blogTitle: "Player news and tips",
    blogText: "Short guides to help you choose the right voucher and make the most of our offers.",
    contactTitle: "We are here to help",
    contactText: "Reach us on WhatsApp or social media and we will reply as quickly as possible.",
    sendMessage: "Chat on WhatsApp",
    gameNotFound: "Game not found",
    backToGames: "Back to games",
    adminDashboard: "Besty Boy admin dashboard",
    overview: "Overview",
    manageCards: "Manage cards",
    manageOrders: "Manage orders",
    customers: "Customers",
    coupons: "Coupons",
    settings: "Settings",
    backup: "Backup",
    totalProducts: "Products",
    totalOrders: "Orders",
    totalRevenue: "Revenue",
    pendingOrders: "Pending orders",
    save: "Save",
    status: "Status",
    pending: "Pending",
    paid: "Paid",
    delivered: "Delivered",
    cancelled: "Cancelled",
    noOrders: "No orders yet",
    adminLogin: "Admin login",
    username: "Username",
    password: "Password",
    login: "Login",
    logout: "Logout",
    loginHint: "Use the current admin credentials to access the dashboard.",
    learnMore: "Learn more",
    deliveryNote: "Orders are fulfilled manually after payment confirmation.",
  },
} as const;

interface LanguageContextValue {
  language: Language;
  direction: "rtl" | "ltr";
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("bestyboy_language");
    return saved === "en" ? "en" : "ar";
  });

  const setLanguage = (next: Language) => {
    setLanguageState(next);
    localStorage.setItem("bestyboy_language", next);
  };

  const direction = language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    document.body.dataset.language = language;
  }, [language, direction]);

  const value = useMemo(() => ({
    language,
    direction,
    setLanguage,
    t: (key: TranslationKey) => translations[language][key] ?? translations.en[key],
  }), [language, direction]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}

export type { Language, TranslationKey };

// كتالوج التسعير — عنوان القهوة | إنشاء وترميم كافيهات — قبل الضريبة 15%
// تاريخ: 19 نوفمبر 2026 — تم تفريغ كل البنود والاحتفاظ برؤوس الأقلام فقط
// النسخة الكاملة القديمة محفوظة في: pricing_backup_2042_before_rebuild.js
// نسخة الـ 78 بند الرئيسية محفوظة في: pricing_backup_78_main_before_empty.js
// هذا الملف هو اللي يقرأ منه pm.html لما يكون بدون انترنت / كبديل لـ Supabase
// طريقة التعبئة: انسخ قالب البند اللي تحت، غيّر الـ code والاسم والسعر، وحطه داخل PRICE_CATALOG

// رؤوس الأقلام الرئيسية — 12 قسم فقط لكافيهات عنوان القهوة
const MAIN_CATEGORIES = [
  { category: "زيارة وفحص", note: "زيارة فني / تشخيص / طارئة" },
  { category: "إزالة وهدم", note: "تكسير / إزالة بلاط / فك جبس / ترحيل مخلفات" },
  { category: "مباني ولياسة", note: "بلوك / لياسة / ترميم لياسة" },
  { category: "بلاط وأرضيات", note: "توريد + تركيب / مصنعية / غراء / روبة / وزرة / سكريد" },
  { category: "دهان", note: "دهان داخلي / سقف / إيبوكسي / حديد / معالجة شروخ" },
  { category: "أسقف وقواطع", note: "سقف جبس مسطح / بيت نور / قاطع جبس / فتحة صيانة" },
  { category: "كهرباء وإنارة", note: "نقطة إنارة / مقبس / نقطة جهاز / سبوت / مسار / لوحة" },
  { category: "سباكة وصرف", note: "تمديد PPR / صرف / تأسيس دورة مياه / مغسلة / مصيدة دهون" },
  { category: "تكييف وتهوية", note: "سبليت / نحاس / دكت / مروحة شفط / تنظيف" },
  { category: "أبواب وألمنيوم وزجاج", note: "باب خشب / WPC / ألمنيوم / زجاج سيكوريت / قفل" },
  { category: "عزل", note: "عزل دورة مياه / عزل سطح / كشف تسرب" },
  { category: "تنظيف وتسليم", note: "تنظيف نهائي بعد التشطيب" },
];

// قاعدة التسعير — فارغة الآن، أنت تعبّي كل قسم لحاله
const PRICE_CATALOG = [
  // مثال — احذف هذا السطر أو انسخ شكله لبند جديد:
  // {"code": "TILE-6060", "category": "بلاط وأرضيات", "name": "توريد وتركيب بورسلان 60×60", "spec": "مع الغراء والروبة", "unit": "م²", "material_cost": 0.0, "labor_cost": 0.0, "equipment_cost": 0.0, "market_low": 0.0, "market_fair": 0.0, "market_high": 0.0, "source": ""},
];

if (typeof window !== 'undefined') { window.PRICE_CATALOG = PRICE_CATALOG; window.PRICING = PRICE_CATALOG; window.MAIN_CATEGORIES = MAIN_CATEGORIES; }
if (typeof module !== 'undefined' && module.exports) { module.exports = PRICE_CATALOG; }

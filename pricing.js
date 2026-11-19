// مرجع التسعير — عنوان القهوة | المواد بأسعار يحددها المالك، وأجور يومية استرشادية بالرياض.
// تاريخ تحديث أجور العمالة: 19 نوفمبر 2026. جميع أسعار المواد فارغة حتى يضيف المالك عروض الموردين.

const MAIN_CATEGORIES = [
  { category: "مباني ولياسة", note: "أسمنت / بلوك / رمل / خلطة لياسة" },
  { category: "حديد وحدادة", note: "حديد تسليح / شبك / قطاعات / مواسير / صاج" },
  { category: "بلاط وأرضيات", note: "بورسلان / سيراميك / لاصق / روبة / وزرة" },
  { category: "دهان", note: "دهان / معجون / برايمر / إيبوكسي" },
  { category: "أسقف وقواطع", note: "ألواح جبس / هيكل / عزل" },
  { category: "كهرباء وإنارة", note: "أسلاك / مواسير / مقابس / وحدات إنارة" },
  { category: "سباكة وصرف", note: "PPR / PVC / محابس / خلاطات / أدوات صحية" },
  { category: "تكييف وتهوية", note: "نحاس / تصريف / عزل مواسير" },
  { category: "عزل", note: "لفائف / عزل سائل / مواد مانعة للتسرب" },
  { category: "أبواب وزجاج", note: "أبواب / أقفال / زجاج سيكوريت" },
  { category: "أعمال خارجية", note: "إنترلوك / بردورة" },
  { category: "متفرقات", note: "مواد رئيسية أخرى" },
];

const MATERIAL_ITEMS = [
  { category: "مباني ولياسة", items: ["أسمنت بورتلاندي 50 كجم", "بلوك أسمنتي 20 سم", "بلوك أسمنتي 10 سم", "رمل مغسول", "خلطة لياسة جاهزة"] },
  { category: "حديد وحدادة", items: ["حديد تسليح بالطن أو الكيلو", "شبك تسليح ملحوم", "قطاعات I / H", "مواسير وقطاعات حديد مجوفة", "زوايا وقنوات حديد", "صاج", "أسياخ لحام"] },
  { category: "بلاط وأرضيات", items: ["بورسلان / سيراميك", "لاصق بلاط 20 كجم", "روبة بلاط", "وزرة بلاط"] },
  { category: "دهان", items: ["دهان داخلي", "معجون جدران 20 كجم", "برايمر داخلي", "دهان إيبوكسي"] },
  { category: "أسقف وقواطع", items: ["لوح جبس بورد 12.5 مم", "قناة / هيكل مجلفن", "عازل حراري أو صوتي"] },
  { category: "كهرباء وإنارة", items: ["سلك نحاس 2.5 مم²", "سلك نحاس 4 مم²", "ماسورة كهرباء PVC", "مقبس 13 أمبير", "وحدة إنارة LED"] },
  { category: "سباكة وصرف", items: ["ماسورة PPR", "ماسورة صرف PVC", "محبس مياه", "خلاط / حنفية", "كرسي دورة مياه"] },
  { category: "تكييف وتهوية", items: ["أنابيب نحاس للمكيف", "ماسورة تصريف تكاثف"] },
  { category: "عزل", items: ["لفائف عزل مائي", "سيلكون / مادة مانعة للتسرب"] },
  { category: "أبواب وزجاج", items: ["باب خشبي / WPC", "قفل باب", "زجاج سيكوريت"] },
  { category: "أعمال خارجية", items: ["بلاط إنترلوك", "بردورة خرسانية"] },
];

// الأجر: ريال لليوم، مصنعية فقط. صفر يعني لا يوجد سعر منشور للصنعة حتى الآن.
const LABOR_DAILY = [
  { trade: "عامل عام", rate: 120 },
  { trade: "بنّاء / مبلّط بلوك", rate: 220 },
  { trade: "ليّاس", rate: 152 },
  { trade: "مبلّط سيراميك وبورسلان", rate: 0, note: "لا توجد بيانات مرجعية منشورة" },
  { trade: "دهّان", rate: 150 },
  { trade: "كهربائي مباني", rate: 160 },
  { trade: "سبّاك مباني", rate: 152 },
  { trade: "نجّار مسلح", rate: 152 },
  { trade: "حدّاد تسليح", rate: 152 },
  { trade: "رئيس عمال", rate: 275 },
  { trade: "فني جبس بورد", rate: 240 },
  { trade: "فني تكييف", rate: 240 },
  { trade: "لحّام حدادة", rate: 250 },
  { trade: "مركّب رخام وجرانيت", rate: 260 },
  { trade: "مشغل معدات (دون المعدة)", rate: 275 },
  { trade: "سائق نقل ثقيل (دون المركبة)", rate: 190 },
  { trade: "فني عزل مائي", rate: 200 },
  { trade: "فني سقالات", rate: 190 },
  { trade: "فني ألمنيوم", rate: 240 },
].map(x => ({ ...x, unit: "يومية", currency: "ر.س", checked_at: "2026-11-19", source: "https://prices.qsmind.app/ar/saudi/labour" }));

// الكتالوج المحلي للمواد يبدأ بلا أسعار؛ يملؤها المالك من عروض الموردين.
const PRICE_CATALOG = [];

if (typeof window !== "undefined") {
  window.PRICE_CATALOG = PRICE_CATALOG;
  window.PRICING = PRICE_CATALOG;
  window.MAIN_CATEGORIES = MAIN_CATEGORIES;
  window.MATERIAL_ITEMS = MATERIAL_ITEMS;
  window.LABOR_DAILY = LABOR_DAILY;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = PRICE_CATALOG;
  module.exports.MAIN_CATEGORIES = MAIN_CATEGORIES;
  module.exports.MATERIAL_ITEMS = MATERIAL_ITEMS;
  module.exports.LABOR_DAILY = LABOR_DAILY;
}

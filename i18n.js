/* زر تبديل اللغة: عربي / English — يترجم واجهة الموقع فقط (التقارير تبقى بالعربية) */
(function(){
var D={
"إدارة المشاريع":"Project Management","تفعيل الإشعارات":"Enable notifications","تم تفعيل الإشعارات على هذا الجهاز":"Notifications enabled on this device","مفتاح الإشعارات غير مضبوط بعد":"Notification key is not configured yet","هذا المتصفح لا يدعم الإشعارات":"This browser does not support notifications","المشاريع":"Projects","جاري التحميل":"Loading","الإعدادات":"Settings",
"مدير المشروع":"Project Director","مدير مشروع":"Project Manager","الإدارة":"Management","المقاول":"Contractor","مدير الموقع":"Site Manager","مدير موقع":"Site manager",
"التصميم":"Design","قيد التنفيذ":"In progress","تم التسليم":"Delivered",
"متابعة الأعمال":"Work Tracking","ملاحظات الإدارة":"Management Notes","المناقشات":"Discussions","المعوقات والملاحظات":"Issues & Notes","التقارير":"Reports","الصور والفيديوهات":"Photos & Videos",
"اكتب ملاحظة":"Write a note","اكتب رسالة":"Write a message","اكتب المعوق أو الملاحظة":"Describe the issue or note","عنوان التقرير وملخصه":"Report title and summary","وصف (اختياري)":"Description (optional)",
"متأخر":"Late","على الموعد":"On time","إنشاء":"Construction","ترميم":"Refurbishment","مشروع ترميم":"Refurbishment project","تقرير ترميم شامل":"Comprehensive refurbishment report","الدخول":"Login","قبول الدعوة":"Accept invitation","تسجيل الدخول":"Sign in",
"اسم المستخدم أو البريد الإلكتروني":"Username or email","كلمة المرور":"Password","دخول":"Sign in","إنشاء حساب جديد":"Create new account",
"البريد أو كلمة المرور غير صحيحة":"Incorrect email or password","تم إنشاء الحساب":"Account created","تعذر تحميل المشاريع":"Could not load projects","فشل الرفع":"Upload failed",
"التسلّم والتجهيز":"Handover & Preparation","استلام الموقع ورفع المقاسات":"Site handover and measurements","تجهيز الموقع":"Site preparation",
"الجدران والفواصل":"Walls & Partitions","بناء الجدران والفواصل":"Build walls and partitions","فتحات الأبواب والنوافذ":"Door and window openings",
"السباكة والصرف":"Plumbing & Drainage","تأسيس السباكة والصرف":"Plumbing and drainage rough-in",
"الكهرباء والتكييف والتيار الخفيف":"Electrical, HVAC & Low Current","تأسيس الكهرباء":"Electrical rough-in","تأسيس التكييف والتهوية":"HVAC and ventilation rough-in","تأسيس البيانات والتيار الخفيف":"Data and low-current rough-in",
"الأسقف":"Ceilings","الأسقف المستعارة":"False ceilings","تشطيب الأسقف وتجهيز الإنارة":"Ceiling finishing and lighting prep",
"الأرضيات":"Flooring","تركيب الأرضيات":"Install flooring","الدهانات والتشطيبات":"Paint & Finishes","تجهيز الأسطح والدهان":"Surface prep and painting","تكسيات الجدران":"Wall cladding",
"دورات المياه":"Restrooms","تشطيب الدورات":"Restroom finishing","تركيب القطع الصحية والإكسسوارات":"Install fixtures and accessories",
"الواجهات والزجاج":"Facade & Glazing","تشطيب الواجهة":"Facade finishing","تركيب الزجاج والألمنيوم":"Install glass and aluminum",
"الأبواب":"Doors","تركيب الأبواب":"Install doors","النجارة والأثاث الثابت":"Joinery & Fixed Furniture","أعمال النجارة":"Joinery works","الأثاث الثابت":"Fixed furniture",
"الإنارة":"Lighting","تركيب وحدات الإنارة":"Install lighting units","المعدات والتجهيزات":"Equipment & Fit-out","توريد وتركيب المعدات":"Supply and install equipment",
"اللوحات والشعارات":"Signage & Logos","تركيب اللوحات والشعارات":"Install signage and logos","الأعمال الخارجية":"External Works","أعمال الموقع الخارجية":"External site works","التشجير والتجهيزات الخارجية":"Landscaping and external fixtures",
"التسليم":"Handover","التنظيف واختبار الأنظمة":"Final cleaning and systems testing","قائمة الملاحظات والتسليم":"Punch list and handover",
"تحميل قالب مراحل مشروع التشطيب؟":"Load the finishing-project phases template?","اكتب المرحلة واسم البند":"Enter the phase and item name","حذف البند؟":"Delete this item?",
"لم تُحدد مراحل الأعمال لهذا المشروع بعد":"No work phases defined for this project yet","تحميل مراحل المشروع الجاهزة":"Load ready-made project phases",
"مكتملة":"Completed","جارية":"In progress","لم تبدأ":"Not started","أعلى":"Up","أسفل":"Down","وزن المرحلة":"Phase weight","من المشروع":"of the project","الوزن":"Weight","آخر تحديث":"Last update","حذف":"Delete",
"إنجاز المشروع (محسوب تلقائيا)":"Project progress (auto-calculated)","بنود مكتملة":"Items completed","المراحل":"Phases","إضافة بند":"Add item","المرحلة":"Phase","اسم البند":"Item name","إضافة":"Add",
"العرض":"View","الحسابات":"Accounts","التنبيهات":"Alerts","خروج":"Log out","حسابك بدون صلاحيات":"Your account has no permissions","استخدم رابط الدعوة اللي وصلك":"Use the invitation link you received",
"الإنجاز":"Progress","إجمالي المشاريع":"Total projects","قيد العمل":"Active","متأخرة":"Late","تم تسليمها":"Delivered","لا توجد نتائج مطابقة":"No matching results","لا توجد مشاريع":"No projects",
"ابحث بالاسم أو الموقع":"Search by name or location","ابحث عن مشروع بالاسم أو الموقع":"Search for a project by name or location","مشروع جديد":"New project","فتح الملف":"Open file",
"الحالة":"Status","نوع المشروع":"Project type","مدير المنطقة":"Area manager","جوال المقاول":"Contractor mobile","جوال مدير المنطقة":"Area manager mobile","تاريخ البداية":"Start date","تاريخ التسليم":"Delivery date","السعر":"Price",
"تواصل مع مدير المشروع":"Contact the project manager","تواصل مع المقاول":"Contact the contractor","تواصل مع مدير المنطقة":"Contact the area manager",
"تعديل المشروع":"Edit project","إنشاء حساب مقاول":"Create contractor account","كل المشاريع":"All projects","إصدار تقرير":"Generate report","لا يوجد شيء بعد":"Nothing here yet",
"تم الحل":"Resolved","مفتوح":"Open","مسجّل":"Logged","قيد الحل":"Being resolved","إعادة فتح":"Reopen","مرحباً بك":"Welcome","المعوقات المفتوحة":"Open issues","لا توجد معوقات":"No issues",
"نظام التقارير الاحترافي":"Professional reporting","إنشاء التقرير":"Generate report","إلغاء":"Cancel","إغلاق":"Close","تحميل":"Download","مشاركة":"Share","معاينة":"Preview","تقرير آخر":"Another report",
"جاري إنشاء التقرير":"Generating report","لا تغلق الصفحة حتى يكتمل التقرير":"Do not close the page until the report is complete","التقرير جاهز":"Report ready",
"إنشاء تقرير إنجاز احترافي":"Create a professional progress report","عنوان التقرير":"Report title","محتوى التقرير":"Report content","الجودة":"Quality","التقرير المكتوب":"Written report","كامل المشروع":"Entire project","هذا الشهر":"This month","الشهر الماضي":"Last month",
"اسم المشروع":"Project name","الموقع / المدينة":"Location / City","اسم المقاول":"Contractor name","اسم مدير المشروع":"Project manager name","اسم مدير المنطقة":"Area manager name","مدة المشروع (بالأيام)":"Project duration (days)",
"تغيير صورة الغلاف":"Change cover photo","صورة الغلاف":"Cover photo","حفظ":"Save","حذف المشروع":"Delete project","نسخ البيانات":"Copy details","تم النسخ":"Copied","جاري الحفظ":"Saving","جاري الإنشاء":"Creating","جاري رفع":"Uploading",
"إنشاء حساب الإدارة":"Create management account","إنشاء حساب مدير موقع":"Create site manager account","إنشاء حساب مدير مشروع":"Create project manager account","إنشاء حساب مقاول للمشروع":"Create contractor account for this project",
"الاسم الظاهر":"Display name","اسم المستخدم":"Username","إنشاء الحساب":"Create account","الموقع":"Location","عرض الصورة كاملة":"View full image",
"مدراء الموقع في هذا المشروع":"Site managers on this project","إزالة":"Remove","لم يُسند مدير موقع":"No site manager assigned","اختر مدير موقع":"Choose a site manager","إسناد للمشروع":"Assign to project","بدون دور":"No role","حذف الحساب":"Delete account",
"تثبيت التطبيق على الجوال":"Install the app on your phone","ثبّت التطبيق على جوالك":"Install the app on your phone","تثبيت":"Install","حذف المشروع وكل ما فيه؟":"Delete the project and everything in it?","حذف؟":"Delete?","اكتب اسم المشروع":"Enter the project name",
"المقاول يرى هذا المشروع فقط: يرفع التقارير والمعوقات والصور ويناقشك، ولا يرى ملاحظات الإدارة":"The contractor sees this project only: uploads reports, issues and photos and discusses with you; cannot see management notes",
"الإدارة تشاهد كل المشاريع والتقارير والمعوقات والملاحظات، ولا ترى مناقشاتك مع المقاول، ولا تعدّل شيئاً":"Management can view all projects, reports, issues and notes; cannot see your discussions with the contractor and cannot edit anything",
"مدير الموقع يدخل المشاريع التي تسنده إليها فقط: يرفع التقارير والمعوقات والصور ويناقش، ولا يرى ملاحظات الإدارة ولا السعر":"The site manager only enters projects assigned to them: uploads reports, issues and photos and joins discussions; cannot see management notes or price",
"مدير مشروع (بدون «ال») ينشئ مشاريعه ويديرها بصلاحياتك ويدعو مقاوليه، ولا يرى مشاريع غيره، ولا يحذف الملاحظات أو المناقشات أو التقارير":"A project manager creates and runs their own projects with your permissions and invites their contractors; cannot see others' projects and cannot delete notes, discussions or reports",
/* الصفحة الرئيسية */
"إدارة المشاريع | متابعة أوضح، وتسليم أفضل":"Project Management | Clearer tracking, better delivery","المزايا":"Features","طريقة العمل":"How it works","دخول النظام":"Sign in","منصة متابعة المشاريع":"Project tracking platform",
"كل مشروع أوضح،":"Every project clearer,","وكل خطوة في مكانها.":"every step in its place.",
"تابع حالة المشاريع ونسب الإنجاز والمواعيد، واجمع تحديثات الفريق وتقاريره ومعوقاته في مساحة واحدة.":"Track project status, progress and deadlines, and keep team updates, reports and issues in one place.",
"افتح لوحة المشاريع":"Open the projects dashboard","استكشف المزايا":"Explore features","واجهة عربية · صلاحيات حسب الدور · مصممة للعمل على الجوال":"Arabic interface · Role-based access · Built for mobile",
"متابعة عملية":"Practical tracking","صورة واضحة للمشروع والفريق":"A clear picture of the project and the team","المعلومات الأساسية والتواصل الميداني والتحديثات اليومية تتجمع في واجهة واحدة سهلة الرجوع إليها.":"Key information, field communication and daily updates gathered in one easy-to-reference interface.",
"لوحة حالة مباشرة":"Live status board","رتّب المشاريع حسب مرحلة العمل، وتابع الإنجاز ومواعيد التسليم والتنبيهات على التأخير.":"Sort projects by work stage and follow progress, delivery dates and delay alerts.",
"تحديثات وتقارير":"Updates & reports","أضف الملاحظات والتقارير والصور والفيديوهات إلى سجل المشروع، لتبقى مستجداته في سياقها.":"Add notes, reports, photos and videos to the project log so updates stay in context.",
"فريق بصلاحيات واضحة":"A team with clear permissions","خصص الوصول للمالك ومدير المشروع والإدارة والمقاول ومدير الموقع، بحسب مسؤولية كل شخص.":"Assign access to the director, project manager, management, contractor and site manager according to each person's responsibility.",
"من البداية إلى التسليم":"From start to handover","خطوات العمل تبقى مترابطة":"Work steps stay connected","مسار بسيط يساعد الفريق على فهم ما يجري وما يحتاج إلى متابعة.":"A simple path that helps the team understand what is happening and what needs follow-up.",
"خطّط":"Plan","سجّل بيانات المشروع ونطاقه ومواعيده ومسؤوليه.":"Record the project details, scope, dates and owners.","تابع":"Track","حدّث نسبة الإنجاز وسجّل النقاشات والمعوقات والمرفقات.":"Update progress and log discussions, issues and attachments.",
"سلّم":"Deliver","راقب موعد التسليم وأبقِ حالة المشروع وتوثيقه محدثين.":"Watch the delivery date and keep project status and documentation up to date.",
"ابدأ من لوحة المشاريع":"Start from the projects dashboard","سجّل الدخول لمتابعة المشاريع المسندة إلى حسابك.":"Sign in to follow the projects assigned to your account.",
"واجهة عربية لمتابعة التخطيط والتنفيذ والتسليم":"Arabic interface for tracking planning, execution and delivery","التنقل الرئيسي":"Main navigation"
};
var RX=[[/متأخر (\d+) يوم/g,"Late by $1 days"],[/على الموعد · التسليم اليوم/g,"On time · Due today"],[/على الموعد · باقي (\d+) يوم/g,"On time · $1 days left"]];
var keys=Object.keys(D).filter(function(k){return k.length>=8}).sort(function(a,b){return b.length-a.length});
var AR=/[\u0600-\u06FF]/,lang="ar";
try{lang=localStorage.getItem("lang")||"ar"}catch(e){}
function tr(s){
  if(!AR.test(s))return s;
  RX.forEach(function(r){s=s.replace(r[0],r[1])});
  if(!AR.test(s))return s;
  var m=s.match(/^(\s*)([\s\S]*?)([\s:،.؟?!…*]*)$/);
  if(D[m[2]]!==undefined)return m[1]+D[m[2]]+m[3].replace(/،/g,",").replace(/؟/g,"?");
  for(var i=0;i<keys.length;i++)if(s.indexOf(keys[i])>-1)s=s.split(keys[i]).join(D[keys[i]]);
  return s;
}
function setLang(l){try{localStorage.setItem("lang",l)}catch(e){}location.reload()}
window.setLang=setLang;
function btn(){
  if(document.getElementById("lgb"))return;
  var b=document.createElement("button");b.id="lgb";b.type="button";
  b.textContent=lang==="en"?"عربي":"EN";b.setAttribute("aria-label",lang==="en"?"التبديل إلى العربية":"Switch to English");
  b.style.cssText="position:fixed;bottom:14px;inset-inline-start:14px;z-index:60;min-width:46px;height:38px;padding:0 12px;border-radius:99px;border:1px solid #dbe3ec;background:#fff;color:#102944;font:700 14px Tajawal,Tahoma,sans-serif;box-shadow:0 6px 18px #10294426;cursor:pointer";
  b.onclick=function(){setLang(lang==="en"?"ar":"en")};document.body.appendChild(b);
}
function node(n){
  if(n.nodeType===3){var p=n.parentNode;if(p&&/^(SCRIPT|STYLE|TEXTAREA)$/.test(p.nodeName))return;if(p&&p.closest&&p.closest(".rpg"))return;var o=n.data,t=tr(o);if(t!==o)n.data=t;return}
  if(n.nodeType!==1||/^(SCRIPT|STYLE|TEXTAREA)$/.test(n.nodeName)||(n.closest&&n.closest(".rpg")))return;
  ["placeholder","title","aria-label"].forEach(function(a){var v=n.getAttribute(a);if(v&&AR.test(v)){var t=tr(v);if(t!==v)n.setAttribute(a,t)}});
  for(var c=n.firstChild;c;c=c.nextSibling)node(c);
}
var _a=window.alert,_c=window.confirm;
function start(){
  btn();
  if(lang!=="en")return;
  document.documentElement.lang="en";document.documentElement.dir="ltr";
  window.alert=function(m){return _a.call(window,tr(String(m)))};window.confirm=function(m){return _c.call(window,tr(String(m)))};
  document.title=tr(document.title);
  node(document.body);
  new MutationObserver(function(rs){rs.forEach(function(r){
    if(r.type==="characterData")node(r.target);else r.addedNodes.forEach(node)})}).observe(document.body,{childList:true,subtree:true,characterData:true});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();
})();

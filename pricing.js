/* وحدة التسعير – تظهر للمالك فقط. الحماية الفعلية عبر RLS في Supabase (انظر pricing.sql) */
const PR={items:[],sec:"",q:"",tab:"wait",basis:"t",lines:[],vat:true};
const prN=v=>Number(v||0).toLocaleString("en-US",{maximumFractionDigits:2});
const prMid=(a,b)=>(+a+ +b)/2;
/* سعر الوحدة [عمالة، مواد] حسب الأساس: أدنى / مستهدف / أعلى. المستهدف يتبع قيمة السعر المستهدف المعدّلة */
function prU(it,b){
  if(b==="min")return[+it.labor_min,+it.mat_min];
  if(b==="max")return[+it.labor_max,+it.mat_max];
  const l=prMid(it.labor_min,it.labor_max),m=prMid(it.mat_min,it.mat_max),mid=l+m,k=mid>0?(+it.target||mid)/mid:1;
  return[l*k,m*k];
}
/* حالة عرض المقاول مقابل المستهدف (±10% كما في الإكسل) */
function prSt(q,t){
  if(!(q>0))return"";
  return q<t*.9?"⚠️ أقل من المستهدف >10% (تحقق من النطاق)":q<=t*1.1?"✅ ضمن ±10%":"🔺 أعلى من المستهدف >10%";
}
async function openPricing(){
  if(S.role!=="owner")return;
  if(!$("prst")){const s=document.createElement("style");s.id="prst";s.textContent="#prov .mtb td:first-child{width:auto;color:inherit}#prov .mtb th{text-align:right;font-size:13px;color:var(--muted)}#prov input,#prov select{padding:8px;border:1px solid var(--line);border-radius:8px;font:inherit}";document.head.appendChild(s)}
  let ov=$("prov");
  if(!ov){ov=document.createElement("div");ov.id="prov";ov.className="modal";document.body.appendChild(ov)}
  ov.innerHTML='<div class="box"><div class="note">جاري التحميل...</div></div>';
  const{data,error}=await sb.from("price_items").select("*").order("item_no");
  if(error){ov.innerHTML=`<div class="box"><div class="note">تعذر تحميل الأسعار: ${esc(error.message)}<br>تأكد من تنفيذ pricing.sql في Supabase.</div><button class="btn alt" onclick="prClose()">إغلاق</button></div>`;return}
  PR.items=data||[];await prLoadEst();prRender();
}
function prClose(){const o=$("prov");if(o)o.remove();PR.items=[];PR.lines=[]}
function prRender(){
  const secs=[...new Set(PR.items.map(i=>i.section))],tb=(k,t)=>`<button class="${PR.tab===k?"on":""}" onclick="PR.tab='${k}';prRender()">${t}</button>`;
  $("prov").innerHTML=`<div class="box" style="max-width:940px">
  <div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><h3 style="margin:0">💰 التسعير <small style="color:var(--muted)">· للمالك فقط · ر.س قبل الضريبة</small></h3><button class="btn alt" onclick="prClose()">إغلاق</button></div>
  <div class="tfs" style="margin-top:12px">${tb("wait","بانتظار قرارك")}${tb("learn","💡 اقتراحات")}${tb("base","قاعدة الأسعار")}${tb("calc","حاسبة سريعة")}</div>
  ${PR.tab==="wait"?prWait():PR.tab==="learn"?prLearnTab():PR.tab==="base"?prBase(secs):prCalc(secs)}</div>`;
  if(PR.tab==="base")prRows();
}
function prBase(secs){
  return`<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px"><input placeholder="بحث بالوصف أو الرقم" value="${esc(PR.q)}" oninput="PR.q=this.value;prRows()" style="flex:1;min-width:160px"><select onchange="PR.sec=this.value;prRows()"><option value="">كل الأقسام</option>${secs.map(s=>`<option ${s===PR.sec?"selected":""}>${esc(s)}</option>`).join("")}</select></div>
  <div style="overflow-x:auto"><table class="mtb"><thead><tr><th>الرقم</th><th>البند</th><th>الوحدة</th><th>الأدنى</th><th>الأعلى</th><th>المستهدف</th></tr></thead><tbody id="prb"></tbody></table></div>`;
}
function prRows(){
  const q=PR.q.trim().toLowerCase(),r=PR.items.filter(i=>(!PR.sec||i.section===PR.sec)&&(!q||(i.item_no+" "+i.descr).toLowerCase().includes(q)));
  $("prb").innerHTML=r.map(i=>`<tr><td>${esc(i.item_no)}</td><td>${esc(i.descr)}<br><small style="color:var(--muted)">${esc(i.notes)}</small></td><td>${esc(i.unit)}</td><td>${prN(+i.labor_min+ +i.mat_min)}</td><td>${prN(+i.labor_max+ +i.mat_max)}</td><td><input type="number" step="0.5" min="0" value="${i.target}" style="width:84px" onchange="prSet('${esc(i.item_no)}',this)"></td></tr>`).join("")||'<tr><td colspan="6">لا نتائج</td></tr>';
}
async function prSet(no,el){
  const v=+el.value,it=PR.items.find(i=>i.item_no===no);
  if(!(v>=0)||el.value==="")return el.value=it.target;
  const{error}=await sb.from("price_items").update({target:v,updated_at:new Date().toISOString()}).eq("item_no",no);
  if(error){alert(error.message);el.value=it.target}else it.target=v;
}
function prAdd(){
  const no=$("pradd").value;if(no&&!PR.lines.some(l=>l.no===no))PR.lines.push({no,q:1,quote:""});prRender();
}
function prLine(k,f,v){PR.lines[k][f]=v;prRender()}
function prDel(k){PR.lines.splice(k,1);prRender()}
function prTotals(){
  let lab=0,mat=0;
  PR.lines.forEach(l=>{const it=PR.items.find(i=>i.item_no===l.no),[a,b]=prU(it,PR.basis);lab+=a*(+l.q||0);mat+=b*(+l.q||0)});
  const sub=lab+mat,vat=PR.vat?sub*.15:0;return{lab,mat,sub,vat,tot:sub+vat};
}
function prCalc(secs){
  const T=prTotals(),opt=secs.map(s=>`<optgroup label="${esc(s)}">${PR.items.filter(i=>i.section===s).map(i=>`<option value="${esc(i.item_no)}">${esc(i.item_no)} · ${esc(i.descr)} (${esc(i.unit)})</option>`).join("")}</optgroup>`).join("");
  const rows=PR.lines.map((l,k)=>{
    const it=PR.items.find(i=>i.item_no===l.no),[a,b]=prU(it,PR.basis),u=a+b;
    return`<tr><td>${esc(it.descr)}<br><small style="color:var(--muted)">${esc(it.unit)} · ${prN(u)} ر.س</small></td><td><input type="number" min="0" step="any" value="${l.q}" style="width:72px" onchange="prLine(${k},'q',this.value)"></td><td>${prN(u*(+l.q||0))}</td><td><input type="number" min="0" step="any" placeholder="سعر الوحدة" value="${l.quote}" style="width:90px" onchange="prLine(${k},'quote',this.value)"></td><td><small>${prSt(+l.quote,+it.target)}</small></td><td><button class="sm" style="background:#dc2626" onclick="prDel(${k})">✕</button></td></tr>`}).join("");
  return`<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px"><select id="pradd" style="flex:1;min-width:200px">${opt}</select><button class="btn" onclick="prAdd()">＋ إضافة بند</button>
  <select onchange="PR.basis=this.value;prRender()"><option value="min" ${PR.basis==="min"?"selected":""}>أساس: الأدنى</option><option value="t" ${PR.basis==="t"?"selected":""}>أساس: المستهدف</option><option value="max" ${PR.basis==="max"?"selected":""}>أساس: الأعلى</option></select></div>
  ${PR.lines.length?`<div style="overflow-x:auto"><table class="mtb"><thead><tr><th>البند</th><th>الكمية</th><th>الإجمالي</th><th>عرض المقاول (للوحدة)</th><th>الحالة</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>
  <div class="mcostbox"><span>عمالة ${prN(T.lab)} · مواد ${prN(T.mat)}</span><span>قبل الضريبة <b style="font-size:18px">${prN(T.sub)}</b></span></div>
  <label style="display:flex;gap:8px;align-items:center;margin:6px 0"><input type="checkbox" ${PR.vat?"checked":""} onchange="PR.vat=this.checked;prRender()"> ضريبة القيمة المضافة 15%</label>
  <div class="mcostbox"><span>الإجمالي ${PR.vat?"شامل الضريبة":""}</span><b>${prN(T.tot)} ر.س</b></div>
  <button class="btn alt" onclick="prCopy()">نسخ الملخص</button> <button class="btn danger" onclick="PR.lines=[];prRender()">تفريغ</button>`:'<div class="note">اختر بنداً وأضفه لبدء أمر العمل.</div>'}`;
}
function prCopy(){
  const T=prTotals(),tx=PR.lines.map(l=>{const it=PR.items.find(i=>i.item_no===l.no),[a,b]=prU(it,PR.basis);return`${it.item_no} ${it.descr}: ${l.q} ${it.unit} × ${prN(a+b)} = ${prN((a+b)*l.q)}`}).join("\n")+`\nقبل الضريبة: ${prN(T.sub)}${PR.vat?`\nالضريبة 15%: ${prN(T.vat)}`:""}\nالإجمالي: ${prN(T.tot)} ر.س`;
  navigator.clipboard.writeText(tx).then(()=>alert("تم النسخ"),()=>prompt("انسخ الملخص:",tx));
}

/* ===== تقييم عروض المقاولين (مرتبط بمرحلة اعتماد التكلفة في طلب الصيانة) ===== */
PR.est={};PR.estLoaded=false;PR.tk=null;
async function prLoadEst(){const{data}=await sb.from("price_estimates").select("*");PR.est={};(data||[]).forEach(e=>PR.est[e.ticket_id]=e);PR.estLoaded=true}
/* الحكم على سعر المقاول مقابل تقديرك (قبل الضريبة) */
function prVerdict(cost,e){
  if(!e)return{k:"none",t:"بدون تقدير بعد",c:"#64748b"};
  const c=e.vat_incl?cost/1.15:cost,p=e.est_target?Math.round((c-e.est_target)/e.est_target*100):0,s=(p>0?"+":"")+p+"% عن المستهدف";
  if(c<e.est_min)return{k:"low",t:"⚠️ أقل من الأدنى · "+s,c:"#d97706"};
  if(c>e.est_max)return{k:"high",t:"🔺 أعلى من الأعلى · "+s,c:"#dc2626"};
  return{k:"ok",t:"✅ ضمن النطاق · "+s,c:"#16a34a"};
}
/* لوحة تظهر داخل مرحلة اعتماد التكلفة للمالك فقط */
function prPanel(t){
  try{
    if(S.role!=="owner")return"";
    if(!PR.estLoaded){PR.estLoaded=1;prLoadEst().then(()=>render());return""}
    const e=PR.est[String(t.id)],v=prVerdict(+mCost(t),e);
    return`<div class="mrep" style="border-color:${v.c}"><b>🔒 تقييم التسعير (لك فقط)</b><div style="color:${v.c};font-weight:700">${v.t}</div>${e?`<div class="lbl">النطاق ${prN(e.est_min)} – ${prN(e.est_max)} · المستهدف ${prN(e.est_target)} ر.س قبل الضريبة</div>`:""}<div class="acts"><button class="btn alt" onclick="prEstOpen('${t.id}')">${e?"تعديل التقدير":"🧮 قيّم الأعمال"}</button>${e&&v.k==="high"?`<button class="btn" onclick="prCounter('${t.id}')">↩ تفاوض وإعادة تسعير</button>`:""}</div></div>`;
  }catch(x){return""}
}
/* ملاحظة محايدة عمداً: لا تكشف نطاقك للمقاول ومدير الموقع. عدّلها كما تشاء */
async function prCounter(id){await mOnce(async()=>{
  const t=mT(id),n=prompt("ملاحظتك لمدير الموقع (لإعادة التسعير):","نرجو مراجعة التكلفة وإعادة التسعير بسعر أنسب.");
  if(n===null||!n.trim())return;
  await mUpd(id,{stage:"price",back_note:n.trim(),mgmt_status:null,mgmt_token:null},"أُعيدت للتسعير: "+n.trim(),["site"],"أُعيد الطلب للتسعير "+mNo(t),{body:n.trim(),toast:"أُعيدت للتسعير"});
})}
/* تبويب: عروض بانتظار قرارك */
function prWait(){
  const r=MT.t.filter(t=>!t.closed_at&&mStg(t)==="cost");
  if(!r.length)return'<div class="note">لا توجد عروض بانتظار قرارك 👌</div>';
  return r.map(t=>{const v=prVerdict(+mCost(t),PR.est[String(t.id)]);
    return`<div class="mrep" style="border-right:4px solid ${v.c};cursor:pointer" onclick="prClose();mOpen('${t.id}')"><b>${esc(mNo(t))} · ${esc(t.branch||"")}</b>${esc(t.title)}<div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-top:4px"><span>${money(mCost(t))} ر.س</span><span style="color:${v.c};font-weight:700">${v.t}</span></div></div>`}).join("");
}
/* شاشة التقدير لطلب معيّن */
function prTot(lines){
  const z={min:0,t:0,max:0};
  lines.forEach(l=>{if(l.no){const i=PR.items.find(x=>x.item_no===l.no);if(!i)return;const q=+l.q||0;z.min+=(+i.labor_min+ +i.mat_min)*q;z.max+=(+i.labor_max+ +i.mat_max)*q;z.t+=(+i.target)*q}else{const a=+l.amt||0;z.min+=a;z.t+=a;z.max+=a}});
  return z;
}
async function prEstOpen(id){
  if(!PR.items.length){const{data}=await sb.from("price_items").select("*").order("item_no");PR.items=data||[]}
  const e=PR.est[String(id)];PR.tk={id:String(id),lines:e?JSON.parse(JSON.stringify(e.lines)):[],vat:e?!!e.vat_incl:false};
  let o=$("prev");if(!o){o=document.createElement("div");o.id="prev";o.className="modal";o.style.zIndex=10;document.body.appendChild(o)}
  prEstDraw();
}
function prEstDraw(){
  const k=PR.tk,t=mT(k.id),T=prTot(k.lines),c=+mCost(t),v=prVerdict(c,{est_min:T.min,est_target:T.t,est_max:T.max,vat_incl:k.vat});
  const secs=[...new Set(PR.items.map(i=>i.section))],opt=secs.map(s=>`<optgroup label="${esc(s)}">${PR.items.filter(i=>i.section===s).map(i=>`<option value="${esc(i.item_no)}">${esc(i.descr)} (${esc(i.unit)})</option>`).join("")}</optgroup>`).join("");
  const rows=k.lines.map((l,n)=>{const i=l.no&&PR.items.find(x=>x.item_no===l.no);
    return`<tr><td>${i?esc(i.descr)+`<br><small style="color:var(--muted)">${esc(i.unit)} · ${prN(i.target)}</small>`:esc(l.c)}</td><td>${i?`<input type="number" min="0" step="any" value="${l.q}" style="width:70px" onchange="PR.tk.lines[${n}].q=this.value;prEstDraw()">`:`<input type="number" min="0" step="any" value="${l.amt}" style="width:90px" onchange="PR.tk.lines[${n}].amt=this.value;prEstDraw()">`}</td><td><button class="sm" style="background:#dc2626" onclick="PR.tk.lines.splice(${n},1);prEstDraw()">✕</button></td></tr>`}).join("");
  $("prev").innerHTML=`<div class="box" style="max-width:640px"><h3 style="margin:0">🧮 تقدير: ${esc(t.title)}</h3><div class="lbl">${esc(t.branch||"")} · سعر المقاول ${prN(c)} ر.س</div>
  <div style="display:flex;gap:8px;margin:10px 0"><select id="prea" style="flex:1">${opt}</select><button class="btn" onclick="PR.tk.lines.push({no:$('prea').value,q:1});prEstDraw()">＋</button><button class="btn alt" onclick="prEstCustom()">بند حر</button></div>
  ${rows?`<table class="mtb"><thead><tr><th>البند</th><th>الكمية / المبلغ</th><th></th></tr></thead><tbody>${rows}</tbody></table>`:'<div class="note">أضف بنود الأعمال المطلوبة بالكميات.</div>'}
  <div class="mcostbox"><span>الأدنى ${prN(T.min)} · الأعلى ${prN(T.max)}</span><span>المستهدف <b style="font-size:18px">${prN(T.t)}</b></span></div>
  <label style="display:flex;gap:8px;align-items:center;margin:6px 0"><input type="checkbox" ${k.vat?"checked":""} onchange="PR.tk.vat=this.checked;prEstDraw()"> سعر المقاول شامل الضريبة 15%</label>
  ${k.lines.length?`<div class="mrep" style="border-color:${v.c};color:${v.c};font-weight:700">${v.t}</div>`:""}
  <div class="mbtns"><button class="btn" ${k.lines.length?"":"disabled"} onclick="prEstSave()">💾 حفظ التقدير</button><button class="btn alt" onclick="$('prev').remove()">إغلاق</button></div></div>`;
}
function prEstCustom(){const c=prompt("وصف البند الحر (خارج قاعدة الأسعار):");if(!c)return;const a=+prompt("المبلغ التقديري (ر.س):");if(!(a>0))return;PR.tk.lines.push({c:c.trim(),amt:a});prEstDraw()}
async function prEstSave(){
  const k=PR.tk,T=prTot(k.lines),row={ticket_id:k.id,lines:k.lines,est_min:T.min,est_target:T.t,est_max:T.max,vat_incl:k.vat,updated_at:new Date().toISOString()};
  const{error}=await sb.from("price_estimates").upsert(row,{onConflict:"ticket_id"});
  if(error)return alert("تعذر الحفظ: "+error.message+"\nنفّذ pricing.sql المحدّث في Supabase.");
  PR.est[k.id]=row;$("prev").remove();render();
}

/* ===== التعلّم من اعتماداتك: يقارن التكلفة المعتمدة بتقديرك (بأسعار القاعدة الحالية) ===== */
function prLearn(){
  const rows=[];
  MT.t.forEach(t=>{
    const e=PR.est[String(t.id)];if(!e||!(t.cost_ok_at||t.mgmt_status==="approved"))return;
    const L=e.lines||[];if(!L.length||L.some(l=>!l.no||!PR.items.find(i=>i.item_no===l.no)))return;   /* بنود القاعدة فقط */
    const c=+mCost(t),x=e.vat_incl?c/1.15:c,est=prTot(L).t;if(!(x>0&&est>0))return;
    const items=[...new Set(L.map(l=>l.no))],secs=[...new Set(items.map(n=>PR.items.find(i=>i.item_no===n).section))];
    rows.push({r:x/est,items,sec:secs.length===1?secs[0]:null});
  });
  const med=a=>{a=[...a].sort((p,q)=>p-q);const m=a.length>>1;return a.length%2?a[m]:(a[m-1]+a[m])/2},gi={},gs={};
  rows.forEach(w=>{if(w.items.length===1)(gi[w.items[0]]=gi[w.items[0]]||[]).push(w.r);if(w.sec)(gs[w.sec]=gs[w.sec]||[]).push(w.r)});
  const out=[];
  Object.entries(gi).forEach(([k,a])=>{const m=med(a);if(a.length>=3&&Math.abs(m-1)>=.08)out.push({t:"item",k,n:a.length,m})});
  Object.entries(gs).forEach(([k,a])=>{const m=med(a);if(a.length>=3&&Math.abs(m-1)>=.08)out.push({t:"sec",k,n:a.length,m})});
  PR.sug=out;return{n:rows.length,out};
}
function prLearnTab(){
  const{n,out}=prLearn(),pc=m=>(m>1?"+":"")+Math.round((m-1)*100)+"%";
  const li=out.map((s,i)=>{
    const it=s.t==="item"&&PR.items.find(x=>x.item_no===s.k),cnt=PR.items.filter(x=>x.section===s.k).length;
    const tx=s.t==="item"?`${esc(it.descr)}: اعتمدت ${s.n} طلبات بمتوسط ${pc(s.m)} عن المستهدف. المقترح ${prN(it.target)} ← ${prN(Math.round(it.target*s.m*2)/2)}`:`قسم ${esc(s.k)}: اعتمدت ${s.n} طلبات بمتوسط ${pc(s.m)} عن المستهدف. المقترح تعديل ${cnt} بنداً بنسبة ${pc(s.m)}`;
    return`<div class="mrep" style="border-right:4px solid ${s.m>1?"#dc2626":"#d97706"}"><div>${tx}</div><button class="btn" onclick="prApply(${i})">تطبيق</button></div>`}).join("");
  return`<div class="note" style="margin-bottom:8px">حُلّل ${n} طلب معتمد له تقدير ببنود من القاعدة. لا يظهر اقتراح قبل 3 طلبات متشابهة وفرق 8% فأكثر. الاقتراح الأدق يأتي من الطلبات ذات البند الواحد أو القسم الواحد.</div>${li||'<div class="note">لا توجد اقتراحات الآن. قيّم الطلبات قبل اعتمادها لتتراكم البيانات.</div>'}`;
}
async function prApply(i){
  const s=PR.sug[i];if(!s)return;
  const tg=s.t==="item"?PR.items.filter(x=>x.item_no===s.k):PR.items.filter(x=>x.section===s.k);
  if(s.t==="sec"&&!confirm("تعديل أسعار "+tg.length+" بنداً في قسم "+s.k+"؟"))return;
  const now=new Date().toISOString(),rs=await Promise.all(tg.map(it=>{const v=Math.round(it.target*s.m*2)/2;return sb.from("price_items").update({target:v,updated_at:now}).eq("item_no",it.item_no).then(r=>({it,v,e:r.error}))}));
  const bad=rs.find(r=>r.e);if(bad)alert(bad.e.message);
  rs.forEach(r=>{if(!r.e)r.it.target=r.v});prRender();
}

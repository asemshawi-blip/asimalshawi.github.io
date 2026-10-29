const CACHE="pm-v26",CDN="pm-cdn-v1";
const APP_FILES=["./","./index.html","./pm.html","./manifest.json","./icon-192.png","./icon-512.png","./apple-touch-icon.png","./i18n.js"];
self.addEventListener("install",event=>event.waitUntil((async()=>{
  const cache=await caches.open(CACHE);
  await cache.addAll(APP_FILES);
  await self.skipWaiting();
})()));
self.addEventListener("activate",event=>event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(key=>key!==CACHE&&key!==CDN).map(key=>caches.delete(key)));
  await self.clients.claim();
})()));
const CDN_HOSTS=["cdn.jsdelivr.net","fonts.googleapis.com","fonts.gstatic.com"];
self.addEventListener("fetch",event=>{
  const request=event.request,url=new URL(request.url);
  if(request.method!=="GET")return;
  /* مكتبات وخطوط خارجية: من الكاش فورا وتتحدث في الخلفية */
  if(CDN_HOSTS.includes(url.hostname)){
    event.respondWith((async()=>{
      const cache=await caches.open(CDN),hit=await cache.match(request);
      const net=fetch(request).then(r=>{if(r&&(r.ok||r.type==="opaque"))cache.put(request,r.clone());return r}).catch(()=>null);
      return hit||(await net)||Response.error();
    })());
    return;
  }
  if(url.origin!==self.location.origin)return;
  // Invite links contain a one-time token. Never persist query-string URLs.
  if(url.search)return;
  const path=url.pathname;
  if(!APP_FILES.some(file=>new URL(file,self.location.href).pathname===path))return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    /* شبكة أولا؛ إذا تأخرت أكثر من 3 ثوان نعرض النسخة المخزنة */
    const net=fetch(request).then(r=>{if(r.ok&&r.type==="basic")cache.put(request,r.clone());return r});
    const slow=new Promise(res=>setTimeout(async()=>res(await cache.match(request)),3000));
    try{return (await Promise.race([net,slow]))||await net}
    catch{return (await cache.match(request))||Response.error()}
  })());
});

/* الإشعارات */
self.addEventListener("push",e=>{
  let d={};try{d=e.data.json()}catch(_){d={body:e.data?e.data.text():""}}
  e.waitUntil(self.registration.showNotification(d.title||"إدارة المشاريع",{body:d.body||"",icon:"./icon-192.png",badge:"./icon-192.png",tag:d.tag,renotify:!!d.tag,dir:"rtl",lang:"ar",data:{p:d.p,t:d.t}}));
});
self.addEventListener("notificationclick",e=>{
  e.notification.close();const {p,t}=e.notification.data||{};
  e.waitUntil((async()=>{
    const cs=await self.clients.matchAll({type:"window",includeUncontrolled:true});
    const c=cs.find(x=>new URL(x.url).pathname.endsWith("pm.html"))||cs[0];
    if(c){await c.focus();c.postMessage({open:{p,t}});return}
    await self.clients.openWindow("./pm.html"+(p?"?p="+encodeURIComponent(p)+"&t="+encodeURIComponent(t||""):""));
  })());
});

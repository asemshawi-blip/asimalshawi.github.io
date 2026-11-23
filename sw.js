const CACHE="pm-v78",CDN="pm-cdn-v1";
const APP_FILES=["./","./index.html","./pm.html","./manifest.json","./icon-192.png","./icon-512.png","./apple-touch-icon.png","./i18n.js","./pricing.js"];
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
    const cache=await caches.open(CACHE),hit=await cache.match(request);
    const net=fetch(request).then(r=>{if(r.ok&&r.type==="basic")cache.put(request,r.clone());return r}).catch(()=>null);
    if(hit){const timeout=new Promise(resolve=>setTimeout(()=>resolve(hit),3000));return (await Promise.race([net,timeout]))||hit}
    return (await net)||Response.error();
  })());
});

/* الإشعارات */
self.addEventListener("push",e=>{
  let d={};
  try{ d=e.data?e.data.json():{}; }catch(err){ try{ d={body:e.data?e.data.text():""}; }catch(err2){} }
  const title=d.title||"إدارة المشاريع";
  const options={ body:d.body||"", data:d.data||d, icon:"./icon-192.png", badge:"./icon-192.png" };
  e.waitUntil(self.registration.showNotification(title, options));
});
self.addEventListener("notificationclick",e=>{
  e.notification.close();
  const d=e.notification.data||{};
  const open=d.open||d;
  const url="./pm.html"+(open&&open.p?("?p="+encodeURIComponent(open.p)+(open.t?"&t="+encodeURIComponent(open.t):"")):"");
  e.waitUntil(clients.matchAll({type:"window",includeUncontrolled:true}).then(cs=>{
    for(const c of cs){ if("focus" in c){ c.postMessage({open:open}); return c.focus(); } }
    return clients.openWindow(url);
  }));
});

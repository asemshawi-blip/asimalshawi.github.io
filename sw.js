const CACHE="pm-v20";
const APP_FILES=["./","./index.html","./pm.html","./manifest.json","./icon-192.png","./icon-512.png","./apple-touch-icon.png"];
self.addEventListener("install",event=>event.waitUntil((async()=>{
  const cache=await caches.open(CACHE);
  await cache.addAll(APP_FILES);
  await self.skipWaiting();
})()));
self.addEventListener("activate",event=>event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)));
  await self.clients.claim();
})()));
self.addEventListener("fetch",event=>{
  const request=event.request,url=new URL(request.url);
  if(request.method!=="GET"||url.origin!==self.location.origin)return;
  // Invite links contain a one-time token. Never persist query-string URLs.
  if(url.search)return;
  const path=url.pathname;
  if(!APP_FILES.some(file=>new URL(file,self.location.href).pathname===path))return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    try{
      const response=await fetch(request);
      if(response.ok&&response.type==="basic")await cache.put(request,response.clone());
      return response;
    }catch{
      return (await cache.match(request))||Response.error();
    }
  })());
});

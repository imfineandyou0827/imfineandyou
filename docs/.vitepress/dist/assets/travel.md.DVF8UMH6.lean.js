import{_ as h,v as f,c as u,o as g,ae as m}from"./chunks/framework.sippFj2z.js";const _=JSON.parse('{"title":"旅程","description":"","frontmatter":{},"headers":[],"relativePath":"travel.md","filePath":"travel.md"}'),v={name:"travel.md"},b=Object.assign(v,{setup(x){return f(()=>{const e=document.createElement("link");e.rel="stylesheet",e.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",e.integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=",e.crossOrigin="",document.head.appendChild(e);const o=document.createElement("script");o.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",o.integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=",o.crossOrigin="",o.onload=()=>{const r=L.map("travel-map").setView([35.8617,104.1954],4);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap contributors"}).addTo(r),[{name:"北京",lat:39.9042,lng:116.4074,description:"首都，历史文化名城",date:"2023年",icon:"🏛️",photos:[{url:"https://images.unsplash.com/photo-1508697014387-db70aad34f4d?w=400&h=300&fit=crop",caption:"天安门广场"},{url:"https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400&h=300&fit=crop",caption:"故宫角楼"},{url:"https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400&h=300&fit=crop",caption:"长城"},{url:"https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400&h=300&fit=crop",caption:"颐和园"}]},{name:"上海",lat:31.2304,lng:121.4737,description:"魔都，现代化大都市",date:"2023年",icon:"🌆",photos:[{url:"https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=400&h=300&fit=crop",caption:"外滩夜景"},{url:"https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=400&h=300&fit=crop",caption:"东方明珠"},{url:"https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=400&h=300&fit=crop",caption:"豫园"}]},{name:"杭州",lat:30.2741,lng:120.1551,description:"人间天堂，西湖美景",date:"2023年",icon:"🏞️",photos:[{url:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",caption:"西湖断桥"},{url:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",caption:"雷峰塔"},{url:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",caption:"灵隐寺"}]},{name:"拉萨",lat:29.65,lng:91.1,description:"雪域高原，布达拉宫",date:"2023年",icon:"🏔️",photos:[{url:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",caption:"布达拉宫"},{url:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",caption:"大昭寺"},{url:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",caption:"八廓街"}]},{name:"冈仁波齐",lat:31.0667,lng:81.3125,description:"神山，世界中心",date:"2023年",icon:"⛰️",photos:[{url:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",caption:"冈仁波齐峰"},{url:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",caption:"转山路上"},{url:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",caption:"经幡"}]},{name:"玛旁雍错",lat:30.6667,lng:81.3333,description:"圣湖，三大圣湖之一",date:"2023年",icon:"💧",photos:[{url:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",caption:"玛旁雍错湖"},{url:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",caption:"湖边经幡"}]},{name:"羊湖",lat:29,lng:90.5,description:"羊卓雍错，高原蓝宝石",date:"2023年",icon:"🌊",photos:[{url:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",caption:"羊卓雍错"},{url:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",caption:"湖边雪山"}]},{name:"日本",lat:36.2048,lng:138.2529,description:"樱花之国，现代与传统",date:"2023年",icon:"🌸",photos:[{url:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",caption:"东京塔"},{url:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",caption:"京都樱花"},{url:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",caption:"大阪城"}]},{name:"新疆",lat:43.8256,lng:87.6168,description:"大美新疆，丝路明珠",date:"2023年",icon:"🏜️",photos:[{url:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",caption:"天山天池"},{url:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",caption:"吐鲁番葡萄"},{url:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1080&fit=crop",caption:"喀什古城"}]}].forEach(t=>{L.marker([t.lat,t.lng]).addTo(r).bindPopup(`
          <div style="text-align: center; min-width: 200px;">
            <div style="font-size: 24px; margin-bottom: 8px;">${t.icon}</div>
            <h3 style="margin: 0 0 8px 0; color: #333;">${t.name}</h3>
            <p style="margin: 0 0 4px 0; color: #666;">${t.description}</p>
            <p style="margin: 0 0 12px 0; color: #999; font-size: 12px;">${t.date}</p>
            ${t.photos&&t.photos.length>0?`
              <div style="margin-top: 12px;">
                <img src="${t.photos[0].url}" 
                     alt="${t.photos[0].caption}" 
                     style="width: 200px; height: 150px; object-fit: cover; border-radius: 8px; cursor: pointer; border: 2px solid #ddd; margin-bottom: 8px;"
                     onclick="showPhotoGallery('${t.name}', ${JSON.stringify(t.photos).replace(/"/g,"&quot;")})"
                     title="点击查看所有照片">
                <div style="font-size: 12px; color: #666;">
                  📸 ${t.photos.length} 张照片 · 点击查看
                </div>
              </div>
            `:""}
          </div>
        `)});const l=L.control({position:"bottomright"});l.onAdd=function(){const t=L.DomUtil.create("div","info legend");return t.style.backgroundColor="white",t.style.padding="10px",t.style.borderRadius="5px",t.style.boxShadow="0 0 15px rgba(0,0,0,0.2)",t.innerHTML=`
        <h4 style="margin: 0 0 10px 0;">我的足迹</h4>
        <p style="margin: 0; color: #666;">点击标记查看详情和照片</p>
      `,t},l.addTo(r),window.showPhotoGallery=function(t,i){let n=0;const d=document.createElement("div");d.style.cssText=`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
      `;function s(){const a=i[n];d.innerHTML=`
          <div style="text-align: center; width: 100%; height: 100%; position: relative;">
            <div style="position: absolute; top: 20px; left: 20px; color: white; font-size: 18px; z-index: 10001;">
              ${t} · ${n+1}/${i.length}
            </div>
            <div style="position: absolute; top: 20px; right: 20px; color: white; font-size: 24px; cursor: pointer; z-index: 10001;" onclick="this.parentElement.parentElement.remove()">
              ✕
            </div>
            
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); max-width: 90%; max-height: 70vh;">
              <img src="${a.url}" 
                   alt="${a.caption}" 
                   style="max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 8px;">
            </div>
            
            <div style="position: absolute; bottom: 120px; left: 50%; transform: translateX(-50%); color: white; font-size: 16px;">${a.caption}</div>
            
            ${i.length>1?`
              <div style="position: absolute; bottom: 80px; left: 50%; transform: translateX(-50%);">
                <button onclick="changePhoto(-1)" style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 10px 15px; border-radius: 5px; cursor: pointer; margin-right: 10px;">← 上一张</button>
                <button onclick="changePhoto(1)" style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 10px 15px; border-radius: 5px; cursor: pointer;">下一张 →</button>
              </div>
              <div style="position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px;">
                ${i.map((y,p)=>`
                  <div onclick="goToPhoto(${p})" 
                       style="width: 12px; height: 12px; border-radius: 50%; background: ${p===n?"white":"rgba(255,255,255,0.3)"}; cursor: pointer;"></div>
                `).join("")}
              </div>
            `:""}
          </div>
        `}window.changePhoto=function(a){n=(n+a+i.length)%i.length,s()},window.goToPhoto=function(a){n=a,s()},s(),document.body.appendChild(d);const c=a=>{a.key==="Escape"?(document.body.removeChild(d),document.removeEventListener("keydown",c)):a.key==="ArrowLeft"?changePhoto(-1):a.key==="ArrowRight"&&changePhoto(1)};document.addEventListener("keydown",c)}},document.head.appendChild(o)}),(e,o)=>(g(),u("div",null,o[0]||(o[0]=[m("",24)])))}}),q=h(b,[["__scopeId","data-v-9c69e90f"]]);export{_ as __pageData,q as default};

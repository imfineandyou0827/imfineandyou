# 旅程

记录我的旅行与见闻。

## 我的足迹地图

<div id="travel-map" style="height: 500px; width: 100%; border-radius: 8px; margin: 20px 0;"></div>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // 动态加载 Leaflet CSS
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
  link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY='
  link.crossOrigin = ''
  document.head.appendChild(link)

  // 动态加载 Leaflet JS
  const script = document.createElement('script')
  script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
  script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo='
  script.crossOrigin = ''
  
  script.onload = () => {
    // 初始化地图
    const map = L.map('travel-map').setView([35.8617, 104.1954], 4) // 中国中心位置

    // 添加 OpenStreetMap 图层
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map)

    // 去过的地方数据
    const places = [
      {
        name: '北京',
        lat: 39.9042,
        lng: 116.4074,
        description: '首都，历史文化名城',
        date: '2023年',
        icon: '🏛️',
        photos: [
          { url: 'https://images.unsplash.com/photo-1508697014387-db70aad34f4d?w=400&h=300&fit=crop', caption: '天安门广场' },
          { url: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400&h=300&fit=crop', caption: '故宫角楼' },
          { url: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400&h=300&fit=crop', caption: '长城' },
          { url: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400&h=300&fit=crop', caption: '颐和园' }
        ]
      },
      {
        name: '上海',
        lat: 31.2304,
        lng: 121.4737,
        description: '魔都，现代化大都市',
        date: '2023年',
        icon: '🌆',
        photos: [
          { url: 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=400&h=300&fit=crop', caption: '外滩夜景' },
          { url: 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=400&h=300&fit=crop', caption: '东方明珠' },
          { url: 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=400&h=300&fit=crop', caption: '豫园' }
        ]
      },
      {
        name: '杭州',
        lat: 30.2741,
        lng: 120.1551,
        description: '人间天堂，西湖美景',
        date: '2023年',
        icon: '🏞️',
        photos: [
          { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', caption: '西湖断桥' },
          { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', caption: '雷峰塔' },
          { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', caption: '灵隐寺' }
        ]
      },
      {
        name: '拉萨',
        lat: 29.6500,
        lng: 91.1000,
        description: '雪域高原，布达拉宫',
        date: '2023年',
        icon: '🏔️',
        photos: [
          { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', caption: '布达拉宫' },
          { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', caption: '大昭寺' },
          { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', caption: '八廓街' }
        ]
      },
      {
        name: '冈仁波齐',
        lat: 31.0667,
        lng: 81.3125,
        description: '神山，世界中心',
        date: '2023年',
        icon: '⛰️',
        photos: [
          { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', caption: '冈仁波齐峰' },
          { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', caption: '转山路上' },
          { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', caption: '经幡' }
        ]
      },
      {
        name: '玛旁雍错',
        lat: 30.6667,
        lng: 81.3333,
        description: '圣湖，三大圣湖之一',
        date: '2023年',
        icon: '💧',
        photos: [
          { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', caption: '玛旁雍错湖' },
          { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', caption: '湖边经幡' }
        ]
      },
      {
        name: '羊湖',
        lat: 29.0000,
        lng: 90.5000,
        description: '羊卓雍错，高原蓝宝石',
        date: '2023年',
        icon: '🌊',
        photos: [
          { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', caption: '羊卓雍错' },
          { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', caption: '湖边雪山' }
        ]
      },
      {
        name: '日本',
        lat: 36.2048,
        lng: 138.2529,
        description: '樱花之国，现代与传统',
        date: '2023年',
        icon: '🌸',
        photos: [
          { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', caption: '东京塔' },
          { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', caption: '京都樱花' },
          { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', caption: '大阪城' }
        ]
      },
      {
        name: '新疆',
        lat: 43.8256,
        lng: 87.6168,
        description: '大美新疆，丝路明珠',
        date: '2023年',
        icon: '🏜️',
        photos: [
          { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', caption: '天山天池' },
          { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', caption: '吐鲁番葡萄' },
          { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', caption: '喀什古城' }
        ]
      }
    ]

    // 添加标记点
    places.forEach(place => {
      const marker = L.marker([place.lat, place.lng])
        .addTo(map)
        .bindPopup(`
          <div style="text-align: center; min-width: 200px;">
            <div style="font-size: 24px; margin-bottom: 8px;">${place.icon}</div>
            <h3 style="margin: 0 0 8px 0; color: #333;">${place.name}</h3>
            <p style="margin: 0 0 4px 0; color: #666;">${place.description}</p>
            <p style="margin: 0 0 12px 0; color: #999; font-size: 12px;">${place.date}</p>
            ${place.photos && place.photos.length > 0 ? `
              <div style="margin-top: 12px;">
                <img src="${place.photos[0].url}" 
                     alt="${place.photos[0].caption}" 
                     style="width: 200px; height: 150px; object-fit: cover; border-radius: 8px; cursor: pointer; border: 2px solid #ddd; margin-bottom: 8px;"
                     onclick="showPhotoGallery('${place.name}', ${JSON.stringify(place.photos).replace(/"/g, '&quot;')})"
                     title="点击查看所有照片">
                <div style="font-size: 12px; color: #666;">
                  📸 ${place.photos.length} 张照片 · 点击查看
                </div>
              </div>
            ` : ''}
          </div>
        `)
    })

    // 添加图例
    const legend = L.control({ position: 'bottomright' })
    legend.onAdd = function() {
      const div = L.DomUtil.create('div', 'info legend')
      div.style.backgroundColor = 'white'
      div.style.padding = '10px'
      div.style.borderRadius = '5px'
      div.style.boxShadow = '0 0 15px rgba(0,0,0,0.2)'
      div.innerHTML = `
        <h4 style="margin: 0 0 10px 0;">我的足迹</h4>
        <p style="margin: 0; color: #666;">点击标记查看详情和照片</p>
      `
      return div
    }
    legend.addTo(map)

    // 全局函数：显示照片画廊
    window.showPhotoGallery = function(placeName, photos) {
      let currentIndex = 0
      
      // 创建模态框
      const modal = document.createElement('div')
      modal.style.cssText = `
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
      `
      
      function updateGallery() {
        const photo = photos[currentIndex]
        modal.innerHTML = `
          <div style="text-align: center; max-width: 90%; max-height: 90%; position: relative;">
            <div style="position: absolute; top: 20px; left: 20px; color: white; font-size: 18px; z-index: 10001;">
              ${placeName} · ${currentIndex + 1}/${photos.length}
            </div>
            <div style="position: absolute; top: 20px; right: 20px; color: white; font-size: 24px; cursor: pointer; z-index: 10001;" onclick="this.parentElement.parentElement.remove()">
              ✕
            </div>
            <img src="${photo.url}" 
                 alt="${photo.caption}" 
                 style="max-width: 100%; max-height: 80vh; object-fit: contain; border-radius: 8px;">
            <div style="color: white; margin-top: 15px; font-size: 16px;">${photo.caption}</div>
            ${photos.length > 1 ? `
              <div style="margin-top: 20px;">
                <button onclick="changePhoto(-1)" style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 10px 15px; border-radius: 5px; cursor: pointer; margin-right: 10px;">← 上一张</button>
                <button onclick="changePhoto(1)" style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 10px 15px; border-radius: 5px; cursor: pointer;">下一张 →</button>
              </div>
              <div style="margin-top: 15px; display: flex; justify-content: center; gap: 8px;">
                ${photos.map((_, index) => `
                  <div onclick="goToPhoto(${index})" 
                       style="width: 12px; height: 12px; border-radius: 50%; background: ${index === currentIndex ? 'white' : 'rgba(255,255,255,0.3)'}; cursor: pointer;"></div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        `
      }
      
      // 切换照片函数
      window.changePhoto = function(direction) {
        currentIndex = (currentIndex + direction + photos.length) % photos.length
        updateGallery()
      }
      
      // 跳转到指定照片
      window.goToPhoto = function(index) {
        currentIndex = index
        updateGallery()
      }
      
      updateGallery()
      document.body.appendChild(modal)
      
      // 键盘控制
      const handleKeydown = (e) => {
        if (e.key === 'Escape') {
          document.body.removeChild(modal)
          document.removeEventListener('keydown', handleKeydown)
        } else if (e.key === 'ArrowLeft') {
          changePhoto(-1)
        } else if (e.key === 'ArrowRight') {
          changePhoto(1)
        }
      }
      document.addEventListener('keydown', handleKeydown)
    }
  }
  
  document.head.appendChild(script)
})
</script>

<style scoped>
#travel-map {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

/* 自定义弹窗样式 */
:deep(.leaflet-popup-content-wrapper) {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

:deep(.leaflet-popup-content) {
  margin: 0;
  padding: 0;
}
</style>

## 旅行记录

### 2023年

#### 北京之旅
- **时间**：2023年X月
- **景点**：故宫、天安门、长城
- **感受**：历史文化底蕴深厚，值得深度游览

#### 上海之行
- **时间**：2023年X月
- **景点**：外滩、东方明珠、豫园
- **感受**：现代化与历史文化的完美融合

#### 杭州游
- **时间**：2023年X月
- **景点**：西湖、灵隐寺、西溪湿地
- **感受**：人间天堂，风景如画

#### 西藏之旅
- **时间**：2023年X月
- **景点**：布达拉宫、大昭寺、八廓街
- **感受**：雪域高原的神秘与神圣

#### 冈仁波齐转山
- **时间**：2023年X月
- **景点**：冈仁波齐峰、玛旁雍错
- **感受**：世界中心的神山，心灵净化之旅

#### 羊卓雍错
- **时间**：2023年X月
- **景点**：羊湖、卡若拉冰川
- **感受**：高原蓝宝石，纯净如镜

#### 日本之旅
- **时间**：2023年X月
- **景点**：东京、京都、大阪
- **感受**：现代科技与传统文化的完美融合

#### 新疆之行
- **时间**：2023年X月
- **景点**：天山、吐鲁番、喀什
- **感受**：大漠风光，丝路文化，美食天堂

---

*更多旅行记录持续更新中...* 
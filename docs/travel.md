# 旅程

记录我的旅行与见闻。

## 我的足迹地图

<div id="travel-map"
     style="width: 90vw; height: 90vw; max-width: 900px; max-height: 900px; margin: 32px auto; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); display: block;"></div>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // 动态加载高德地图 JS API
  const script = document.createElement('script')
  script.src = 'https://webapi.amap.com/maps?v=2.0&key=2b8f301df116637eb0206846d8e5c054'
  
  script.onload = () => {
    // 初始化地图，缩放级别调高
    const map = new AMap.Map('travel-map', {
      zoom: 8,
      center: [104.1954, 35.8617], // 中国中心位置
      mapStyle: 'amap://styles/whitesmoke',
      features: ['bg', 'road', 'building', 'point']
    })

    // 你去过的省/市关键词
    const visited = [
      '北京市', '上海市', '重庆市', '西藏自治区', '新疆维吾尔自治区'
    ]

    // 完全仿照截图风格的高亮配色
    const highlightStroke = '#7ed6a7';
    const highlightFill = '#e6f7ec';
    const normalStroke = '#b3c6e0';

    // 加载GeoJSON插件后再加载省级GeoJSON并高亮去过的区域
    AMap.plugin(['AMap.GeoJSON'], function() {
      fetch('/imfineandyou/geojson/china-provinces.json')
        .then(res => res.json())
        .then(geojson => {
          geojson.features.forEach(feature => {
            const name = feature.properties.name;
            const isVisited = visited.some(v => name.includes(v));
            const coords = feature.geometry.coordinates;
            if (feature.geometry.type === 'MultiPolygon') {
              coords.forEach(subPath => {
                const polygon = new AMap.Polygon({
                  path: subPath[0],
                  strokeColor: isVisited ? highlightStroke : normalStroke,
                  fillColor: isVisited ? highlightFill : '#ffffff',
                  fillOpacity: isVisited ? 0.6 : 0,
                  strokeWeight: 1.5,
                  zIndex: 100,
                  extData: { name }
                });
                polygon.setMap(map);
              });
            } else if (feature.geometry.type === 'Polygon') {
              const polygon = new AMap.Polygon({
                path: coords[0],
                strokeColor: isVisited ? highlightStroke : normalStroke,
                fillColor: isVisited ? highlightFill : '#ffffff',
                fillOpacity: isVisited ? 0.6 : 0,
                strokeWeight: 1.5,
                zIndex: 100,
                extData: { name }
              });
              polygon.setMap(map);
            }
          });
        });
    });

    // 去过的地方数据
    const places = [
      {
        name: '北京',
        lng: 116.4074,
        lat: 39.9042,
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
        lng: 121.4737,
        lat: 31.2304,
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
        lng: 120.1551,
        lat: 30.2741,
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
        lng: 91.1000,
        lat: 29.6500,
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
        lng: 81.3125,
        lat: 31.0667,
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
        lng: 81.3333,
        lat: 30.6667,
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
        lng: 90.5000,
        lat: 29.0000,
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
        lng: 138.2529,
        lat: 36.2048,
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
        lng: 87.6168,
        lat: 43.8256,
        description: '大美新疆，丝路明珠',
        date: '2023年',
        icon: '🏜️',
        photos: [
          { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2560&h=1440&fit=crop', caption: '天山天池' },
          { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', caption: '吐鲁番葡萄' },
          { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1080&fit=crop', caption: '喀什古城' }
        ]
      }
    ]

    // 添加标记点
    places.forEach(place => {
      const marker = new AMap.Marker({
        position: [place.lng, place.lat],
        icon: new AMap.Icon({
          image: '/imfineandyou/location.png',
          size: new AMap.Size(20, 20),
          imageSize: new AMap.Size(20, 20)
        }),
        offset: new AMap.Pixel(-10, -20)
      });
      marker.setMap(map);

      // 创建信息窗体内容
      const infoContent = `
        <div style="text-align: center; min-width: 200px; padding: 10px;">
          <div style="font-size: 24px; margin-bottom: 8px;">${place.icon}</div>
          <h3 style="margin: 0 0 8px 0; color: #333;">${place.name}</h3>
          <p style="margin: 0 0 4px 0; color: #666;">${place.description}</p>
          <p style="margin: 0 0 12px 0; color: #999; font-size: 12px;">${place.date}</p>
          ${place.photos && place.photos.length > 0 ? `
            <div style="margin-top: 12px;">
              <img src="${place.photos[0].url}" 
                   alt="${place.photos[0].caption}" 
                   style="width: 200px; height: 150px; object-fit: cover; border-radius: 8px; cursor: pointer; border: 2px solid #ddd; margin-bottom: 8px;"
                   onclick="showPhotoGallery('${place.name}')"
                   title="点击查看所有照片">
              <div style="font-size: 12px; color: #666;">
                📸 ${place.photos.length} 张照片 · 点击查看
              </div>
            </div>
          ` : ''}
        </div>
      `;

      const infoWindow = new AMap.InfoWindow({
        content: infoContent,
        offset: new AMap.Pixel(0, -30)
      });

      // 点击标记显示信息窗体
      marker.on('click', () => {
        infoWindow.open(map, marker.getPosition());
      });
    });

    // 添加图例
    const legend = document.createElement('div')
    legend.style.cssText = `
      position: absolute;
      bottom: 20px;
      right: 20px;
      background: white;
      padding: 10px;
      border-radius: 5px;
      box-shadow: 0 0 15px rgba(0,0,0,0.2);
      z-index: 1000;
    `
    legend.innerHTML = `
      <h4 style="margin: 0 0 10px 0;">我的足迹</h4>
      <p style="margin: 0; color: #666;">点击标记查看详情和照片</p>
    `
    document.getElementById('travel-map').appendChild(legend)

    // 全局变量存储照片数据
    window.placePhotos = {}
    places.forEach(place => {
      window.placePhotos[place.name] = place.photos
    })

    // 全局函数：显示照片画廊
    window.showPhotoGallery = function(placeName) {
      const photos = window.placePhotos[placeName]
      if (!photos || photos.length === 0) return
      
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
          <div style="text-align: center; width: 100%; height: 100%; position: relative;">
            <div style="position: absolute; top: 20px; left: 20px; color: white; font-size: 18px; z-index: 10001;">
              ${placeName} · ${currentIndex + 1}/${photos.length}
            </div>
            <div style="position: absolute; top: 20px; right: 20px; color: white; font-size: 24px; cursor: pointer; z-index: 10001;" onclick="this.parentElement.parentElement.remove()">
              ✕
            </div>
            
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); max-width: 90%; max-height: 70vh;">
              <img src="${photo.url}" 
                   alt="${photo.caption}" 
                   style="max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 8px;">
            </div>
            
            <div style="position: absolute; bottom: 120px; left: 50%; transform: translateX(-50%); color: white; font-size: 16px;">${photo.caption}</div>
            
            ${photos.length > 1 ? `
              <div style="position: absolute; bottom: 60px; left: 50%; transform: translateX(-50%);">
                <button onclick="changePhoto(-1)" style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 10px 15px; border-radius: 5px; cursor: pointer; margin-right: 10px;">← 上一张</button>
                <button onclick="changePhoto(1)" style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 10px 15px; border-radius: 5px; cursor: pointer;">下一张 →</button>
              </div>
              <div style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px;">
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
</style>

## 旅行记录

<div class="travel-timeline">
  <div class="timeline-item">
    <div class="timeline-dot">
      <div class="dot-inner"></div>
    </div>
    <div class="timeline-card">
      <div class="card-header">
        <div class="travel-icon">🏛️</div>
        <div class="travel-info">
          <h3>北京之旅</h3>
          <div class="travel-meta">
            <span class="travel-date">2023年X月</span>
            <span class="travel-location">📍 北京</span>
          </div>
        </div>
      </div>
      <div class="card-content">
        <div class="travel-highlights">
          <div class="highlight-item">
            <span class="highlight-label">景点</span>
            <span class="highlight-value">故宫、天安门、长城</span>
          </div>
          <div class="highlight-item">
            <span class="highlight-label">感受</span>
            <span class="highlight-value">历史文化底蕴深厚，值得深度游览</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-dot">
      <div class="dot-inner"></div>
    </div>
    <div class="timeline-card">
      <div class="card-header">
        <div class="travel-icon">🌆</div>
        <div class="travel-info">
          <h3>上海之行</h3>
          <div class="travel-meta">
            <span class="travel-date">2023年X月</span>
            <span class="travel-location">📍 上海</span>
          </div>
        </div>
      </div>
      <div class="card-content">
        <div class="travel-highlights">
          <div class="highlight-item">
            <span class="highlight-label">景点</span>
            <span class="highlight-value">外滩、东方明珠、豫园</span>
          </div>
          <div class="highlight-item">
            <span class="highlight-label">感受</span>
            <span class="highlight-value">现代化与历史文化的完美融合</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-dot">
      <div class="dot-inner"></div>
    </div>
    <div class="timeline-card">
      <div class="card-header">
        <div class="travel-icon">🏞️</div>
        <div class="travel-info">
          <h3>杭州游</h3>
          <div class="travel-meta">
            <span class="travel-date">2023年X月</span>
            <span class="travel-location">📍 杭州</span>
          </div>
        </div>
      </div>
      <div class="card-content">
        <div class="travel-highlights">
          <div class="highlight-item">
            <span class="highlight-label">景点</span>
            <span class="highlight-value">西湖、灵隐寺、西溪湿地</span>
          </div>
          <div class="highlight-item">
            <span class="highlight-label">感受</span>
            <span class="highlight-value">人间天堂，风景如画</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-dot">
      <div class="dot-inner"></div>
    </div>
    <div class="timeline-card">
      <div class="card-header">
        <div class="travel-icon">🏔️</div>
        <div class="travel-info">
          <h3>西藏之旅</h3>
          <div class="travel-meta">
            <span class="travel-date">2023年X月</span>
            <span class="travel-location">📍 拉萨</span>
          </div>
        </div>
      </div>
      <div class="card-content">
        <div class="travel-highlights">
          <div class="highlight-item">
            <span class="highlight-label">景点</span>
            <span class="highlight-value">布达拉宫、大昭寺、八廓街</span>
          </div>
          <div class="highlight-item">
            <span class="highlight-label">感受</span>
            <span class="highlight-value">雪域高原的神秘与神圣</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-dot">
      <div class="dot-inner"></div>
    </div>
    <div class="timeline-card">
      <div class="card-header">
        <div class="travel-icon">⛰️</div>
        <div class="travel-info">
          <h3>冈仁波齐转山</h3>
          <div class="travel-meta">
            <span class="travel-date">2023年X月</span>
            <span class="travel-location">📍 冈仁波齐</span>
          </div>
        </div>
      </div>
      <div class="card-content">
        <div class="travel-highlights">
          <div class="highlight-item">
            <span class="highlight-label">景点</span>
            <span class="highlight-value">冈仁波齐峰、玛旁雍错</span>
          </div>
          <div class="highlight-item">
            <span class="highlight-label">感受</span>
            <span class="highlight-value">世界中心的神山，心灵净化之旅</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-dot">
      <div class="dot-inner"></div>
    </div>
    <div class="timeline-card">
      <div class="card-header">
        <div class="travel-icon">🌊</div>
        <div class="travel-info">
          <h3>羊卓雍错</h3>
          <div class="travel-meta">
            <span class="travel-date">2023年X月</span>
            <span class="travel-location">📍 羊湖</span>
          </div>
        </div>
      </div>
      <div class="card-content">
        <div class="travel-highlights">
          <div class="highlight-item">
            <span class="highlight-label">景点</span>
            <span class="highlight-value">羊湖、卡若拉冰川</span>
          </div>
          <div class="highlight-item">
            <span class="highlight-label">感受</span>
            <span class="highlight-value">高原蓝宝石，纯净如镜</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-dot">
      <div class="dot-inner"></div>
    </div>
    <div class="timeline-card">
      <div class="card-header">
        <div class="travel-icon">🌸</div>
        <div class="travel-info">
          <h3>日本之旅</h3>
          <div class="travel-meta">
            <span class="travel-date">2023年X月</span>
            <span class="travel-location">📍 日本</span>
          </div>
        </div>
      </div>
      <div class="card-content">
        <div class="travel-highlights">
          <div class="highlight-item">
            <span class="highlight-label">景点</span>
            <span class="highlight-value">东京、京都、大阪</span>
          </div>
          <div class="highlight-item">
            <span class="highlight-label">感受</span>
            <span class="highlight-value">现代科技与传统文化的完美融合</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-dot">
      <div class="dot-inner"></div>
    </div>
    <div class="timeline-card">
      <div class="card-header">
        <div class="travel-icon">🏜️</div>
        <div class="travel-info">
          <h3>新疆之行</h3>
          <div class="travel-meta">
            <span class="travel-date">2023年X月</span>
            <span class="travel-location">📍 新疆</span>
          </div>
        </div>
      </div>
      <div class="card-content">
        <div class="travel-highlights">
          <div class="highlight-item">
            <span class="highlight-label">景点</span>
            <span class="highlight-value">天山、吐鲁番、喀什</span>
          </div>
          <div class="highlight-item">
            <span class="highlight-label">感受</span>
            <span class="highlight-value">大漠风光，丝路文化，美食天堂</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style scoped>
.travel-timeline {
  position: relative;
  max-width: 900px;
  margin: 60px auto;
  padding: 0 20px;
}

.travel-timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, 
    #667eea 0%, 
    #764ba2 25%, 
    #f093fb 50%, 
    #f5576c 75%, 
    #4facfe 100%);
  transform: translateX(-50%);
  border-radius: 2px;
}

.timeline-item {
  position: relative;
  margin-bottom: 60px;
  display: flex;
  align-items: center;
}

.timeline-item:nth-child(odd) {
  flex-direction: row;
}

.timeline-item:nth-child(even) {
  flex-direction: row-reverse;
}

.timeline-dot {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background: white;
  border: 4px solid #667eea;
  border-radius: 50%;
  z-index: 10;
  box-shadow: 0 0 0 6px rgba(102, 126, 234, 0.1);
  transition: all 0.3s ease;
}

.timeline-dot:hover {
  transform: translate(-50%, -50%) scale(1.2);
  box-shadow: 0 0 0 8px rgba(102, 126, 234, 0.2);
}

.dot-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  background: #667eea;
  border-radius: 50%;
}

.timeline-card {
  width: 45%;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid rgba(102, 126, 234, 0.1);
}

.timeline-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.travel-icon {
  font-size: 32px;
  margin-right: 16px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.travel-info h3 {
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.travel-meta {
  display: flex;
  gap: 12px;
  font-size: 14px;
  opacity: 0.9;
}

.travel-date {
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 8px;
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.travel-location {
  font-weight: 500;
}

.card-content {
  padding: 20px;
}

.travel-highlights {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.highlight-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.highlight-label {
  min-width: 60px;
  font-weight: 600;
  color: #667eea;
  font-size: 14px;
  padding: 4px 8px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 8px;
  text-align: center;
}

.highlight-value {
  flex: 1;
  color: #4a5568;
  line-height: 1.6;
  font-size: 14px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .travel-timeline::before {
    left: 30px;
  }
  
  .timeline-item {
    flex-direction: row !important;
    margin-bottom: 40px;
  }
  
  .timeline-dot {
    left: 30px;
  }
  
  .timeline-card {
    width: calc(100% - 60px);
    margin-left: 60px;
  }
  
  .card-header {
    padding: 16px;
  }
  
  .travel-icon {
    font-size: 24px;
    margin-right: 12px;
  }
  
  .travel-info h3 {
    font-size: 18px;
  }
  
  .travel-meta {
    flex-direction: column;
    gap: 6px;
  }
  
  .card-content {
    padding: 16px;
  }
  
  .highlight-item {
    flex-direction: column;
    gap: 6px;
  }
  
  .highlight-label {
    min-width: auto;
    align-self: flex-start;
  }
}
</style>

---

*更多旅行记录持续更新中...* 
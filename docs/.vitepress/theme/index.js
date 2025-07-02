import DefaultTheme from 'vitepress/theme'
import './custom.css'

if (typeof window !== 'undefined') {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://unpkg.com/aplayer/dist/APlayer.min.css';
  document.head.appendChild(link);

  const script = document.createElement('script');
  script.src = 'https://unpkg.com/aplayer/dist/APlayer.min.js';
  script.onload = () => {
    if (!window._aplayer_inited) {
      window._aplayer_inited = true;
      new window.APlayer({
        container: document.getElementById('aplayer'),
        fixed: true,
        autoplay: false,
        audio: [
          {
            name: 'Sample Music',
            artist: 'Unknown',
            url: 'https://cdn.jsdelivr.net/gh/maoxiong233/vitepress-blog/public/music.mp3',
            cover: '/logo.png'
          }
        ]
      });
    }
  };
  document.body.appendChild(script);
}

export default {
  ...DefaultTheme
} 
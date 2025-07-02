---
layout: home

hero:
  name: 是姚杰的博客
  text: 来看看我的生活
  tagline: 慢就是快
  image:
    src: /logo.png
    alt: logo
  actions:
    - theme: brand
      text: Get Started
      link: /travel
    - theme: alt
      text: View on GitHub
      link: https://github.com/imfineandyou0827
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
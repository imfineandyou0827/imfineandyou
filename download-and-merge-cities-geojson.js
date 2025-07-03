// download-and-merge-cities-geojson.js
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const provinceCodes = [
    100000,110000,120000,130000,140000,150000,210000,220000,230000,310000,320000,330000,340000,350000,360000,370000,410000,420000,430000,440000,450000,460000,500000,510000,520000,530000,540000,610000,620000,630000,640000,650000,710000,810000,820000
];

const outDir = path.resolve(__dirname, 'geojson');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if (res.statusCode === 404) {
        console.warn(`警告: ${url} 返回 404，已跳过`);
        return resolve(false); // 返回 false 表示未下载
      }
      if (res.statusCode !== 200) return reject(new Error('Status code: ' + res.statusCode));
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve(true)));
    }).on('error', reject);
  });
}

async function main() {
  let allFeatures = [];
  // 先处理全国，提取所有省级 feature
  const chinaFile = path.join(outDir, '100000_full.geojson');
  if (!fs.existsSync(chinaFile)) {
    const url = 'https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=100000_full';
    await download(url, chinaFile);
  }
  const chinaGeojson = JSON.parse(fs.readFileSync(chinaFile, 'utf-8'));
  if (chinaGeojson.features && Array.isArray(chinaGeojson.features)) {
    allFeatures.push(...chinaGeojson.features.filter(f => f.properties && f.properties.level === 'province'));
  }

  // 再处理其它省份，提取市级
  for (const code of provinceCodes) {
    if (code === 100000) continue; // 跳过全国
    const url = `https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=${code}_full`;
    const filePath = path.join(outDir, `${code}_full.geojson`);
    console.log(`下载: ${url}`);
    const downloaded = await download(url, filePath);
    if (!downloaded) continue; // 跳过未下载的

    const geojson = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    if (geojson.features && Array.isArray(geojson.features)) {
      allFeatures.push(...geojson.features.filter(f => f.properties && f.properties.level === 'city'));
    }
  }
  const merged = {
    type: "FeatureCollection",
    features: allFeatures
  };
  const outFile = path.join(__dirname, 'docs/public/geojson/china-cities-full.geojson');
  fs.writeFileSync(outFile, JSON.stringify(merged, null, 2), 'utf-8');
  console.log(`合并完成，输出文件: ${outFile}`);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
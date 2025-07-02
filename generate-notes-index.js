// 自动生成 docs/notes.md 目录脚本（支持文件夹分组）
// 用法：node generate-notes-index.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NOTES_DIR = path.join(__dirname, 'docs/notes');
const OUTPUT_FILE = path.join(__dirname, 'docs/notes.md');

function parseFrontmatter(content) {
  const match = content.match(/^---([\s\S]*?)---/);
  if (!match) return {};
  const fm = match[1];
  const title = fm.match(/title:\s*(.+)/)?.[1]?.trim() || '';
  const summary = fm.match(/summary:\s*(.+)/)?.[1]?.trim() || '';
  return { title, summary };
}

function walk(dir, base = '') {
  const groups = {};
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const relPath = base ? path.posix.join(base, file) : file;
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      const sub = walk(fullPath, relPath);
      for (const [k, v] of Object.entries(sub)) {
        groups[k] = (groups[k] || []).concat(v);
      }
    } else if (file.endsWith('.md')) {
      const group = base || '未分组';
      groups[group] = groups[group] || [];
      groups[group].push(relPath);
    }
  }
  return groups;
}

function generateIndex() {
  const groups = walk(NOTES_DIR);
  let md = `# 笔记\n\n这里记录我的学习与思考笔记。\n\n---\n`;
  for (const group of Object.keys(groups).sort()) {
    md += `\n## ${group}\n`;
    for (const relPath of groups[group].sort()) {
      const absPath = path.join(NOTES_DIR, relPath);
      const content = fs.readFileSync(absPath, 'utf-8');
      const { title, summary } = parseFrontmatter(content);
      const encodedPath = relPath.split('/').map(encodeURIComponent).join('/');
      md += `- [${title || relPath.replace('.md','')}](${path.posix.join('notes', encodedPath)})：${summary || ''}\n`;
    }
  }
  fs.writeFileSync(OUTPUT_FILE, md, 'utf-8');
  console.log('notes.md 已自动分组生成！');
}

generateIndex(); 
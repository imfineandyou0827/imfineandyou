// 自动生成 docs/notes.md 目录脚本
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

function generateIndex() {
  const files = fs.readdirSync(NOTES_DIR).filter(f => f.endsWith('.md'));
  const entries = files.map(filename => {
    const filepath = path.join(NOTES_DIR, filename);
    const content = fs.readFileSync(filepath, 'utf-8');
    const { title, summary } = parseFrontmatter(content);
    return `- [${title || filename.replace('.md','')}](${path.posix.join('notes', filename)})：${summary || ''}`;
  });

  const md = `# 笔记\n\n这里记录我的学习与思考笔记。\n\n---\n\n${entries.join('\n')}\n`;
  fs.writeFileSync(OUTPUT_FILE, md, 'utf-8');
  console.log('notes.md 已自动生成！');
}

generateIndex(); 
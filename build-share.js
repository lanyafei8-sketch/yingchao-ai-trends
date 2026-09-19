const fs = require('node:fs');
const path = require('node:path');

const projectRoot = __dirname;
const publishDir = path.join(projectRoot, 'dist');
const publicFiles = ['index.html', 'styles.css', 'app.js'];

// 分享版只复制网页运行必需的三个文件，避免发布项目里的脚本和其他资料。
fs.mkdirSync(publishDir, { recursive: true });
for (const filename of publicFiles) {
  fs.copyFileSync(path.join(projectRoot, filename), path.join(publishDir, filename));
}

console.log(`分享版已生成：${publishDir}`);

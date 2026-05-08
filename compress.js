// Run: npm install sharp
// Run: node compress.js

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

function getImages(dir, files = []) {
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) getImages(full, files);
    else if (/\.(jpg|jpeg|png)$/i.test(file)) files.push(full);
  });
  return files;
}

async function compress() {
  const images = getImages('./assets');
  for (const img of images) {
    const out = img.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const oldSize = (fs.statSync(img).size / 1024).toFixed(1);
    await sharp(img).webp({ quality: 80 }).toFile(out);
    const newSize = (fs.statSync(out).size / 1024).toFixed(1);
    console.log(`${img}: ${oldSize}KB → ${newSize}KB`);
  }
}

compress();

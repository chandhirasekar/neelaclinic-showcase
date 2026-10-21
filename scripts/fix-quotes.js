const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDir(fullPath);
    } else if (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('\\"')) {
        content = content.replace(/\\"/g, '"');
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Fixed quotes in:', fullPath);
      }
    }
  }
}

processDir(path.join(__dirname, '..', 'src'));
console.log('Finished quote cleanup.');

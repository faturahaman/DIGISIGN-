const fs = require('fs');
const path = require('path');

const directories = ['app', 'components', 'lib'];

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace occurrences
  content = content.replace(/DiGiSign/g, 'Arvion');
  content = content.replace(/digisign/g, 'arvion');
  content = content.replace(/DiGiSinn/g, 'Arvion');
  content = content.replace(/digisinn/g, 'arvion');
  content = content.replace(/WhyDigiSignSection/g, 'WhyArvionSection');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (filePath.endsWith('.ts') || filePath.endsWith('.tsx') || filePath.endsWith('.css') || filePath.endsWith('.json')) {
      replaceInFile(filePath);
    }
  }
}

directories.forEach(dir => {
  if (fs.existsSync(dir)) {
    walkDir(dir);
  }
});

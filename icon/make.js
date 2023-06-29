const fs = require('fs');
const icongen = require('icon-gen');

const copyFile = (src, dest) => {
  fs.copyFile(src, dest, err => {
    if (err) {
      throw err;
    } else {
      console.log(`Copied ${src} to ${dest}`);
    }
  });
};


icongen('icon/icon.svg', 'icon', {
  report: true,
  favicon: {
    name: 'icon-',
    pngSizes: [48, 72, 96, 120, 128, 144, 152, 180, 192, 256, 384, 512],
    icoSizes: [16, 24, 32, 48, 64]
  }
}).then(() => {
  fs.mkdirSync('docs/icon', { recursive: true, mode: 0o755 });
  copyFile('icon/favicon.ico', 'docs/icon/favicon.ico');
  fs.readdirSync('icon')
    .filter(file => file.startsWith('icon-') && file.endsWith('.png'))
    .forEach(file => {
      copyFile(`icon/${file}`, `docs/icon/${file}`);
    });
});

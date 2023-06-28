const fs = require('fs');
const icongen = require('icon-gen');

icongen('icons/icon.svg', 'icons', {
  report: true,
  ico: {
    name: 'app',
    sizes: [48, 72, 96, 120, 128, 144, 152, 180, 192, 384, 512]
  },
  favicon: {
    name: 'thumb-',
    pngSizes: [256],
    icoSizes: [16, 24, 32, 48, 64]
  }
}).then(() => {
  fs.mkdirSync('docs/icons', { recursive: true, mode: 0o755 });
  fs.copyFileSync('icons/favicon.ico', 'docs/icons/favicon.ico');
  fs.copyFileSync('icons/thumb-256.png', 'docs/icons/thumbnail.png');
  fs.copyFileSync('icons/app.ico', 'docs/icons/app.ico');
});

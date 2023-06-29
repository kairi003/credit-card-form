const icongen = require('icon-gen');

async function main() {
  // 1. generate the maskable icons.
  await icongen('icon/icon-maskable.svg', 'docs/icon', {
    report: true,
    favicon: {
      name: 'icon-maskable-',
      pngSizes: [48, 72, 96, 120, 128, 144, 152, 180, 192, 256, 384, 512],
      icoSizes: [16, 24, 32, 48, 64]
    }
  });

  // 2. generate the regular icons.
  // Overwrite maskable favicon.ico with regular one.
  await icongen('icon/icon.svg', 'docs/icon', {
    report: true,
    favicon: {
      name: 'icon-',
      pngSizes: [48, 72, 96, 120, 128, 144, 152, 180, 192, 256, 384, 512],
      icoSizes: [16, 24, 32, 48, 64]
    }
  });

}

main();

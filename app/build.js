const fs = require('fs-extra');

async function build() {
  try {
    // Remove old dist
    await fs.remove('dist');

    // Create dist
    await fs.mkdir('dist');

    // Copy folders
    const folders = ['middleware', 'models', 'routes', 'views', 'public'];

    for (const folder of folders) {
      if (await fs.pathExists(folder)) {
        await fs.copy(folder, `dist/${folder}`);
      }
    }

    // Copy files
    const files = ['server.js', 'package.json', 'package-lock.json', 'web.config'];

    for (const file of files) {
      if (await fs.pathExists(file)) {
        await fs.copy(file, `dist/${file}`);
      }
    }

    console.log('✅ Build successful: dist/ created');
  } catch (err) {
    console.error('❌ Build failed:', err);
  }
}

build();
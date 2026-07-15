import { readdirSync, rmSync, copyFileSync, statSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = dirname(fileURLToPath(import.meta.url));
const buildDir = join(repoRoot, 'build');
const buildAssetsDir = join(buildDir, 'assets');
const rootAssetsDir = join(repoRoot, 'assets');

copyFileSync(join(buildDir, 'index.html'), join(repoRoot, 'index.html'));

// GitHub Pages has no server-side router, so it 404s on any deep link
// (e.g. /web-projects). Serving index.html as 404.html lets React Router
// take over once the app loads.
copyFileSync(join(buildDir, 'index.html'), join(buildDir, '404.html'));
copyFileSync(join(buildDir, 'index.html'), join(repoRoot, '404.html'));

mkdirSync(rootAssetsDir, { recursive: true });
const newAssets = new Set(readdirSync(buildAssetsDir));

for (const existing of readdirSync(rootAssetsDir)) {
  if (!newAssets.has(existing) && statSync(join(rootAssetsDir, existing)).isFile()) {
    rmSync(join(rootAssetsDir, existing), { force: true });
  }
}

for (const file of newAssets) {
  copyFileSync(join(buildAssetsDir, file), join(rootAssetsDir, file));
}

console.log('Synced build/index.html and build/assets/ to repo root for GitHub Pages.');

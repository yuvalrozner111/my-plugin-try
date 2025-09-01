import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { readdirSync, existsSync, lstatSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Explicitly define __dirname for ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Build explicit copy targets by enumerating files inside each plugin's `public` folder.
// This avoids passing a glob that might not match on Windows and ensures the
// vite-plugin-static-copy receives only existing file paths (with posix separators).
const getStaticCopyTargets = () => {
  const pluginRoot = path.resolve(__dirname, 'src/plugins');
  if (!existsSync(pluginRoot)) return [];

  const allPluginDirs = readdirSync(pluginRoot, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const targets = [];

  for (const pluginName of allPluginDirs) {
    const publicDir = path.resolve(pluginRoot, pluginName, 'public');
    if (!existsSync(publicDir)) continue;

    const entries = readdirSync(publicDir);
    if (!entries || entries.length === 0) continue;

    // Only include regular files and convert backslashes to forward slashes
    const filePaths = entries
      .map(name => path.join(publicDir, name))
      .filter(p => {
        try {
          return lstatSync(p).isFile();
        } catch (e) {
          return false;
        }
      })
      .map(p => p.replace(/\\/g, '/'));

    if (filePaths.length > 0) {
      targets.push({ src: filePaths, dest: `plugins/${pluginName}` });
    }
  }

  return targets;
};

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      // compute exact targets so the plugin won't fail when a glob doesn't match
      targets: getStaticCopyTargets()
    })
  ],
});
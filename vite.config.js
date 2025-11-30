import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { readdirSync, existsSync, lstatSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Explicitly define __dirname for ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Build copy targets for plugin public assets
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

    // New, simpler logic:
    // This tells the copy plugin to copy all contents (*)
    // from the plugin's public dir...
    const srcPath = path.join(pluginRoot, pluginName, 'public', '*').replace(/\\/g, '/');
    
    // ...to the destination 'plugins/[pluginName]'
    // This will correctly copy files and nested dirs (like /locales)
    targets.push({
      src: srcPath,
      dest: `plugins/${pluginName}`
    });
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
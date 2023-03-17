import { resolve } from 'path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createBlockletPlugin } from 'vite-plugin-blocklet';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import svgLoader from 'vite-svg-loader';

function pathResolve(dir) {
  return resolve(process.cwd(), dir) + '/';
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), createBlockletPlugin(), nodePolyfills({ protocolImports: true }), svgLoader()],
  resolve: {
    alias: [
      {
        find: /\/@\//,
        replacement: pathResolve('src'),
      },
    ],
  },
  test: {
    environment: 'happy-dom',
  },
});

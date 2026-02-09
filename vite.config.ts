import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { playwright } from '@vitest/browser-playwright';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === 'ghpages') {
    // GH Pages build: bundles the demo app
    return {
      base: './',
      root: resolve(__dirname, './demo'),
      build: {
        outDir: '../ghpages/demo',
        emptyOutDir: true,
        manifest: true,
        rollupOptions: {
          input: {
            main: resolve(__dirname, 'demo/index.html'),
          },
          output: {
            entryFileNames: 'app-root.js',
          },
        },
      },
    };
  }

  // Library build (default): produces dist/ for npm publishing
  return {
    test: {
      browser: {
        enabled: true,
        provider: playwright(),
        instances: [{ browser: 'chromium' }],
      },
    },
    build: {
      lib: {
        entry: resolve(__dirname, 'index.ts'),
        formats: ['es'],
        fileName: () => 'index.js',
      },
      outDir: 'dist',
      emptyOutDir: true,
      rollupOptions: {
        external: [/^lit/, 'tslib'],
      },
    },
    plugins: [
      dts({
        tsconfigPath: resolve(__dirname, 'tsconfig.build.json'),
        outDir: 'dist',
      }),
    ],
  };
});

import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig(({ mode }) => ({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'type-guard',
      fileName: 'index',
    },
  },
  plugins: [
    dts({
      afterDiagnostic: (diagnostics) => {
        if (mode === 'development') {
          return;
        }
        if (
          (mode === 'production' || mode === 'test') &&
          diagnostics.length > 0
        ) {
          process.exit(1);
        }
      },
    }),
  ],
}));

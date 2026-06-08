import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  treeshake: true,
  splitting: false,
  // Peer + runtime deps that should not be bundled into dist:
  external: ['react', 'react-dom', 'react/jsx-runtime', 'clsx'],
  // Output filenames: dist/index.js (esm) + dist/index.cjs (cjs) + dist/index.d.ts
  outExtension({ format }) {
    return { js: format === 'cjs' ? '.cjs' : '.js' };
  },
});

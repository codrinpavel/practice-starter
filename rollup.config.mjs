import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

const dev = process.env.ELEVENTY_ENV !== 'production';

export default {
  input: 'src/assets/js/main.js',
  output: {
    file: 'dist/assets/min/main.min.js',
    format: 'iife',
  },
  plugins: [
    resolve(),
    !dev && terser(),
  ],
};
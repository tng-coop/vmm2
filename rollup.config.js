// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'esm',
    sourcemap: true
  },
  plugins: [
    resolve(),
    postcss({
      extract: true, // This should output a bundle.css file
      minimize: true,
      sourceMap: true
    })
  ]
};

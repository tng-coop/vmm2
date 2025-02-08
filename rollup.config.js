// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs'; // include if you're using CommonJS modules
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'esm',       // using ES modules output (adjust if needed)
    sourcemap: true
  },
  plugins: [
    resolve(),           // so Rollup can locate npm modules
    postcss({
      extract: true,     // extracts CSS into a separate file (default: same base name as JS file, e.g., bundle.css)
      minimize: true,    // minify the CSS
      sourceMap: true    // generate source maps for the CSS
    })
  ]
};

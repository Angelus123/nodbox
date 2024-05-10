import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import tailwindcss from 'tailwindcss';
import tailwindConfig from'./tailwind.config.js';
import replace from 'rollup-plugin-replace';
import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';

var productionConfig = {
  input: './src/index.js',
  output: {
    file: './dist/bundle.js',
    format: 'iife'
  },
  plugins: [

    // terser(),
			json(),
    babel({
      exclude: 'node_modules/**'
    }),
    resolve({
      // Set the browser field to false to avoid resolving to the node version of modules
      browser: true,
      // Specify the fallback for resolving 'zlib'
      browser: {
        zlib: 'browserify-zlib'
      }
      }),
    nodeResolve({
      jsnext: true
    }),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/react/index.js': ['useState', 'useRef', 'useEffect'],
      }
    }),
    postcss({
      config: {
        path: './postcss.config.js',
      },
      extensions: ['.css'],
      minimize: true,
      inject: {
        insertAt: 'top',
      },
      plugins: [tailwindcss(tailwindConfig)],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    // uglify({
    //   compress: {
    //     screw_ie8: true,
    //     warnings: false
    //   },
    //   output: {
    //     comments: false
    //   },
    //   sourcemap: false // corrected property name
    // })
  ]
};

export default productionConfig;

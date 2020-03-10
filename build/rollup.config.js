import commonjs from 'rollup-plugin-commonjs'; // Convert CommonJS modules to ES6
import Vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import buble from 'rollup-plugin-buble'; // Transpile/polyfill with reasonable browser support;
import pkg from '../package.json';

export default {
    input: 'src/index.js',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            sourcemap: process.env.NODE_ENV !== 'production',
            exports: 'named',
        },
        {
            file: pkg.module,
            format: 'es',
            sourcemap: process.env.NODE_ENV !== 'production',
            exports: 'named',
        },
        {
            file: pkg.umd,
            format: 'umd',
            sourcemap: process.env.NODE_ENV !== 'production',
            name: 'vue-media-library',
            exports: 'named',
        }
    ],
    plugins: [
        commonjs(),
        Vue({
            css: true,
            compileTemplate: true, // Explicitly convert template to render function
        }),
        buble({
            transforms: { asyncAwait: false },
            objectAssign: 'Object.assign',
        }),
    ]
};
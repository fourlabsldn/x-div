/* eslint-env node */
const babel = require('rollup-plugin-babel');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

module.exports = (grunt) => {
  'use strict';
  grunt.initConfig({
    jasmine: {
      components: {
        src: [
          'components/*js',
        ],
        options: {
          specs: 'tests/specs/*Spec.js',
        },
      },
    },
    rollup: {
      options: {
        plugins: () => {
          return [
            nodeResolve({ jsnext: true, main: true }),
            commonjs(),
            babel({
              runtimeHelpers: true,
              exclude: 'node_modules/**',
              plugins: ['transform-async-to-generator', [
                'transform-runtime', {
                  polyfill: false,
                  regenerator: true,
                }]],
              presets: ['es2015-rollup'],
            }),
          ];
        },
      },
      main: {
        dest: 'build/main.js',
        src: 'src/main.js', // Only one source file is permitted
      },
    },
    concat: {
      options: {
        separator: ';\n',
      },
      dist: {
        src: ['node_modules/webcomponents.js/CustomElements.min.js', 'build/main.js'],
        dest: 'dist/x-div.js',
      },
    },
    watch: {
      demo: {
        files: 'demo/**/*.*',
        tasks: ['dist'],
        options: {
          livereload: true,
        },
      },
      src: {
        files: 'src/**/*.*',
        tasks: ['dist'],
        options: {
          livereload: true,
        },
      },
    },
    open: {
      demo: {
        path: 'demo/index.html',
        app: 'google-chrome',
      },
    },
  });

  grunt.registerTask('travis', ['jasmine']);

  grunt.loadNpmTasks('grunt-rollup');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('dev', ['dist', 'open', 'watch']);

  grunt.registerTask('dist', ['rollup', 'concat']);
};

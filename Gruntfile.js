const babel = require('rollup-plugin-babel');

module.exports = function (grunt) {
  'use strict';
  grunt.initConfig({
    jasmine: {
      components: {
        src: [
        'components/*js'
        ],
        options: {
          specs: 'tests/specs/*Spec.js'
        }
      }
    },
    rollup: {
      options: {
        plugins: function () {
          return [
            babel({
              exclude: './node_modules/**',
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
        src: ['bower_components/webcomponentsjs/CustomElements.js', 'build/main.js'],
        dest: 'dist/x-div.js',
      },
    },
  });

  grunt.registerTask('travis', [
      'jasmine',
  ]);

  grunt.loadNpmTasks('grunt-rollup');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('dist', ['rollup', 'concat']);
};

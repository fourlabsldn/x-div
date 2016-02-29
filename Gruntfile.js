module.exports = function (grunt) {
  'use strict';
  grunt.initConfig({
    jshint: {
      files: ['js/**/*.js'],
      options: {
        jshintrc: true
      }
    },
    jasmine: {
      components: {
        src: [
        'components/*js'
        ],
        options: {
          specs: 'tests/specs/*Spec.js'
        }
      }
    }
  });

  grunt.registerTask('travis', [
      'jshint',
      'jasmine'
  ]);

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint']);

};

/**
 * `tasks/config/copy`
 *
 * ---------------------------------------------------------------
 *
 * Copy files and/or folders.
 *
 * For more information, see:
 *   https://sailsjs.com/anatomy/tasks/config/copy.js
 *
 */
module.exports = function(grunt) {

  grunt.config.set('copy', {
    dev: {
      files: [{
        expand: true,
        cwd: './assets',
        src: ['**/*.!(coffee|less|scss|sass)'],
        dest: '.tmp/public'
      }]
    },
    build: {
      files: [{
        expand: true,
        cwd: '.tmp/public',
        src: ['**/*'],
        dest: 'www'
      }]
    },
    beforeLinkBuildProd: {
      files: [{
        expand: true,
        cwd: '.tmp/public/hash',
        src: ['**/*'],
        dest: '.tmp/public/dist'
      }]
    },
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
};

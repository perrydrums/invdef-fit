const sass = require('node-sass');

module.exports = function(grunt) {

  grunt.config.set('sass', {
    dev: {
      options: {
        includePaths: ['node_modules/bootstrap-sass/assets/stylesheets'],
        implementation: sass,
      },
      files: [{
        expand: true,
        cwd: 'assets/styles/',
        src: ['importer.scss'],
        dest: '.tmp/public/styles/',
        ext: '.css'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-sass');
};

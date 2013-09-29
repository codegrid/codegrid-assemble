module.exports = function(grunt) {

  grunt.task.loadNpmTasks('grunt-contrib-copy');
  grunt.task.loadNpmTasks('assemble');

  grunt.initConfig({

    assemble: {

      dev: {
        options: {
          layout: 'src/layouts/default.hbs',
          assets: 'dest/assets',
          dev: true, // dev flag
          production: false // production flag
        },
        files: [
          {
            expand: true,
            cwd: 'src/pages/',
            src: '**/*.hbs',
            dest: 'dest/'
          }
        ]
      },

      production: {
        options: {
          layout: 'src/layouts/default.hbs',
          assets: 'dest/assets',
          dev: false, // dev flag
          production: true // production flag
        },
        files: [
          {
            expand: true,
            cwd: 'src/pages/',
            src: '**/*.hbs',
            dest: 'dest/'
          }
        ]
      }

    }, // assemble

    copy: {
      assets: {
        expand: true,
        cwd: 'src/assets',
        src: '**',
        dest: 'dest/assets'
      }
    }

  });

  grunt.registerTask('build:dev', ['assemble:dev', 'copy']);
  grunt.registerTask('build:production', ['assemble:production', 'copy']);
  grunt.registerTask('default', 'build:dev');

};

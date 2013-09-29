module.exports = function(grunt) {

  grunt.task.loadNpmTasks('grunt-contrib-copy');
  grunt.task.loadNpmTasks('assemble');

  grunt.initConfig({

    assemble: {
      site: {
        options: {
          layout: 'src/layouts/default.hbs',
          assets: 'dest/assets'
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
    },

    copy: {
      assets: {
        expand: true,
        cwd: 'src/assets',
        src: '**',
        dest: 'dest/assets'
      }
    }

  });

  grunt.registerTask('default', [ 'assemble', 'copy' ]);

};

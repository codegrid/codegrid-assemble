module.exports = function(grunt) {
  grunt.task.loadNpmTasks('assemble');
  grunt.initConfig({
    assemble: {
      site: {
        options: {
          data: ['nav.yml'],
          layout: 'src/layouts/default.hbs',
          partials: 'src/partials/**/*.hbs',
          flatten: true
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
    }
  });
  grunt.registerTask('default', ['assemble']);
};

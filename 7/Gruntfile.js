module.exports = function(grunt) {
  grunt.task.loadNpmTasks('assemble');
  grunt.initConfig({
    assemble: {
      site: {
        options: {
          data: ['config.yml'],
          layout: 'src/layouts/default.hbs',
          partials: 'src/partials/**/*.hbs',
          flatten: true
        },
        files: [
          {
            src: 'src/pages/**/*.hbs',
            dest: 'dest/'
          }
        ]
      }
    }
  });
  grunt.registerTask('default', ['assemble']);
};

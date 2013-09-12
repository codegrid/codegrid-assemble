module.exports = function(grunt) {
  grunt.task.loadNpmTasks('assemble');
  grunt.initConfig({
    assemble: {
      site: {
        options: {
          data: ['config.yml']
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

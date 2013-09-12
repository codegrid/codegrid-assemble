module.exports = function(grunt) {
  grunt.task.loadNpmTasks('assemble');
  grunt.initConfig({
    assemble: {
      pages: {
        options: {
          data: ['config.yml']
        },
        files: [
          {
            src: 'src/pages/1.hbs',
            dest: 'dest/1.html'
          }
        ]
      }
    }
  });
  grunt.registerTask('default', ['assemble']);
};

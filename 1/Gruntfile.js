module.exports = function(grunt) {
  grunt.task.loadNpmTasks('assemble');
  grunt.initConfig({
    assemble: {
      site: { // target name
        options: {
          data: ['config.yml'] // data files
        },
        files: [
          {
            src: 'src/pages/1.hbs', // source file
            dest: 'dest/1.html' // compile to
          }
        ]
      }
    }
  });
  grunt.registerTask('default', ['assemble']);
};

module.exports = function(grunt) {
  grunt.task.loadNpmTasks('assemble');
  grunt.initConfig({
    assemble: {
      site: {
        options: {
          data: ['config.yml']
        },
        files: [
          { src: 'src/pages/1.hbs', dest: 'dest/1.html' },
          { src: 'src/pages/2.hbs', dest: 'dest/2.html' },
          { src: 'src/pages/3.hbs', dest: 'dest/3.html' }
        ]
      }
    }
  });
  grunt.registerTask('default', ['assemble']);
};

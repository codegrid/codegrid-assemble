module.exports = function(grunt) {

  var _ = grunt.util._;
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('assemble');

  // create assemble config

  var assembleconf_files = [{
    expand: true,
    cwd: 'src/assemble/pages/',
    src: '**/*.hbs',
    dest: 'dest/'
  }];
  var assembleconf_options_common = {
    layout: 'src/assemble/layouts/default.hbs',
    assets: 'dest/assets',
    partials: 'src/assemble/partials/**/*.hbs'
  };
  var assembleconf_options_dev = _.extend({},
    assembleconf_options_common, {
    dev: true,
    production: false
  });
  var assembleconf_options_production = _.extend({},
    assembleconf_options_common, {
    dev: false,
    production: true
  });

  grunt.initConfig({

    /* standard compilings */

    assemble: {
      dev: {
        options: assembleconf_options_dev,
        files: assembleconf_files
      },
      production: {
        options: assembleconf_options_production,
        files: assembleconf_files
      }
    },

    copy: {
      imgs: {
        expand: true,
        cwd: 'src/assets/imgs',
        src: '**',
        dest: 'dest/assets/imgs'
      },
      js: {
        expand: true,
        cwd: 'src/assets/js',
        src: '**',
        dest: 'dest/assets/js'
      },
      css: {
        expand: true,
        cwd: 'src/assets/css',
        src: '**',
        dest: 'dest/assets/css'
      }
    },

    /* cleanup */

    clean: {
      dest: 'dest',
      imgs: '<%= copy.imgs.dest %>',
      js: '<%= copy.js.dest %>',
      css: '<%= copy.css.dest %>'
    },

    /* for performance */

    htmlmin: {
      all: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        expand: true,
        cwd: 'dest',
        src: ['**/*.html'],
        dest: 'dest/'
      }
    },

    imagemin: {
      imgs: {
        files: [{
          expand: true,
          cwd: 'src/assets/imgs',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dest/assets/imgs'
        }]
      }
    },

    cssmin: {
      all: {
        expand: true,
        cwd: 'src/assets/css',
        src: ['*.css'],
        dest: 'dest/assets/css/',
        ext: '.min.css'
      }
    },

    uglify: {
      library_a: {
        src: 'src/assets/js/library-a.js',
        dest: 'dest/assets/js/library-a.min.js'
      },
      library_b: {
        src: 'src/assets/js/library-b.js',
        dest: 'dest/assets/js/library-b.min.js'
      }
    },

    /* watch */

    watch: {
      js: {
        files: ['src/assets/js/**/*.js'],
        tasks: ['clean:js', 'copy:js']
      },
      css: {
        files: ['src/assets/css/**/*.css'],
        tasks: ['clean:css', 'copy:css']
      },
      imgs: {
        files: ['src/assets/imgs/**'],
        tasks: ['clean:imgs', 'copy:imgs']
      },
      assemble: {
        files: ['src/assemble/**'],
        tasks: ['assemble:dev']
      }
    }

  });

  // define tasks

  grunt.registerTask('build:dev', [
    'clean',
    'assemble:dev',
    'copy'
  ]);
  grunt.registerTask('build:production', [
    'clean',
    'assemble:production',
    'copy:js',
    'copy:css',
    'imagemin',
    'htmlmin',
    'cssmin',
    'uglify'
  ]);
  grunt.registerTask('default', ['build:dev']);
  
};

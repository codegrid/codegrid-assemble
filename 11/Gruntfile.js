module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('assemble');

  /* assembleのコンフィグとして指定する値を用意 */

  var _ = grunt.util._;
  var assembleconf_files = [{
    expand: true,
    cwd: 'src/assemble/pages/',
    src: '**/*.hbs',
    dest: 'dest/'
  }];
  var assembleconf_options_common = {
    layout: 'src/assemble/layouts/default.hbs',
    assets: 'dest/assets/',
    partials: 'src/assemble/partials/**/*.hbs'
  };
  var assembleconf_options_dev = _.extend(
    {},
    assembleconf_options_common,
    { dev: true, production: false }
  );
  var assembleconf_options_production = _.extend(
    {},
    assembleconf_options_common,
    { dev: false, production: true }
  );

  grunt.initConfig({

    /* assemble */

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

    /* コピー */

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

    /* ファイル／ディレクトリ削除 */

    clean: {
      dest: 'dest',
      imgs: '<%= copy.imgs.dest %>',
      js: '<%= copy.js.dest %>',
      css: '<%= copy.css.dest %>'
    },

    /* 画像容量削減 */

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

    /* HTML minify */

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

    /* CSS minify */

    cssmin: {
      all: {
        expand: true,
        cwd: 'src/assets/css/',
        src: ['*.css'],
        dest: 'dest/assets/css/',
        ext: '.min.css'
      }
    },

    /* JavaScript minify */

    uglify: {
      all: {
        expand: true,
        cwd: 'src/assets/js/',
        src: ['*.js'],
        dest: 'dest/assets/js/',
        ext: '.min.js'
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

  /* タスク定義 */

  grunt.registerTask('build:dev', [
    'clean:dest',
    'assemble:dev',
    'copy'
  ]);
  grunt.registerTask('build:production', [
    'clean:dest',
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

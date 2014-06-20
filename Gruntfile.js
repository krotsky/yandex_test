module.Exports = function(grunt) {
  grunt.initConfig({
    watch: {
      options: {
        livereload: true
      },
      scripts: {

      }
    },
    concat: {
      dist: {
        src: [
          'js/*.js',
          'js/collections/*.js',
          'js/models/*.js',
          'js/routers/*.js',
          'js/views/*.js'
        ],
        dest: 'dist/js/all.js'
      }
    },
    uglify: {
      dist: {
        options: {
          banner: '/* by Krotsky for Yandex :) | 2014 */\n'
        },
        files: {
          'dist/all.min.js': ['dist/all.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('process', ['concat', 'uglify']);
  grunt.registerTask('default', ['concat', 'uglify', 'watch']);
};
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      sass: {
        files: ['public/**/*.{scss,sass}', 'sass/_partials/**/*.{scss,sass}'],
        tasks: ['compass']
      }
    },
    sass: {
      dist: {
        files: {
          'public/css/styles.css': 'public/sass/styles.scss'
        }
      }
    },
    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['compass:dist', 'watch']);
  grunt.registerTask('compass', ['compass:dist'])
};
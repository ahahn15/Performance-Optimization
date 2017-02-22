var mozjpeg = require('imagemin-mozjpeg');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*!<%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      my_target: {
        files: {
          'dist/js/perfmatters.min.js': ['src/js/perfmatters.js'],
          'dist/views/js/main.min.js': ['src/views/js/main.js']
        }
      }
    },
    imagemin: {
      static: {
        options: {
          optimizationLevel: 3,
          svgoPlugins: [{ removeViewBox: false }]
        },
        files: {
          'dist/views/images/pizza.png': 'src/views/images/pizza.png',
          'dist/views/images/pizzeria.jpg': 'src/views/images/pizzeria.jpg'
        }
      },
      dynamic: {
        files: [{
          expand: true,
          cwd: 'src/img/',
          src: ['**/*.{png,jpg}'],
          dest: 'dist/img/'
        }]
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'src/css',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css',
          ext: '.min.css'
        }]
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);
  grunt.registerTask('default', ['imagemin']);
  grunt.registerTask('default', ['cssmin']);

};
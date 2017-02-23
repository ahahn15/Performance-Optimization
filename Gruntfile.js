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
          'dist/js/perfmatters.js': ['src/js/perfmatters.js'],
          'dist/views/js/main.js': ['src/views/js/main.js']
        }
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'src/img/',
          src: ['*.{png,jpg}'],
          dest: 'dist/img/'
        },
        {
          expand: true,
          cwd: 'src/views/images/',
          src: ['*.{png,jpg}'],
          dest: 'dist/views/images/'
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
          ext: '.css'
        },
        {
          expand: true,
          cwd: 'src/',
          src: ['views/css/*.css', '!*.min.css'],
          dest: 'dist/',
          ext: '.css'
        }]
      }
    },
    htmlmin: {
    dist: {
      options: {
        removeComments: true,
        collapseWhitespace: true
      },
      files: {
        'dist/index.html': 'src/index.html',
        'dist/views/pizza.html': 'src/views/pizza.html'
      }
    }
  }
});

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  // Default task(s).
  grunt.registerTask('default', ['uglify','imagemin','htmlmin']);

};
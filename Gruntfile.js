module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	
 babel: {
        options: {
            "sourceMap": true,
			  presets: ['@babel/preset-env']
        },
        dist: {
            files: [{
                "expand": true,
                "cwd": "src/js",
                "src": ["**/*.js"],
                "dest": "src/js-compiled/",
                "ext": "-compiled.js"
            }]
        }
    },
    uglify: {
        all_src : {
            options : {
              sourceMap : true,
              sourceMapName : 'src/build/sourceMap.map'
            },
            src : 'src/js-compiled/**/*-compiled.js',
            dest : 'src/build/app.js'
        }
    }
  });

  grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask("default", ["babel", "uglify"]);
};

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),    
		grunticon: {
			// required config
			src: "static/sources/icons/",
			dest: "static/",

			// optional grunticon config properties

			// CSS filenames
			datasvgcss: "icons.data.svg.css",
			datapngcss: "icons.data.png.css",
			urlpngcss: "icons.fallback.css",

			// preview HTML filename
			previewhtml: "preview.html",

			// grunticon loader code snippet filename
			loadersnippet: "grunticon.loader.txt",

			// folder name (within dest) for png output
			pngfolder: "images/",

			// prefix for CSS classnames
			cssprefix: "icon-",

			// css file path prefix - this defaults to "/" and will be placed before the "dest" path when stylesheets are loaded.
			// This allows root-relative referencing of the CSS. If you don't want a prefix path, set to to ""
			cssbasepath: "/static/css/"
		}
	});

	// Load local tasks.
  grunt.loadNpmTasks('grunt-grunticon');

	// Default task.
	grunt.registerTask('default', ['grunticon']);

};

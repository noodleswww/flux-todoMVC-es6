 module.exports = function (grunt) {
        grunt.initConfig({
            browserify: {
                dist: {
                    options: {
                        transform: [
                            ["babelify", {
                                loose: "all"
                            }],
                            "reactify",
                            "envify"
                        ]
                    },
                    files: {
                        "./js/bundle.js": ["./js/app.js"]
                    }
                }
            },
            watch: {
                scripts: {
                    files: ["./js/**/*.js"],
                    tasks: ["browserify"]
                }
            }
        });

        grunt.loadNpmTasks("grunt-browserify");
        grunt.loadNpmTasks("grunt-contrib-watch");

        grunt.registerTask("default", ["watch"]);
        grunt.registerTask("build", ["browserify"]);
    };
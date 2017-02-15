module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: {
                options: {
                    force: true
                },
                src: ["dist"]
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: "",
                        src: ['**', "!**/*.js"],
                        dest: 'dist'
                    }
                ]
            }
        },
        requirejs: {
            compile: {
                options: {
                    appDir: "scripts/",
                    baseUrl: ".",
                    dir: "dist/",
                    optimize: "uglify",
                    mainConfigFile: "scripts/config.js",
                    modules: [
                        { name: "main" }
                    ]
                }
            }
        },
        concat: {
            options: {
                separator: ";"
            },
            dist: {
                src: ['dist/**/*.js'],
                dest: "main.js"
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-requirejs");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.registerTask('concat', ['concat']);
    grunt.registerTask('build', ['clean', 'copy', 'requirejs']);
};
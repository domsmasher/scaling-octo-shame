module.exports = function(grunt) {
    'use strict';

    var path = require('path'),
        basePath = path.normalize(__dirname),
        name,
        bannerContent,
        devRelease,
        minRelease;

    name = '<%= pkg.name %>';
    bannerContent = '/*! <%= pkg.name %> v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */ \n';
    devRelease = 'js/'+name+'.js';
    minRelease = 'js/'+name+'.min.js';


    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        paths: {
            theme: basePath,
            //where to store built files
            js: '<%= paths.theme %>/public/js',
            //css
            css: '<%= paths.theme %>/public/css',
            //stylus
            stylus: '<%= paths.theme %>/stylus'
        },
        concat: {
            options: {
                banner: bannerContent
            },
            target: {
                dest: devRelease,
                src: []
            }
        },
        uglify:{
            options: {
                banner: bannerContent
            },
            target: {
                dest: minRelease,
                src: devRelease
            }
        },
        jshint: {
            options: {
                latedef: true, // require variables definition before usage
                noarg: true, //  prohibit deprecated arguments.caller and arguments.callee
                nonew: true, // prohibit use of constructor functions for side-effects
                undef: true, // prohibit use of undeclared variables
                unused: true, // prohibit unused variables
                trailing: true, // warn about trailing whitespaces in your code
                eqeqeq: true, // prohibits use of == and != in favor of === and !==
                globals: {
                    jQuery: true,
                    metro: true
                }
            },
            target: {
                src: ['js/**/*.js', 'js/tests/**/*.js']
            }
        },
        csslint: {
            strict: {
                options: {
                    import: 2
                },
                src: ['<%= paths.css %>/**/*.css']
            }
        },
        copy: {
            development: {
                src: devRelease,
                dest: devRelease
            },
            minified: {
                src: minRelease,
                dest: minRelease
            }
        },
        stylus: {
            compile: {
                options: {
                    compress: false,
                    paths: ['path/to/import', 'another/to/import'],
                    linenos: false,
                    urlfunc: 'embedurl', // use embedurl('test.png') in our code to trigger Data URI embedding
                    use: [
                        require('nib') // use stylus plugin at compile time
                    ],
                    import: [    //  @import 'foo', 'bar/moo', etc. into every .styl file
                        //'foo',       //  that is compiled. These might be findable based on values you gave
                        'nib'    //  to `paths`, or a plugin you added under `use`
                    ]
                },
                files: {
                    '<%= paths.css %>/style.css': ['<%= paths.stylus %>/index.styl'] // compile and concat into single file
                }
            }
        },
        watch: {
            options: {
                livereload: true
            }/*,
            js: {
                files: '<%= concat.target.src %>',
                tasks: ['lint', 'min']
            },
            css: {
                files: '<%= csslint.strict.src %>',
                tasks: ['csslint']
            }*/,
            stylus: {
                files: '<%= paths.stylus %>/*.styl',
                tasks: ['stylus']
            }
        }
    });

    [
        'grunt-contrib-clean',
        'grunt-contrib-watch',
        'grunt-contrib-concat',
        'grunt-contrib-uglify',
        'grunt-contrib-jshint',
        'grunt-contrib-csslint',
        'grunt-contrib-copy',
        'grunt-contrib-stylus'
    ].forEach(grunt.loadNpmTasks);

    grunt.registerTask('default', 'watch');

    grunt.registerTask('lint', 'Tasks for linting javascript and css files', function () {
        var tasks = ['jshint', 'csslint'];

        grunt.option('force', true);
        grunt.task.run(tasks);
    });

    grunt.registerTask('min', 'Tasks for the concatenation and minification of javascript files', function () {
        var tasks = ['concat', 'uglify'];

        grunt.option('force', true);
        grunt.task.run(tasks);
    });

    grunt.registerTask('test', 'Tasks for the concatenation and minification of javascript files', function () {
        console.log(basePath);
    });
};

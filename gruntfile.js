module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        clean: {
            'all': [
                'built/**/*',
            ]
        },
        ts: {
            options: {
                target: 'es3',
                compiler: 'node_modules/typescript/bin/tsc.js',
                declaration: false,
                module: 'amd',
                removeComments: true,
            },
            'all': {
                sourceMap: false,
                outDir: 'assets/scripts',
                src: ['scripts/*.ts', 'typings/*.ts']
            },
        },
        less: {
            all: {
                files: {
                    "assets/styles/main.css": "styles/main.less"
                }
            }
        },
        copy: {
            'assets': {
                files: [{
                    expand: true,
                    cwd: 'assets/',
                    src: ['**/*'],
                    dest: 'built'
                }]
            }
        },
        assemble: {
            options: {
                flatten: true,
                assets: 'built/assets',
                layout: 'default.hbs',
                layoutdir: 'layouts',
                helpers: 'helpers/*.js',
                partials: 'partials/*.hbs',
                data: 'data/*.{json,yml}'
            },
            'all': {
                files: {
                    'built/': ['pages/*.hbs']
                }
            }
        },
        watch: {
            // recompiles less files whenever a change to a less file is done
            'less': {
                files: ['styles/*.less'],
                tasks: ['less:all'],
                options: {
                    debounceDelay: 100,
                }
            },
            'html': {
                files: ['layout/*.hbs', 'pages/*.hbs', 'partials/*.hbs'],
                tasks: ['assemble:all'],
                options: {
                    debounceDelay: 100,
                }
            }
        },
        buildGhPages: {
            ghPages: { /* all default */ }
        }
    });

    grunt.registerTask(
        'default', [
            'clean:all',
            'ts:all',
            'less:all',
            'copy:assets',
            'assemble:all'
        ]
    )
    grunt.registerTask(
        'quick', [
            'ts:all',
            'less:all',
            'assemble:all'
        ]
    );
    grunt.registerTask(
        'publish', [
            'default',
            'buildGhPages'
        ]
    );
};
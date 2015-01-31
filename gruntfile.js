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
                'built/**/*', '!built/.git/**/*'
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
                outDir: 'built/scripts',
                src: ['scripts/*.ts', 'typings/*.ts']
            },
        },
        less: {
            all: {
                files: {
                    "built/styles/main.css": "styles/main.less"
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
        'if-changed': {
            options: {
                then: 'less'
            }
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
            'default'
        ]
    );

    grunt.registerTask(
        'if-changed', function () {
            var options = this.options({
                local: 'master',
                remote: 'origin/master'
            });
            if (!options.then) { return grunt.fail.fatal('A taret to be run if changes are detected has to be specified as `then` parameter in options.'); }

            var done = this.async();
            grunt.util.spawn({
                cmd: 'git',
                args: 'fetch -q'.split(' ')
            }, function doneFunction(error, result, code) {
                if (error) { return grunt.fail.fatal(error); }
                grunt.util.spawn({
                    cmd: 'git',
                    args: ('diff --shortstat ' + options.local + ' ' + options.remote).split(' ')
                },
                function doneFunction(error, result, code) {
                    if (error) { return grunt.fail.fatal(error); }
                    // result has: .stdout, .stderr, .code
                    console.log(result.code);
                    console.log('_' + String(result) + '_');
                    var changes = String(result);
                    if (changes) {
                        console.info('Changes detected: ' + changes);
                        grunt.task.run(options.then);
                    }
                    done();
                });
            });
        }
    );

    grunt.registerTask(
        'update', function () {
            var options = this.options({
                local: 'master',
                remote: 'origin/master'
            });
            var done = this.async();
            grunt.util.spawn({
                cmd: 'git',
                args: 'pull --rebase'.split(' ')
            }, function doneFunction(error, result, code) {
                if (error) { return grunt.fail.fatal(error); }
                done();
            });
        }
    );
};
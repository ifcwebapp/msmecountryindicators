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
        'pull-or-clone': {
            options: {
                repository: 'https://github.com/ifcwebapp/msmecountryindicators.git',
                dest: '../gh-pages',
                branch: 'gh-pahes'
            }
        }
    });

    grunt.registerTask(
        'default', ['build']
    );

    grunt.registerTask(
        'build', [
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
        'build-if-remote-changed', [
            'if-remote-changed:pull:build'
        ]
    );

    grunt.registerTask(
        'if-remote-changed', function () {
            var run = runOver(grunt);
            var options = this.options({
                local: 'master',
                remote: 'origin/master'
            });
            var then = options.then || this.args;
            if (!then || !then.length) { return grunt.fail.fatal('A taret to be run if changes are detected has to be specified as `then` parameter in options or as an argument in the target name `if-changed:then-do-this:then-do-that`.'); }

            var done = this.async();
            run('git fetch', function (result) {
                run('git diff --shortstat ' + options.local + ' ' + options.remote, function (result) {
                    var changes = String(result);
                    if (changes) {
                        grunt.log.writeln('Changes detected: ' + changes);
                        grunt.log.writeln('Next running: ' + String(then).split(',').join(', '));
                        grunt.task.run(then);
                    } else {
                        grunt.log.writeln('No changes detected.');
                    }
                    done();
                });
            });
        }
    );

    grunt.registerTask(
        'pull', function () {
            var run = runOver(grunt);
            var done = this.async();
            grunt.verbose.writeln('Fetching.');
            run('git fetch', function (result) {
                grunt.verbose.writeln(String(result));
                grunt.verbose.writeln('Checking out master.');
                run('git checkout master', function (result) {
                    grunt.verbose.writeln(String(result));
                    grunt.verbose.writeln('Pulling.');
                    run('git pull --rebase', function (result) {
                        grunt.log.writeln('Pulled: ' + String(result));
                        done();
                    });
                });
            });
        }
    );

    grunt.registerTask(
        'pull-or-clone', function () {
            var run = runOver(grunt);
            var options = this.options({ branch: 'master' });
            var repository = options.repository;
            if (!repository) { grunt.fail.fatal('The `repository` parameter with a URL of a git repository is missing in options.'); }
            var dest = options.dest;
            if (!dest) { grunt.fail.fatal('The `dest` parameter with a root folder for a cloned repository is missing in options.'); }
            var branch = options.branch;

            var done = this.async();
            if (grunt.file.exists(dest)) {
                // pulling
                grunt.verbose.writeln('Fetching to: ' + dest);
                run('git fetch', function (result) {
                    grunt.verbose.writeln(String(result));
                    grunt.verbose.writeln('Checking out: ' + branch);
                    run('git checkout ' + branch, function (result) {
                        grunt.verbose.writeln(String(result));
                        run('git pull --rebase', function (result) {
                            grunt.log.writeln('A local repository at `' + dest + '` has been updated from the remote.');
                            grunt.log.writeln(String(result));
                            done();
                        }, dest);
                    }, dest);
                }, dest);
            } else {
                // clonning
                grunt.verbose.writeln('Cloning a repository from ' + repository + ' to: ' + dest);
                run('git clone ' + repository + ' ' + dest, function (result) {
                    grunt.verbose.writeln(String(result));
                    grunt.verbose.writeln('Checking out: ' + branch);
                    run('git checkout ' + branch, function (result) {
                        grunt.log.writeln('A repository from ' + repository + ' has been cloned to: ' + dest);
                        grunt.log.writeln(String(result));
                        done();
                    }, dest);
                });
            }
        }
    );
};

function runOver(grunt) {
    return function run(command, then, cwd) {
        var parts = command.split(' ');
        grunt.util.spawn({
            cmd: parts[0],
            args: parts.slice(1),
            opts: { cwd: cwd }
        }, function doneFunction(error, result, code) {
            if (error) { return grunt.fail.fatal(error); }
            then(result);
        });
    }
}
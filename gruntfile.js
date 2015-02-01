module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    var destFolder = '../gh-pages';

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
            },
            'distributive': {
                files: [{
                    expand: true,
                    cwd: 'built/',
                    src: ['**/*'],
                    dest: destFolder
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
        'pull': {
            'for-gh-pages': {
                options: {
                    dest: destFolder,
                    branch: 'gh-pages'
                }
            },
            'for-master': {
                options: {
                    dest: './',
                    branch: 'master'
                }
            }
        },
        'pull-or-clone': {
            'for-gh-pages': {
                options: {
                    repository: 'https://github.com/ifcwebapp/msmecountryindicators.git',
                    dest: destFolder,
                    branch: 'gh-pages',
                    pull: 'for-gh-pages'
                }
            }
        },
        'deploy': {
            'gh-pages': {
                options: {
                    dest: destFolder,
                    branch: 'gh-pages'
                }
            }
        },
        'if-remote-changed': {
            'for-publish-latest': {
                options: {
                    local: 'master',
                    remote: 'origin/master',
                    dest: './',
                    then: 'publish-latest'
                }
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
        'quick-build', [
            'ts:all',
            'less:all',
            'assemble:all'
        ]
    );
    grunt.registerTask(
        'publish', [
            'pull-or-clone:for-gh-pages', 'build', 'copy:distributive', 'deploy'
        ]
    );
    grunt.registerTask(
        'dry-run', [
            'pull-or-clone:for-gh-pages', 'build', 'copy:distributive'
        ]
    );
    grunt.registerTask(
        'build-latest', [
            'pull:for-master', 'build'
        ]
    );
    grunt.registerTask(
        'publish-lastest', [
            'pull:for-master', 'publish'
        ]
    );
    grunt.registerTask(
        'auto-publish-latest', [
            'if-remote-changed:for-publish-latest'
        ]
    );

    grunt.registerTask(
        'if-remote-changed', function () {
            var run = runOver(grunt);
            var options = this.options({}) ;
            var local = toParameter(options, 'local', 'the name of a local branch');
            var remote = toParameter(options, 'remote', 'the name of a remote branch');
            var then = toParameter(options, 'then', 'the name of a target to be run if any changes detected');
            var dest = toParameter(options, 'dest', 'a root folder to pull to');

            var done = this.async();
            run('git fetch', function (result) {
                run('git diff --shortstat ' + local + ' ' + remote, function (result) {
                    var changes = String(result);
                    if (changes) {
                        grunt.log.writeln('Changes detected: ' + changes);
                        grunt.log.writeln('Next running: ' + String(then).split(',').join(', '));
                        grunt.task.run(then);
                    } else {
                        grunt.log.writeln('No changes detected.');
                    }
                    done();
                }, dest);
            }, dest);
        }
    );

    grunt.registerMultiTask(
        'pull', function () {
            debugger;
            var run = runOver(grunt);

            var options = this.options({});
            var dest = toParameter(options, 'dest', 'a root folder to pull to');
            var branch = toParameter(options, 'branch', 'a name of the branch to be pulled');

            var done = this.async();
            grunt.verbose.writeln('Fetching.');
            run('git fetch', function (result) {
                grunt.verbose.writeln(String(result));
                grunt.verbose.writeln('Checking out: ' + branch);
                run('git checkout ' + branch, function (result) {
                    grunt.verbose.writeln(String(result));
                    run('git pull --rebase', function (result) {
                        grunt.log.writeln(String(result));
                        done();
                    }, dest);
                }, dest);
            }, dest);
        }
    );

    grunt.registerMultiTask(
        'pull-or-clone', function () {
            var run = runOver(grunt);

            var options = this.options({});
            var dest = toParameter(options, 'dest', 'a root folder to clone or pull to');
            var repository = toParameter(options, 'repository', 'a URL of a git repository');
            var branch = toParameter(options, 'branch', 'a name of the branch to be cloned or pulled');

            var done = this.async();
            if (grunt.file.exists(dest)) {
                // pulling
                var target = toParameter(options, 'pull', 'a target of the `pull` task');
                grunt.task.run('pull:' + target);
                done();
            } else {
                // clonning
                grunt.verbose.writeln('Cloning a repository from ' + repository + ' to: ' + dest);
                run('git clone ' + repository + ' ' + dest, function (result) {
                    grunt.verbose.writeln(String(result));
                    grunt.verbose.writeln('Checking out: ' + branch);
                    run('git checkout ' + branch, function (result) {
                        grunt.log.writeln(String(result));
                        done();
                    }, dest);
                });
            }
        }
    );

    grunt.registerMultiTask('deploy', function () {
        var run = runOver(grunt);
        var options = this.options({});
        var dest = toParameter(options, 'dest', 'a root folder to clone or pull to');
        var branch = toParameter(options, 'branch', 'a name of the branch to be cloned or pulled');

        var done = this.async();
        grunt.verbose.writeln('Checking out: ' + branch);
        run('git checkout ' + branch, function (result) {
            grunt.verbose.writeln('Staging.');
            run('git add -all', function (result) {
                grunt.verbose.writeln(String(result));
                grunt.verbose.writeln('Commiting.');
                run('git commit -a -m', function (result) {
                    grunt.verbose.writeln(String(result));
                    grunt.verbose.writeln('Pushing.');
                    run('git push', function (result) {
                        grunt.log.writeln(String(result));
                        done();
                    }, dest);
                }, dest);
            }, dest);
        }, dest);
    });
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
            else { then(result); }
        });
    }
}

function toParameter(options, name, description) {
    var result = options[name];
    if (!result) { grunt.fail.fatal('The `' + name + '` parameter with ' + description + ' is missing in options.'); }
    return result;
}
var grunt = require('grunt');

var destFolder = '../gh-pages.js';

grunt.initConfig({
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
    }
});

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

grunt.tasks(['pull:for-master']);

function toParameter(options, name, description) {
    var result = options[name];
    if (!result) { grunt.fail.fatal('The `' + name + '` parameter with ' + description + ' is missing in options.'); }
    return result;
}
var grunt = require('grunt');

var destFolder = '../gh-pages.js';

grunt.initConfig({
    'deploy': {
        'gh-pages': {
        options: {
            dest: destFolder,
            branch: 'gh-pages'
        }}
    }
});

grunt.registerMultiTask('deploy', function () {
    
    debugger;

    var run = runOver(grunt);
    var options = this.options({});
    var dest = toParameter(options, 'dest', 'a root folder to clone or pull to');
    var branch = toParameter(options, 'branch', 'a name of the branch to be cloned or pulled');
console.log(1);
    var done = this.async();
console.log(2);
    grunt.verbose.writeln('Checking out: ' + branch);
console.log(3);
    run('git checkout ' + branch, function (result) {
console.log(4);
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


grunt.tasks(['deploy:gh-pages']);

function toParameter(options, name, description) {
    var result = options[name];
    if (!result) { grunt.fail.fatal('The `' + name + '` parameter with ' + description + ' is missing in options.'); }
    return result;
}
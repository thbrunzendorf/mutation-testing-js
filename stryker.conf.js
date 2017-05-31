module.exports = function(config){
    config.set({
        files: [
            { pattern: 'src/**/*.js', mutated: true, included: false},
            'test/**/*.js'
        ],
        testRunner: 'mocha',
        testFramework: 'mocha',
        coverageAnalysis: 'perTest',
        reporter: ['html', 'progress'],
    });
}

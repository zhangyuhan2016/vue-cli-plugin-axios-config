// generator/index.js
module.exports = (api, options, rootOptions) => {
    api.extendPackage({
        dependencies: {
            'axios': '^0.18.0'
        },
    });
    api.render({
        './src/api/config.js': './templates/src/api/config.js'
    })
    if (options.import === 'yes') {
        api.render({
            './src/api/getData.js': './templates/src/api/getData.js'
        })
    };
    api.onCreateComplete(() => {});
}

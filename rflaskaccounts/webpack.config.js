const path = require('path');

module.exports = {
    entry: {
        transactions: path.resolve(__dirname, 'views/transactions/transactions.jsx'), 
    },
    output: {
        path: path.resolve(__dirname, 'static/compiled'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    resolveLoader: {
        modules: [path.resolve(__dirname, 'node_modules')]
    },
    module: {
        rules: [
            {
                test: /\.jsx/,
                use: {
                    loader: 'babel-loader'
                  , options: {presets: ['react', 'es2015']}
                }
            }
        ]
    }
};
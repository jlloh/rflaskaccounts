const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        transactions: path.resolve(__dirname, 'views/transactions/transactions.jsx')
      , summary: path.resolve(__dirname, 'views/summary/summary.jsx') 
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
            },
            {
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/, 
            use: ['url-loader']
            },
            {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
            }
       ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })  
    ]
};
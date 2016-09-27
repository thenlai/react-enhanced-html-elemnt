var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        "webpack-dev-server/client?http://localhost:3000",
        "webpack/hot/only-dev-server",
        "./test.tsx"
    ],
    output: {
        path: __dirname,
        filename: "bundle.js",
        publicPath: "/static/"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],

    devtool: "source-map",

    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ["", ".js", ".ts", ".tsx", ".json", ".scss", ".css"]
    },

    module: {
        noParse: [],
        loaders: [
            {
                test: /\.ts(x?)$/,
                loader: "ts-loader"
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            },

            {
                test: /\.css$/,
                loader: "style-loader!css-loader!postcss-loader?minimize",
                include: path.join(__dirname, 'dev/styles')
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass?sourceMap',
                include: path.join(__dirname, 'dev/styles')
            },
            {
                test: /\.(jpg|png)$/,
                loader: "url-loader?limit=8192",
                include: path.join(__dirname, 'dev/images')
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            }
        ],
        preLoaders: [
            {
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },


    externals: {
        "jquery": "jQuery",
        "react": "React",
        "react-dom": "ReactDOM"
    }
};
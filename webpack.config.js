module.exports = {
    entry: "./index.js",

    output: {
        path: './',
        filename: "build.js"
    },
    test: /\.css$/,
    loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
}
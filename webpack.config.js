const path = require('path');

module.exports = {
    entry: './src/index.js',  // Adjust this according to your entry file
    output: {
        path: path.resolve(__dirname, 'dist'),  // Adjust output path if needed
        filename: 'bundle.js',  // Change to your desired output filename
    },
    resolve: {
        fallback: {
            "http": require.resolve("stream-http"),
            "https": require.resolve("https-browserify"),
            "stream": require.resolve("stream-browserify"),
            "util": require.resolve("util/"),
            "zlib": require.resolve("browserify-zlib"),
            "url": require.resolve("url/"),
            "assert": require.resolve("assert/"),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',  // If you're using Babel
                },
            },
        ],
    },
    mode: 'development',  // Change to 'production' for production builds
};

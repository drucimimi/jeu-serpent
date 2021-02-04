const path = require("path");

module.exports = {
    mode: 'development',
    entry: ["babel-polyfill","./src/script.js"],
    output:{
        path: path.resolve(__dirname, "docs"),
        filename: "bundle.js"
    },
    devServer: {
        contentBase: path.resolve(__dirname, "docs"),
        open: true
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:{
                    loader: "babel-loader",
                    options:{
                        presets: ["env"]
                    }
                }
            }
        ]
    }
}
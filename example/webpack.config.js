const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: path.join(__dirname),
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "/"
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: "styles",
                    test: /\.css$/,
                    chunks: "all",
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /^(?!.*test\.tsx|\.ts?$).*\.tsx|\.ts?$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.css/,
                exclude: /node_modules/,
                use: [
                    "style-loader",
                    "css-loader",
                ]
            },
        ]
    },
    resolve: {
        extensions: [".js", ".tsx", ".css", ".ts", ".jsx"],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        port: 3000,
        open: true,
        host: "localhost",
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: "example/index.html",
            filename: "index.html"
        }),

    ]
};
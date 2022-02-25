const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode =
    process.env.NODE_ENV === "production" ? "production" : "development";

module.exports = {
    mode,
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, "dist"),

        clean: true,
    },

    module: {
        rules: [
            {
                test: /\.s?css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            function() {
                                                return [
                                                    require("autoprefixer"),
                                                ];
                                            },
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    "sass-loader",
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            ["@babel/preset-react", { runtime: "automatic" }],
                        ],
                    },
                },
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: ["@svgr/webpack"],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "./css/[name].css" }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            favicon: "./src/favicon.ico",
        }),
    ],
    devtool: "source-map",
    devServer: {
        static: "./dist",
        hot: true,
    },
};

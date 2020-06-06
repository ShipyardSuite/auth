const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const path = require("path");

const smp = new SpeedMeasurePlugin();
const serviceName = process.env.SERVICE_NAME;

module.exports = () => {
    return smp.wrap({
        context: __dirname,
        mode: "production",
        name: "client",
        node: false,
        entry: [
            path.join(__dirname, "src/client/index.js")
        ],
        output: {
            path: path.join(__dirname, "/dist/client"),
            filename: "bundle.js",
            publicPath: `/${serviceName}/public/`
        },
        module: {
            rules: [
                {
                    test: /\.js(x?)$/,
                    exclude: /node_modules/,
                    use: [
                        "babel-loader"
                    ]
                },
                {
                    test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
                    use: "file-loader",
                },
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: [
                        { loader: "style-loader" },
                        { loader: "css-loader" }
                    ]
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        "style-loader",
                        "css-loader",
                        {
                            loader: "sass-loader",
                            options: {
                                implementation: require("sass"),
                            },
                        },
                    ],
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: "html-loader"
                        }
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: "./src/client/index.html",
                filename: "./index.html"
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: "src/client/images",
                        to: "images"
                    },
                ],
            }),
            new Dotenv()
        ]
    });
};

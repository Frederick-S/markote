const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const entryPath = './markote/static/src'
const distPath = './markote/static/dist'

module.exports = {
    entry: `${entryPath}/app`,
    output: {
        filename: '[name].[contenthash].js',
        path: path.join(__dirname, distPath)
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([distPath]),
        new CopyWebpackPlugin([
            {
                from: './markote/static/images',
                to: 'images'
            }
        ]),
        new HtmlWebpackPlugin({
            filename: 'notes.html',
            template: './markote/static/public/notes.pug'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            filename: 'logout.html',
            template: './markote/static/public/logout.pug'
        }),
        new VueLoaderPlugin()
    ],
    devtool: 'source-map',
    mode: 'development'
}
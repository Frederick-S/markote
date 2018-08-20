const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const entries = require('./webpack-entries')
const entryPath = './markote/static/src'
const distPath = './markote/static/dist'

const entry = entries.reduce((accumulator, current) => {
    accumulator[current] = `${entryPath}/${current}`

    return accumulator
}, {})

module.exports = {
    entry,
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
        new HtmlWebpackPlugin({
            filename: 'notes.html',
            template: './markote/static/public/notes.pug'
        }),
        new VueLoaderPlugin()
    ],
    devtool: 'source-map',
    mode: 'development'
}
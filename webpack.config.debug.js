const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const entries = require('./webpack-entries')
const entryPath = './onemark/static/js/src'
const distPath = './onemark/static/js/dist'

const entry = entries.reduce((accumulator, current) => {
    accumulator[current] = `${entryPath}/${current}`

    return accumulator
}, {})

module.exports = {
    entry,
    output: {
        filename: '[name].js',
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
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    devtool: 'source-map',
    mode: 'development'
}
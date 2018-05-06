const path = require('path')
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
        extensions: ['.ts']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    },
    devtool: 'source-map',
    mode: 'development'
}
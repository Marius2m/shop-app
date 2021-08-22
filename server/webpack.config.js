const path = require('path')
const webpack = require('webpack')
const NodemonWebpackPlugin = require('nodemon-webpack-plugin')

const SRC_PATH = path.resolve(__dirname, 'src')
const DIST_PATH = path.resolve(__dirname, 'dist')

function getPlugins(env) {
	const DevelopmentPlugins = []
	const SERVER_ENV = env.SERVER_ENV || 'development'

	if (SERVER_ENV === 'development') {
		DevelopmentPlugins.push(
            new NodemonWebpackPlugin({
                script: path.join(DIST_PATH, 'bundle.js'),
                watch: DIST_PATH,
                nodeArgs: ['--inspect=' + 14000],
            })
        )

        DevelopmentPlugins.push(new webpack.ProgressPlugin())
	}

    return DevelopmentPlugins 
}

module.exports = env => {
    return {
        mode: env.SERVER_ENV === 'production' ? 'production' : 'development',
        entry: './Server.ts',
        context: SRC_PATH,
        output: {
            path: DIST_PATH,
            filename: 'bundle.js',
            libraryTarget: 'commonjs',
        },

        target: 'node',

        node: {
            __dirname: false,
            __filename: false,
        },

        resolve: {
            alias: {
                '~': SRC_PATH,
            },
            extensions: [ '.ts', '.js', '.json' ],
        },

        module: {
            rules: [
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    loader: 'source-map-loader',
                    exclude: path.join(process.cwd(), 'node_modules'),
                },
                {
                    test: /\.ts$/,
                    loader: 'ts-loader',
                },
            ],
        },

        plugins: [...getPlugins(env)],

        devtool: env.SERVER_ENV === 'production' ? 'eval' : 'source-map',
    }
}

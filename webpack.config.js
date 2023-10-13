const PATH = require("path");

module.exports = {
	mode: "development", // Change if needed
	entry: PATH.join(__dirname, "src", "App.jsx"),
	output: {
		path: PATH.join(__dirname, "public"),
		filename: "bundle.js",
	},
	devtool: "inline-source-map",
	module: {
		rules: [
			{ test: /\.(js|jsx)$/,
				exclude: [
					PATH.join(__dirname, "node_modules"),
					PATH.join(__dirname, "server.js"),
				],
				use: {
					loader: "babel-loader",
					options: { // eqv. to babel.config.json
						"presets": [
							"@babel/preset-env",
							["@babel/preset-react",
								{ 
									"runtime": "automatic"
								}
							]
						],
						"comments": false,
					}
				},
			},
			{ test: /\.css$/,
				use: [
					"style-loader",
					"css-loader",
				]
			},
			{ test: /\.(png|jpeg|jpg|gif)/,
				type: "asset/resource"
			}
		]
	}
}

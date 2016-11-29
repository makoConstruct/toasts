exports.default = {
	"entry": "./toasts.ts",
	"output": {
		"library": "Toasts",
		"libraryTarget": "commonjs",
		"filename": "toasts.js"
	},
	"resolve": { "extensions": ["", ".webpack.js", ".web.js", ".ts", ".js"] },
	"module": { "loaders": [ { "test": /\.ts$/, "loader": "ts-loader" } ] }
}

//this build injects toasts.Toasts into `this` (window) for situations where you don't feel like using a module loader

exports.default = {
	"entry": "./toasts.ts",
	"output": {
		"library": "toasts",
		"libraryTarget": "this",
		"filename": "toasts-ambient.js"
	},
	"resolve": { "extensions": ["", ".webpack.js", ".web.js", ".ts", ".js"] },
	"module": { "loaders": [ { "test": /\.ts$/, "loader": "ts-loader" } ] },
	ts: {
		visualStudioErrorFormat:true
	}
}
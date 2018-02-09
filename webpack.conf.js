const path = require("path");

module.exports = {
	entry: "./src/main.js",
	output: {
		path: path.resolve(__dirname, "./static"),
		filename: "bundle.js",
		publicPath: "./static/",
	},
	module: {
    	rules: [
      { test: /\.js$/,
        exclude: /node_modules/,
        use: [
          "babel-loader"
        ]
      },
    	{
      	test: /\.css$/,
        use: [
           "style-loader",
           "css-loader"
        ]
      },
      {
      	test: /\.(png|svg|jpg|gif)$/,
      	use: [
      		"file-loader"
        ]
      }
     ]
   }
}
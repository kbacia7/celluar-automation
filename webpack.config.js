const path = require("path");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
   mode: 'development',
   entry: './src/main.ts',
   devtool: 'source-map',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js',
   },
   resolve: {
      extensions: [".ts", ".tsx", ".js"],
      plugins: [new TsconfigPathsPlugin({
         configFile: "src/tsconfig.json"
      })]
   },
   module: {
      rules: [
         {
            test: /\.tsx?$/,
            loader: "ts-loader",
            exclude: [
               /node_modules/,
            ]
         },
         {
            test: /\.less$/,
            use: [
               {
                  loader: 'style-loader', 
               },
               {
                  loader: 'css-loader', 
               },
               {
                  loader: 'less-loader', 
                  options: {
                     plugins: [],
                     paths: [] 
                  }
               },
            ],
         },
         {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
               'file-loader'
            ]
         }
      ],
   },
   plugins: [
      new HtmlWebpackPlugin({
         title: 'Basic celluar automation'
      })
   ]
};

module.exports = config


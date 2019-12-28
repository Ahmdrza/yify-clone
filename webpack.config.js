const path = require('path');
const HWP = require('html-webpack-plugin');
module.exports = {
   entry: path.join(__dirname, './src/index.js'),
   output: {
       filename: 'build.js',
       path: path.join(__dirname, './dist'),
       publicPath: '/'
    },
   module:{
       rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/, 
                loader: "style-loader!css-loader" 
            },
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                }, 
            }
        ],
   },
   devServer:{
    historyApiFallback: true
   },
   plugins:[
       new HWP(
          {template: path.join(__dirname,'./public/index.html')}
       )
   ]
}
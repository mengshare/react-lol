
'use strict';

var ExtractTextPlugin = require("extract-text-webpack-plugin");  //css单独打包
var globalPlugins = require('./global.js');
let webpack = require('webpack');

let config = {

    entry: {
       bundle: __dirname + '/src/entry.js',
       vendor: ['react']
    },
    output: {
        path: __dirname + '/build', //打包后的文件存放的地方
        publicPath: process.env.NODE_ENV == "production" ? 'build/' :'/build/',
        filename: 'bundle.js' //打包后输出文件的文件名
    },

    module: {
        loaders: [
            { test: /\.js$/, loader: "jsx!babel", include: /src/},
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css!postcss")},
            { test: /\.scss$/, loader: ExtractTextPlugin.extract("style", "css!postcss!sass")},
            { test: /\.(png|jpg|gif|svg)$/, loader: 'url?limit=8192'}
        ]
    },

    postcss: [
        require('autoprefixer')    //调用autoprefixer插件,css3自动补全
    ],

    devServer: {
        // contentBase: './src/views'  //本地服务器所加载的页面所在的目录
        port: 8888,
        colors: true,  //终端中输出结果为彩色
        historyApiFallback: true,  //不跳转
        inline: true  //实时刷新
    },

    plugins: [
        new ExtractTextPlugin('main.css'),
        new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js'),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        }),
        globalPlugins
    ]

}

if(process.env.NODE_ENV != "production" ){
  config.devtool = 'eval-source-map';
}

module.exports = config;

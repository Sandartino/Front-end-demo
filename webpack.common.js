const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');

module.exports = {
    entry: {
        app: './js/1.app.js',
        vendors: ["jquery", "bootstrap", "ScrollMagic", "gsap", "velocity-animate", "masonry-layout", "imagesloaded"]
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src', 'source:src', 'video:poster']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|gif|mp4|webm|ico|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]'
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            //Fix issue with snapsvg and webpack.
            // Require: imports-loader.
            // Use: import * as Snap from 'snapsvg';
            {
                test: require.resolve('snapsvg'),
                loader: 'imports-loader?this=>window,fix=>module.exports=0'
            }
        ]
    },
    resolve: {
        alias: {
            //required for ScrollMagic plugin gsap --> ~/animation.gsap.min.js
            'TweenMax': path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
            'TimelineMax': path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Bulgaria",
            template: './index.html',
            favicon: 'assets/img/favicon.ico'
        }),
        //required for inline svg sprite
        new HtmlWebpackInlineSVGPlugin({
            runPreEmit: true,
        }),
        new CleanWebpackPlugin(['dist']),
        //auto load on demand.It not provides globals
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            ScrollMagic: 'ScrollMagic',
            Popper: ['popper.js', 'default'],
            Masonry: "masonry-layout"
        }),
        //separate libs from app
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors'
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }

};
import path from "path"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import CopyPlugin from "copy-webpack-plugin"

export default {
  entry: {
    main: "./src/js/index.js",
  },
  output: {
    filename: "js/[name].js",
    path: path.resolve(process.cwd(), "./public"),
    assetModuleFilename: "images/[name][ext]"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env"
            ]
          }
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              sourceMap: true,
              url: true,
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ],
      },
      {
        test: /\.(jpg|jpeg|png|git|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(svg|eot|woff|woff2|ttf)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]"
        }
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "[id].css"
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "src/images",
          to: "images",
          noErrorOnMissing: true
        }
      ]
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(process.cwd(), "./src/templates/index.html")
    })
  ],
  devServer: {
    static: {
      directory: path.resolve(process.cwd(), "public")
    },
    watchFiles: [
      path.resolve(process.cwd(), "./src/templates/index.html")
    ],
    compress: true,
    port: process.env.PORT || 9090,
    hot: true,
  },
  performance: {
    hints: false
  }
};

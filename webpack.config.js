const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env) => {
  const rootFolder = "./src";
  const buildFolder = "./dist";

  const isProd = env.production;

  return {
    entry: path.resolve(__dirname, "./src/index.ts"),
    output: {
      chunkFilename: "[name].[contenthash].js",
      filename: "[name].[contenthash].js",
      assetModuleFilename: "[name].[contenthash][ext][query]",
      asyncChunks: true,
      path: path.resolve(__dirname, buildFolder),
      clean: true,
      publicPath: isProd ? "./" : "/",
    },
    devtool: "source-map",
    devServer: {
      static: {
        directory: path.join(__dirname, rootFolder),
      },
      historyApiFallback: {
        index: "/",
      },
      port: 3000,
    },
    plugins: [
      new HtmlWebpackPlugin({
        favicon: path.join(__dirname, rootFolder, "./assets/favicon.ico"),
        template: path.join(__dirname, rootFolder, "index.html"),
      }),
      new CopyPlugin({
        patterns: [
          { from: path.join(__dirname, rootFolder, "controls.html"), to: path.resolve(__dirname, buildFolder) },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          enforce: "pre",
          use: ["babel-loader", "source-map-loader"],
        },
      ],
    },
    resolve: {
      alias: {
        "src/*": path.resolve(__dirname, "./src/*"),
      },
      modules: [path.resolve("./node_modules"), path.resolve(__dirname)],
      extensions: [".*", ".js", ".ts", ".tsx"],
      fallback: {
        path: require.resolve("path-browserify")
      },
    },
    stats: {
      children: true,
      errorDetails: true,
    },
    optimization: {
      usedExports: isProd ? "global" : false,
      minimize: isProd,
      splitChunks: isProd
        ? {
            chunks: "async",
          }
        : undefined,
    },
  };
};

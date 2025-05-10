import CopyPlugin from "copy-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";
import webpack from "webpack";
import fs from "fs";
import path, { resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildDir = path.resolve(__dirname, "./build");
const publicDir = path.resolve(__dirname, "./public");
const appDir = path.resolve(__dirname, "./src/app");
const pagesDir = path.resolve(__dirname, "./src/pages");
const srcDir = path.resolve(__dirname, "./src")

const folders = ["fonts", "assets"];
const copyFolders = (folders) => {
  return folders.map((folder) => {
    const fromPath = path.resolve(publicDir, `./${folder}`);
    const toPath = path.resolve(buildDir, `./${folder}`);
    if (!fs.existsSync(fromPath)) {
      console.debug(`Source folder: ${fromPath} does not exist`);
    }
    return {
      from: fromPath,
      to: toPath,
      noErrorOnMissing: true,
    };
  });
};

/**
 *
 */
export default async (env, { mode }) => {
  const isDev = mode === "development";
  return {
    mode,
    entry: path.join(srcDir, "index.tsx"),
    output: {
      path: buildDir,
      filename: "js/[name].js",
      clean: true,
    },
    devServer: {
      static: {
        directory: publicDir,
      },
      port: 8888,
      open: true,
      historyApiFallback: true,
      hot: true,
      watchFiles: [
        "src/**/*.js",
        "src/**/*.ts",
        "src/**/*.tsx",
        "src/**/*.scss",
        "src/**/*.html",
        "src/**/*.json",
      ],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-typescript", "@babel/preset-react"],
            },
          },
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(scss|css)$/,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 2,
                sourceMap: isDev,
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: isDev,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: path.join(publicDir, "index.html"), // Убедитесь, что шаблон существует
      }),
      new MiniCssExtractPlugin({
        filename: "styles/[name][hash].css",
        ignoreOrder: true,
      }),
      new webpack.DefinePlugin({
        "process.env.API_URL": JSON.stringify(env.API_URL),
      }),
      new CopyPlugin({
        patterns: copyFolders(folders),
      }),
    ],
    resolve: {
      extensions: [".js", ".ts", ".tsx", ".scss", ".css"],
    },
    devtool: isDev ? "source-map" : false,
  };
};

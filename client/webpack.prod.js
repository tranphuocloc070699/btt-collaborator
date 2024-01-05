const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack")
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")
const deps = require("./package.json").dependencies
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

const packageJsonDependencies = require("./package.json").dependencies;

const TerserPlugin = require("terser-webpack-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = {
  entry: path.join(__dirname, "./src/index.js"),
  mode: 'production',
  output: {
    path: path.join(__dirname, "/build"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Sẽ sử dụng babel-loader cho những file .js
        exclude: /node_modules/, // Loại trừ thư mục node_modules
        use: ["babel-loader"],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[hash]-[name].[ext]",
            },
          },
        ],
      },

    ],
    
  },

  // Chứa các plugins sẽ cài đặt trong tương lai
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new NodePolyfillPlugin(),

    new Dotenv(),

    new ModuleFederationPlugin({
      
      name: "RemoteCollaborator",
      filename: "moduleEntryCollaborator.js",
      exposes: {
        "./collaborator": "./src/App.js",
        "./collaboratorSidebar": "./src/components/Sidebar/index.js",
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
        "react-redux": {
          singleton: false,
          requiredVersion: deps["react-redux"], // eslint-disable-line @typescript-eslint/no-unsafe-assignment
        },
      }
      // shared: sharedDependencyConfig
    }),

    new MiniCssExtractPlugin({
        filename: `party.css`,
    }),
  
  ],
  
  optimization: {
    splitChunks: false,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },

  devServer: {
    port: 8080,
    https: false,
    historyApiFallback: true,
    allowedHosts: "all",
    proxy: {
      "/api": {
        target: "http://localhost:5006",
        secure: false,
        changeOrigin: true,
      },
    },
  },
};

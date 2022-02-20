const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;

module.exports = {
  mode: "development",
  devServer: {
    port: 3003,
  },
  module: {
    rules: [
      {
        /* The following line to ask babel 
             to compile any file with extension
             .js */
        test: /\.(js|jsx)$/,

        /* exclude node_modules directory from babel. 
            Babel will not compile any files in this directory*/
        exclude: /node_modules/,

        // To Use babel Loader
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env" /* to transfer any advansed ES to ES5 */,
            "@babel/preset-react",
          ], // to compile react to ES5
        },
      },
      {
        test: /\.svg$/,
        oneOf: [
          {
            issuer: /\.[jt]sx?$/,
            resourceQuery: /react/, // *.svg?react
            use: ["@svgr/webpack"],
          },
          {
            type: "asset",
            parser: {
              dataUrlCondition: {
                maxSize: 200,
              },
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "PRODUCT2",
      filename: "remoteEntry.js",
      remotes: {
        SHELL: "SHELL@http://localhost:3001/remoteEntry.js",
      },
      exposes: {
        "./App": "./src/App",
      },
      shared: [
        {
          ...deps,
          react: { requiredVersion: deps.react, singleton: true },
          "react-dom": {
            requiredVersion: deps["react-dom"],
            singleton: true,
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

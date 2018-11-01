const path = require("path");

module.exports = (storybookBaseConfig, configType) => {
    storybookBaseConfig.resolve = {
        modules: ["node_modules"],
        extensions: [".web.js", ".js", ".json", ".web.jsx", ".jsx", "react.js"],
        alias: {
            "react-native": "react-native-web"
        }
    };

    // storybookBaseConfig.module.rules[0] = {
    //   test: /\.jsx?$/,
    //   use: {
    //     loader: 'babel-loader',
    //     options: {
    //       presets: ['@babel/preset-react', '@babel/preset-env'],
    //       plugins: ['@babel/plugin-proposal-class-properties']
    //     }
    //   }
    // }

    storybookBaseConfig.module.rules.push({
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"],
        include: path.resolve(__dirname, "../")
    });
    storybookBaseConfig.module.rules.push({
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"],
        include: path.resolve(__dirname, "../")
    });
    storybookBaseConfig.module.rules.push({
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]',
        },
    });


    return storybookBaseConfig;
};

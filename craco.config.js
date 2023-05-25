const CracoLessPlugin = require("craco-less");
// const AntdMomentWebpackPlugin = require("@ant-design/moment-webpack-plugin");

module.exports = {
  // webpack: {
  //   configure: {
  //     plugins: [new AntdMomentWebpackPlugin()],
  //   },
  // },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};

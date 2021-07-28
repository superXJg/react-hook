const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': 'rgb(73,81,204)', '@font-size-base': '16px' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
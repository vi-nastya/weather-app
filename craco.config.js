const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@color-white": "#ffffff",
              "@color-primary": "#333338",
              "@color-primary-hover": "#5fb0e8",
              "@color-secondary": "#edf6fa",
              "@font-primary": "'Open Sans', sans-serif",
              "screen-md": "1023.99px",
              "screen-sm": "768px",
            },
            javascriptEnabled: true,
          },
        },
        modifyLessRule: function (lessRule, context) {
          lessRule.test = /\.module\.(less)$/;
          lessRule.exclude = undefined;
          return lessRule;
        },
        cssLoaderOptions: {
          modules: {
            localIdentName: "[local]_[hash:base64:5]",
            auto: true,
            exportLocalsConvention: "camelCaseOnly",
          },
        },
      },
    },
  ],
};

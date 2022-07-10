module.exports = {
  plugins: [
    {
      plugin: require("craco-less"),
      options: {
        noIeCompat: true,
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@color-white": "#ffffff",
              "@color-primary": "#333338",
              "@color-primary-hover": "#5fb0e8",
              "@color-secondary": "#edf6fa",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};

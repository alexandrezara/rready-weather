module.exports = {
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
        @use "sass:math"
        @import "@/styles/main.sass"
        @import "@/styles/mixin.sass"
        `,
      },
    },
  },
};

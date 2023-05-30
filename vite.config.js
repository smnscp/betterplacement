import { resolve } from "path";
import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
  plugins: [
    handlebars({
      context: {
        isDev: process.env.NODE_ENV == "development",
        color: {
          steps: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
          palettes: ["grey", "primary", "secondary", "tertiary"],
        },
      },
      partialDirectory: resolve(__dirname, "partials"),
    }),
  ],
  build: {
    assetsInlineLimit: 1024,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        color: resolve(__dirname, "color.html"),
        notFound: resolve(__dirname, "404.html"),
        mainSheet: resolve(__dirname, "css/index.scss"),
        fontsSheet: resolve(__dirname, "css/fonts.scss"),
        schemeDark: resolve(__dirname, "css/dark.scheme.scss"),
        schemeLight: resolve(__dirname, "css/light.scheme.scss"),
      },
      output: {
        assetFileNames: (assetInfo) =>
          (assetInfo.name.endsWith("css") ? "css" : "assets") +
          "/" +
          assetInfo.name,
      },
    },
  },
});

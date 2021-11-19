import rollupPluginSass from 'rollup-plugin-sass';
import rollupPluginServe from 'rollup-plugin-serve';
import rollupPluginLiveReload from 'rollup-plugin-livereload';

const path = require("path");

const srcPath = path.join(__dirname, "src");
const distPath = path.join(__dirname, "public");

module.exports = {
  input: path.join(srcPath, "scripts", "index.js"),
  output: {
    file: path.join(distPath, "scripts", "main.js"),
    format: "iife",
    name: "DTL",
    sourcemap: true
  },
  plugins: [
    rollupPluginSass({
      output: path.join(distPath, "styles", "main.css")
    }),
    rollupPluginServe({
      open: true,
      contentBase: distPath,
      host: "localhost",
      port: 5000
    }),
    rollupPluginLiveReload({
      watch: distPath
    })
  ]
};

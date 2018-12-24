const path = require("path");
const babel = require("rollup-plugin-babel");
const uglify = require("rollup-plugin-uglify").uglify;
const version = require('../package.json').version;

const banner = 
  "/**\n" +
  ` * Mcx Dialog Mobile v${version}\n` +
  ` * Copyright (C) ${new Date().getFullYear()} mcx\n` +
  " * https://github.com/code-mcx/mcx-dialog-mobile\n" +
  " */";

const filename = "mcx-dialog";

const input = path.resolve(__dirname, "../src/index.js");

const inputConfig = {
  input,
  plugins: [
    babel()
  ],
  external: [
    path.resolve(__dirname, "../src/css/dialog-mobile.css")
  ]
}
const miniInputConfig = Object.assign(
  {}, inputConfig, { plugins: [ babel(), uglify() ] });

const moduleConfig = {
  cjs: {
    input: inputConfig,
    output: {
      file: path.resolve(__dirname, `../dist/${filename}.common.js`),
      format: "cjs",
      banner,
      strict: false
    }
  },
  es: {
    input: inputConfig,
    output: {
      file: path.resolve(__dirname, `../dist/${filename}.esm.js`),
      format: "es",
      banner,
      strict: false
    }
  },
  umd: {
    input: inputConfig,
    output: {
      file: path.resolve(__dirname, `../dist/${filename}.js`),
      format: "umd",
      name: "mcxDialog",
      banner
    }
  },
  miniUmd: {
    input: miniInputConfig,
    output: {
      file: path.resolve(__dirname, `../dist/${filename}.min.js`),
      format: "umd",
      name: "mcxDialog",
      banner
    }
  }
}

module.exports = moduleConfig;

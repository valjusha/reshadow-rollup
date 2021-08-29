import { DEFAULT_EXTENSIONS } from "@babel/core";
import babel from "rollup-plugin-babel";
import postcss from 'rollup-plugin-postcss';
import resolve from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
// import typescript from "rollup-plugin-typescript2";
import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import svgr from '@svgr/rollup';
import url from 'rollup-plugin-url';

const pkg = require("./package.json");

export default {
  input: "./src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
    },
    {
      file: pkg.module,
      format: "es",
      exports: "named",
    },
  ],
  plugins: [
    external(),
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    commonjs({
      include: /node_modules/,
      namedExports: {
        reshadow: ['use'],
      },
    }),
    // typescript({
    //   rollupCommonJSResolveHack: false,
    //   clean: true,
    // }),
    resolve({
      mainFields: ['module', 'main', 'jsnext:main', 'browser'],
      extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
    }),
    babel({
      extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
      runtimeHelpers: true,
      presets: ['@babel/preset-typescript', '@babel/preset-env', '@babel/react'],
      plugins: [
        // 'babel-plugin-transform-typescript-metadata',
        // ['@babel/plugin-proposal-decorators', { legacy: true }],
        // 'babel-plugin-parameter-decorator',
        // [
        //   '@babel/plugin-transform-async-to-generator',
        //   {
        //     module: 'mobx',
        //     method: 'flow',
        //   },
        // ],
      ],
    }),
    postcss({
      modules: true,
      extract: true,
      minimize: true,
      sourceMap: false,
    }),
    url(),
    svgr(),
  ],
  external: ["react", "react-dom", "reshadow"],
};

import { DEFAULT_EXTENSIONS } from "@babel/core";
import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";

const pkg = require("./package.json");

export default {
  input: "./src/index.tsx",
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
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    resolve({ browser: true, mainFields: ["module"] }),
    typescript(),
    babel({
      extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"],
      exclude: "node_modules/**",
      plugins: ["reshadow/babel"],
      presets: ["@babel/preset-react"],
    }),
    commonjs(),
    external(),
  ],
  external: ["react", "react-dom", "reshadow"],
};

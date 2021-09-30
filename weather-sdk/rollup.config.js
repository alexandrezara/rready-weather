import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

const distFolder = "dist";
const inputName = "Main";
const outputName = "weather-sdk";

export default [
  {
    input: `src/${inputName}.ts`,
    external: ["axios", "vue"],
    output: {
      file: `${distFolder}/${outputName}.js`,
      format: "esm",
      exports: "named",
    },
    plugins: [
      commonjs(),
      resolve(),
      typescript({ tsconfig: "./tsconfig.json" }),
    ],
  },
  {
    input: `${distFolder}/dts/src/${inputName}.d.ts`,
    output: [{ file: `${distFolder}/${outputName}.d.ts`, format: "es" }],
    plugins: [dts()],
  },
];

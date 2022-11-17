import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  dts: true,
  entry: {
    "rollup-plugin-svg": "src/index.ts",
  },
  format: ["cjs", "esm"],
  outExtension({ format }) {
    return {
      js: `.${format}.js`,
    };
  },
});

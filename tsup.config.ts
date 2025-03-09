import {defineConfig, type Options} from "tsup";

export default defineConfig((options: Options) => ({
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    dts: true,
    clean: true,
    minify: false,
    outDir: "dist",
    watch: options.watch ?? false,
    external: [
        "@pandacss/dev",
        "@pandacss/types",
        "utopia-core"
    ],
    ...options,
}));

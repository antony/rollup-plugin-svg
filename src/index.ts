import { extname } from "path";
import { Plugin } from "rollup";
import { createFilter, type FilterPattern } from "@rollup/pluginutils";

function toDataUrl(code: string) {
  const mime = "image/svg+xml";
  const buffer = Buffer.from(code, "utf-8");
  const encoded = buffer.toString("base64");
  return `'data:${mime};base64,${encoded}'`;
}

interface RollupSvgOptions {
  include?: FilterPattern;
  exclude?: FilterPattern;
  base64?: boolean;
}

export default function svg(options: RollupSvgOptions = {}): Plugin {
  const filter = createFilter(options.include, options.exclude);

  return {
    name: "svg",
    transform(code: string, id: string) {
      if (!filter(id) || extname(id) !== ".svg") {
        return null;
      }

      const content = code.trim();
      const encoded = options.base64
        ? toDataUrl(content)
        : JSON.stringify(content);

      return { code: `export default ${encoded}`, map: { mappings: "" } };
    },
  };
}

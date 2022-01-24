export { default as frontMatter } from "https://esm.sh/front-matter@4.0.2";
export { slugify } from "https://deno.land/x/slugify/mod.ts";
export { default as marked } from "https://esm.sh/marked@3.0.7";
// export { default as Prism } from "https://esm.sh/prismjs@1.25.0";
// export { default as sanitizeHtml } from "https://esm.sh/sanitize-html@2.6.1";
// export { highlightText as hl } from "https://deno.land/x/speed_highlight_js@1.1.6/dist/index.js";

export {
  configure as etaConfigure,
  renderFile as etaRenderFile,
} from "https://deno.land/x/eta@v1.12.3/mod.ts";

export * as fs from "https://deno.land/std@0.121.0/fs/mod.ts";
export { format as dateFormat } from "https://deno.land/std@0.122.0/datetime/mod.ts";

export * as yaml from "https://deno.land/std/encoding/yaml.ts";
export * as path from "https://deno.land/std/path/mod.ts";

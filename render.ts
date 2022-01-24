import { marked } from "./deps.ts";
import { Heading } from "./main.ts";
import { isRelative, parseURL } from "https://unpkg.com/ufo/dist/index.mjs";

export function render(text: string): [string, Array<string>, Array<Heading>] {
  const links: Array<string> = [];
  const headings: Array<Heading> = [];

  const isExternalLink = (href: string): boolean => {
    const { protocol } = parseURL(href);
    return protocol !== undefined;
  };

  const renderer: Partial<marked.Renderer> = {
    heading(
      text: string,
      level: 1 | 2 | 3 | 4 | 5 | 6,
      raw: string,
      slugger: marked.Slugger,
    ): string {
      const slug = slugger.slug(raw);
      headings.push({ text, level, slug });
      return `<h${level} id="${slug}">${text}<a href="#${slug}"></a></h${level}>`;
    },

    link(href: string, title: string, text: string) {
      if (isExternalLink(href)) {
        return `<a href="${href}" rel="external noopener noreferrer" ${
          title ? "title=${title}" : ""
        }">${text}</a>`;
      } else if (href.endsWith(".md")) {
        links.push(href);
        const localHref = "/" + href.replace(/\.md$/i, "");
        return `<a href="${localHref}" ${
          title ? "title=${title}" : ""
        }">${text}</a>`;
      }
      return `<a href="${href}" ${title ? "title=${title}" : ""}">${text}</a>`;
    },
    // code(code: string, language: string) {
    //   language = language.split(",")[0];
    //   // const html = hljs.highlight(code, { language });
    //   return `<div class="language-${language}"><pre>${code}</pre></div>`;
    // },
  };

  marked.use({
    renderer,
    // highlight: function (code, lang) {
    //   // const language = hljs.getLanguage(lang) ? lang : "plaintext";
    //   return hl(code, { lang });
    // },
    baseUrl: "/",
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false,
  });

  return [marked.parse(text), links, headings];
}

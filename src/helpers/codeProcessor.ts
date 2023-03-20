import hljs from "highlight.js";

export const codeProcessor = (text: string, language?: string) => () => {
  const firstLine = text.split("\n").filter((x) => x)[0],
    indent = firstLine?.match(/ +/)?.[0].length || 0;

  const _lines = (language ? hljs.highlight(text, { language }).value : text)
    .split("\n")
    .map((x) => x.replace(new RegExp(`( ){${indent - 1}}`), ""));

  return _lines.filter((x, i) => (i && i !== _lines.length - 1) || x);
};

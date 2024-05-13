import styles from "./markdown.module.css";

export const parseMarkdown = (markdown: string) => {
  const lines = markdown.split("\n").map((line) => {
    return line
      .replaceAll("<page-container>", `<div class="${styles.pageContainer}">`)
      .replaceAll("</page-container>", "</div>")
      .replaceAll("<page>", `<div class="${styles.page}"><div>`)
      .replaceAll(
        "</page>",
        `</div><div class="${styles.pageIndicator}"></div></div>`
      );
  });

  return lines.join("\n");
};

"use client";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import styles from "./markdown.module.css";

import { useMemo } from "react";
import { parseMarkdown } from "./markdown.helpers";

interface MarkdownProps {
  markdown: string;
}

export const Markdown: React.FC<MarkdownProps> = ({ markdown }) => {
  const parsedMarkdown = useMemo(() => parseMarkdown(markdown), [markdown]);

  return (
    <ReactMarkdown className={styles.markdown} rehypePlugins={[rehypeRaw]}>
      {parsedMarkdown}
    </ReactMarkdown>
  );
};

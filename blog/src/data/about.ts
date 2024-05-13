import path from "path";
import fs from "fs";

export interface About {
  content: string;
}

export function getAbout(): About {
  const aboutPath = path.join(process.cwd(), "nano-blog-content/about.md");

  return {
    content: fs.readFileSync(aboutPath, "utf-8"),
  };
}

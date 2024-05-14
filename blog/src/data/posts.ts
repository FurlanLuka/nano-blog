import path from "path";
import fs from "fs";
import dayjs from "dayjs";

export interface Post {
  title: string;
  slug: string;
  date: string;
  content: string;
}

export function getPosts(): Post[] {
  const blogpostsDirectory = path.join(process.cwd(), "ceontent/posts");

  return fs.readdirSync(blogpostsDirectory).map((filename) => {
    const fileNameParts = filename.split("_");

    if (fileNameParts.length < 2) {
      throw new Error("Invalid post filename: " + filename);
    }

    const date = dayjs.unix(Number(fileNameParts[0]));

    fileNameParts.shift();

    return {
      title: fileNameParts.join(" ").replace(".md", ""),
      slug: fileNameParts.join("-").toLowerCase().replace(".md", ""),
      date: date.format("dddd, D MMMM YYYY HH:mm"),
      content: fs.readFileSync(
        path.join(blogpostsDirectory, filename),
        "utf-8"
      ),
    };
  });
}

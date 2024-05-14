import z from "zod";
import path from "path";
import fs from "fs";

const configSchema = z.object({
  emailAddress: z.string().optional(),
  projects: z
    .array(
      z.object({
        title: z.string(),
        uri: z.string(),
      })
    )
    .optional(),
});

export type Config = z.infer<typeof configSchema>;

export function getConfig(): Config {
  const aboutPath = path.join(process.cwd(), "nano-blog.config.json");
  const config = JSON.parse(fs.readFileSync(aboutPath, "utf-8"));

  if (!configSchema.safeParse(config).success) {
    throw new Error("Invalid nano-blog.config.json");
  }

  return config;
}

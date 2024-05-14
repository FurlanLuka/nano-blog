import fs from "fs";
import z from "zod";
import chalk from "chalk";
import figlet from "figlet";
import inquirer from "inquirer";
import { Command } from "commander";

const program = new Command();

console.log(figlet.textSync("Nano Blog"));

program.version("1.0.0").description("CLI for managing Nano Blog");

program
  .command("add")
  .description("Add new resource")
  .action(() => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "resource",
          message: "Which resource would you like to add?",
          choices: ["post", "project", "email"],
        },
      ])
      .then((answers) => {
        if (answers.resource === "post") {
          inquirer
            .prompt([
              {
                type: "input",
                name: "name",
                message: "What would you like the post name to be?",
              },
            ])
            .then(({ name }: { name: string }) => {
              const time = Math.floor(Date.now() / 1000);
              const fileName = `${time}_${name.replace(" ", "_")}.md`;

              if (!fs.existsSync(`./ceontent`)) {
                fs.mkdirSync(`./ceontent`);
              }

              fs.writeFileSync(`./ceontent/${fileName}`, `# ${name}`, "utf-8");

              console.log(
                `${chalk.yellow("+ ")}Post file generated at ${chalk.yellow(
                  `ceontent/${fileName}`
                )}`
              );
            });
        } else if (answers.resource === "project") {
          inquirer
            .prompt([
              {
                type: "input",
                name: "name",
                message: "What is the project name?",
              },
              {
                type: "input",
                name: "uri",
                message: "What is the project uri?",
              },
            ])
            .then(({ name, uri }: { name: string; uri: string }) => {
              const config = getConfig();

              config.projects = [
                ...(config.projects ?? []),
                {
                  title: name,
                  uri,
                },
              ];

              console.log(
                `${chalk.yellow("+ ")}Project added: ${chalk.yellow(name)}`
              );

              updateConfig(config);
            });
        } else if (answers.resource === "email") {
          inquirer
            .prompt([
              {
                type: "input",
                name: "email",
                message: "What is your contact email?",
              },
            ])
            .then(({ email }: { email: string }) => {
              const config = getConfig();

              config.emailAddress = email;

              console.log(
                `${chalk.yellow("+ ")}Email address added: ${chalk.yellow(
                  email
                )}`
              );

              updateConfig(config);
            });
        }
      });
  });

program
  .command("delete")
  .description("Delete a resource")
  .action(() => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "resource",
          message: "Which resource would you like to add?",
          choices: ["post", "project"],
        },
      ])
      .then((answers) => {
        if (answers.resource === "post") {
          if (!fs.existsSync(`./ceontent`)) {
            fs.mkdirSync(`./ceontent`);
          }

          const posts = fs.readdirSync(`./ceontent`);

          if (!posts.length) {
            console.log(`${chalk.red("- ")}No posts found`);
            return;
          }

          inquirer
            .prompt([
              {
                type: "list",
                name: "name",
                message: "Which post would you like to delete?",
                choices: posts.map((file) => ({
                  name: file.split("_").slice(1).join(" ").replace(".md", ""),
                  value: file,
                })),
              },
            ])
            .then(({ name }: { name: string }) => {
              fs.rmSync(`./ceontent/${name}`);

              console.log(
                `${chalk.yellow("- ")}Post ${chalk.yellow(
                  `ceontent/${name}`
                )} removed`
              );
            });
        } else if (answers.resource === "project") {
          const projects = getConfig().projects;

          if (!projects?.length) {
            console.log(`${chalk.red("- ")}No projects found`);
            return;
          }

          inquirer
            .prompt([
              {
                type: "list",
                name: "index",
                message: "What is the project name?",
                choices: projects.map((project, index) => {
                  return {
                    name: project.title,
                    value: index,
                  };
                }),
              },
            ])
            .then(({ index }: { index: number }) => {
              const config = getConfig();

              const projectName = config.projects![index].title;

              config.projects!.splice(index, 1);

              console.log(
                `${chalk.red("- ")}Project ${chalk.yellow(projectName)} removed`
              );

              updateConfig(config);
            });
        }
      });
  });

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

type Config = z.infer<typeof configSchema>;

const getConfig = (): Config => {
  if (!fs.existsSync(`./nano-blog.config.json`)) {
    fs.writeFileSync(`./nano-blog.config.json`, "{}", "utf-8");
  }

  const config = JSON.parse(
    fs.readFileSync(`./nano-blog.config.json`, "utf-8")
  );

  if (!configSchema.safeParse(config).success) {
    throw new Error("Invalid nano-blog.config.json");
  }

  return config;
};

const updateConfig = (config: Config) => {
  fs.writeFileSync(
    `./nano-blog.config.json`,
    JSON.stringify(config, null, 2),
    "utf-8"
  );
};

program.parse(process.argv);

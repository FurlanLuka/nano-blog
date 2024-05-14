import { GetStaticProps } from "next";
import { Markdown } from "frln/components/markdown/markdown";
import { Content } from "frln/components/content/content";
import { Footer } from "frln/components/footer/footer";
import { Header } from "frln/components/header/header";
import { Config, getConfig } from "frln/data/config";
import { About, getAbout } from "frln/data/about";
import { Post, getPosts } from "frln/data/posts";

import styles from "./index.module.css";

export const getStaticProps = (async () => {
  const posts = getPosts();
  const about = getAbout();
  const config = getConfig();

  return {
    props: {
      posts,
      config,
      about,
    },
  };
}) satisfies GetStaticProps;

export const Index: React.FC<{
  posts: Post[];
  config: Config;
  about: About;
}> = ({ posts, config, about }) => {
  return (
    <>
      <Header />
      <Content>
        <h1>About me</h1>
        <Markdown markdown={about.content} />
        <h1>Blog posts</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.slug} className={styles.listItem}>
              {post.date} -<a href={`/blog/${post.slug}`}>{post.title}</a>
            </li>
          ))}
        </ul>
        <h1>Projects</h1>
        <ul>
          {config.projects?.map((project) => (
            <li key={project.title} className={styles.listItem}>
              <a href={`https://${project.uri}`} target="_blank">
                {project.title}
              </a>
            </li>
          ))}
        </ul>
      </Content>
      <Footer
        actionButtons={[
          {
            shortcut: "C",
            text: "Contact me",
            onAction: () => window.open(`mailto:${config.emailAddress}`),
          },
        ]}
      />
    </>
  );
};

export default Index;

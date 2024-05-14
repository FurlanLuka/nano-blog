import type { GetStaticPaths, GetStaticProps } from "next";
import { Post as IPost, getPosts } from "frln/data/posts";
import { Header } from "frln/components/header/header";
import { Content } from "frln/components/content/content";
import { Footer } from "frln/components/footer/footer";
import { Markdown } from "frln/components/markdown/markdown";

export const getStaticPaths = (async () => {
  const posts = getPosts();

  const paths = posts.map((post) => ({
    params: { id: [post.slug, "index"] },
  }));

  return {
    paths,
    fallback: false,
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  const { id } = context.params! as { id: string[] };

  const posts = getPosts();

  const post = posts.find((post) => post.slug === id[0]);

  return {
    props: {
      post,
    },
  };
}) satisfies GetStaticProps;

export const Blog: React.FC<{ post: IPost }> = ({ post }) => {
  return (
    <>
      <Header date={post.date} />
      <Content>
        <Markdown markdown={post.content} />
      </Content>
      <Footer
        actionButtons={[
          {
            shortcut: "C",
            text: "Contact me",
            onAction: () => (window.location.href = `mailto:`),
          },
        ]}
      />
    </>
  );
};

export default Blog;

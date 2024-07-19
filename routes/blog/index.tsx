import { Handlers, PageProps } from "$fresh/server.ts";
import { getPosts, Post } from "utils/posts.ts";
import PostList from "islands/PostsList.tsx";
import { PageHead } from "components/mod.ts";

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await getPosts("routes/blog/posts");
    return ctx.render(posts);
  },
};

export default function Home(props: PageProps<Post[]>) {
  return (
    <div>
      <PageHead
        title="Student blog"
        text="This page contains various articles, particularly those written by students who have finished their Erasmus experience. If you would like to contribute by writing any kind of article, please contact us and we will tell you how to add your post."
      />
      <PostList posts={props.data} baseUrl={props.url.pathname} />
    </div>
  );
}

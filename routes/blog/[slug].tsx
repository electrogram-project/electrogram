import { Handlers, PageProps } from "$fresh/server.ts";
import { getPost, Post } from "utils/posts.ts";
import { Button } from "components/Button.tsx";
import { CSS, render } from "$gfm";

export const handler: Handlers<Post> = {
  async GET(_req, ctx) {
    try {
      const post = await getPost(
        ctx.params.slug,
        "routes/blog/posts",
      );
      return ctx.render(post as Post);
    } catch {
      return ctx.renderNotFound();
    }
  },
};

export default function PostPage(props: PageProps<Post>) {
  const post = props.data;
  return (
    <>
      <head>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </head>
      <article>
        <h2 className="text-left text-4xl mt-6 mb-3 font-bold">
          {post.title}
        </h2>
        <time>
          {new Date(post.publishedAt).toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <div
          className="mt-8 markdown-body overflow-hidden rounded-md m-2 p-6"
          dangerouslySetInnerHTML={{ __html: render(post.content) }}
        />
      </article>
      <a href="/blog">
        <Button text="Go back" />
      </a>
    </>
  );
}

import { Handlers, PageProps } from "$fresh/server.ts";
import { getPost, Post } from "$utils/posts.ts";
import { CSS, render } from "$gfm";

export const handler: Handlers<Post> = {
  async GET(_req, ctx) {
    try {
      const post = await getPost(
        ctx.params.slug,
        "routes/erasmus/posts",
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
      <a
        href="/erasmus"
        className="hover:underline underline-offset-2"
      >
        {"←"} Go back
      </a>
      <head>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </head>
      <article className="">
        <h2 className="text-left text-2xl mt-6 mb-3 font-extrabold font-mono">
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
          className="mt-8 markdown-body bg-white overflow-hidden rounded-md m-2 p-4"
          dangerouslySetInnerHTML={{ __html: render(post.content) }}
        />
      </article>
    </>
  );
}

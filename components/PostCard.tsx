import { Post } from "utils/posts.ts";

type Props = {
  post: Post;
  baseUrl: string;
};

export function PostCard({ post, baseUrl }: Props) {
  return (
    <article className="flex flex-col justify-between h-full rounded-md shadow-md bg-slate-200 dark:bg-slate-800">
      <div className="p-4 sm:p-6">
        <time datetime={`post.publishedAt`}>
          {new Date(post.publishedAt).toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>

        <a
          href={`${baseUrl}/${post.slug}`}
          className="hover:text-pink-600 dark:hover:text-pink-300"
        >
          <h3 className="mt-0.5 text-lg font-bold">
            {post.title}
          </h3>
        </a>

        <div className="mt-2 flex flex-wrap gap-1">
          {post.tags.map((tag) => (
            <span
              key={tag}
              style={{ paddingTop: "0.1em", paddingBottom: "0.1rem" }}
              className="flex-none text-xs px-2 rounded-full m-1 bg-pink-200 text-pink-800"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

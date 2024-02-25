import { Post } from "$utils/posts.ts";

type Props = {
  post: Post;
  baseUrl: string;
};

export function PostCard({ post, baseUrl }: Props) {
  return (
    <article className="overflow-hidden rounded-md shadow-md shadow-zinc-300 transition m-2">
      <a href={`${baseUrl}/${post.slug}`}>
        <div className="bg-white p-4 sm:p-6">
          <time datetime="2022-10-10" className="block text-xs text-gray-500">
            {new Date(post.publishedAt).toLocaleDateString("en-us", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>

          <h3 className="mt-0.5 text-lg text-gray-900">{post.title}</h3>

          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
            {post.snippet}
          </p>
        </div>
      </a>
    </article>
  );
}

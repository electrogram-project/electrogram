import { useState } from "preact/hooks";
import { PostCard, Search } from "components/mod.ts";
import { Post } from "utils/posts.ts";

type Props = {
  posts: Post[];
  baseUrl: string;
};

export default function PostList({ posts, baseUrl }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Search
        text="Search for a post..."
        value={searchTerm}
        onInput={(e) => setSearchTerm((e.target as HTMLInputElement).value)}
      />
      <div className="max-h-[80vh] overflow-y-auto bg-slate-100 rounded-lg p-4 dark:bg-slate-700 mb-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2">
          {filteredData.length > 0
            ? (
              filteredData.map((post) => (
                <div>
                  <PostCard post={post} baseUrl={baseUrl} />
                </div>
              ))
            )
            : (
              <article className="flex flex-col justify-between h-full rounded-md shadow-md bg-slate-200 dark:bg-slate-800">
                <div className="p-4 sm:p-6">
                  <time>
                    {new Date().toLocaleDateString("en-us", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>

                  <h3 className="mt-0.5 text-lg font-bold">
                    No posts found
                  </h3>

                  <div className="mt-2 flex flex-wrap gap-1">
                    <span
                      style={{ paddingTop: "0.1em", paddingBottom: "0.1rem" }}
                      className="flex-none text-xs px-2 rounded-full m-1 bg-pink-200 text-pink-800"
                    >
                      #404
                    </span>
                  </div>
                </div>
              </article>
            )}
        </div>
      </div>
    </div>
  );
}

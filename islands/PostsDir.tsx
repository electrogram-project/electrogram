import { useState } from "preact/hooks";
import { PostCard, SearchBox } from "components/mod.ts";
import { Post } from "$utils/posts.ts";

type Props = {
  posts: Post[];
  baseUrl: string;
};

export default function PostsDir({ posts, baseUrl }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <SearchBox
        text="Search for a post..."
        value={searchTerm}
        onInput={(e) => setSearchTerm((e.target as HTMLInputElement).value)}
      />
      <div className="max-h-screen overflow-y-auto">
        {posts.filter((post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase())
        ).map((post) => (
          <div className="overflow-hidden">
            <PostCard post={post} baseUrl={baseUrl} />
          </div>
        ))}
      </div>
    </div>
  );
}

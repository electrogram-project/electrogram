import { extract } from "$std/front-matter/yaml";
import { join } from "$std/path/posix";

export type Post = {
  slug: string;
  title: string;
  publishedAt: Date;
  tags: string[];
  content: string;
};

// Retrieves all posts from the given directory
export async function getPosts(directory: string): Promise<Post[]> {
  const files = Deno.readDir(directory);
  const promises = [];
  for await (const file of files) {
    const slug = file.name.replace(".md", "");
    promises.push(getPost(slug, directory));
  }
  const posts = (await Promise.all(promises)) as Post[];
  posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  return posts;
}

// Retrieves a single post from the given directory
export async function getPost(
  slug: string,
  directory: string,
): Promise<Post | null> {
  const text = await Deno.readTextFile(join(directory, `${slug}.md`));
  const { attrs, body } = extract(text) as {
    attrs: { title: string; publishedAt: string; tags: string[] };
    body: string;
  };
  return {
    slug,
    title: attrs.title as string,
    publishedAt: new Date(attrs.publishedAt as string),
    content: body,
    tags: attrs.tags as string[],
  };
}

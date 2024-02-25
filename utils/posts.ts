import { extract } from "$std/front_matter/yaml.ts";
import { join } from "$std/path/posix/mod.ts";

export type Post = {
  slug: string;
  title: string;
  publishedAt: Date;
  snippet: string;
  content: string;
};

/**
 * Retrieves all posts from the specified directory.
 *
 * @param {string} directory - The directory where the posts are located.
 * @returns {Promise<Post[]>} - A promise that resolves to an array of posts.
 */
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

/**
 * Retrieves a post with the specified slug from the given directory.
 * Returns null if the post is not found.
 *
 * @param {string} slug - The slug of the post.
 * @param {string} directory - The directory where the post is located.
 * @returns {Promise<Post | null>} - A promise that resolves to the post object or null if not found.
 */
export async function getPost(
  slug: string,
  directory: string,
): Promise<Post | null> {
  const text = await Deno.readTextFile(join(directory, `${slug}.md`));
  const { attrs, body } = extract(text);
  return {
    slug,
    title: attrs.title as string,
    publishedAt: new Date(attrs.published_at as string),
    content: body,
    snippet: attrs.snippet as string,
  };
}

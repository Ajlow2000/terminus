import { execSync } from "node:child_process";
import { statSync } from "node:fs";
import { basename, join } from "node:path";

const LOWERCASE_WORDS = new Set([
  "a", 
  "an", 
  "the",
  "and", 
  "but", 
  "or", 
  "for", 
  "nor", 
  "so", 
  "yet",
  "at", 
  "by", 
  "in", 
  "of", 
  "on", 
  "to", 
  "up", 
  "as",
]);

// Words that should always be fully uppercased regardless of position.
const ACRONYMS = new Set([
  "vpn",
  "api",
  "url",
  "html",
  "css",
  "js",
  "ts",
  "sdk",
  "cli",
  "ui",
  "ux",
  "rts",
]);

export function slugToTitle(slug: string): string {
  const words = slug.split("-").filter(Boolean);
  return words
    .map((word, i) => {
      const lower = word.toLowerCase();
      if (ACRONYMS.has(lower)) return word.toUpperCase();
      const isFirst = i === 0;
      const isLast = i === words.length - 1;
      return isFirst || isLast || !LOWERCASE_WORDS.has(lower)
        ? word[0].toUpperCase() + word.slice(1)
        : word;
    })
    .join(" ");
}

/** Returns the post title: explicit frontmatter wins, otherwise derived from
 *  the filename slug with standard title-case rules applied. */
export function resolveTitle(post: {
  id: string;
  data: { title?: string };
}): string {
  if (post.data.title) return post.data.title;
  const slug = basename(post.id).replace(/\.[^.]+$/, "");
  return slugToTitle(slug);
}

/** Returns the date of the oldest commit in which the file had draft=false
 *  (i.e. the publication date). Uses -S pickaxe so only commits that actually
 *  changed the "draft: false" string are fetched, then confirms via git-show
 *  to handle the edge case where the change was a removal not an addition.
 *  Falls back to mtime if git is unavailable or the post was never published. */
function getPublishDate(postId: string): Date {
  const filePath = join(process.cwd(), "src", "content", "writing", postId);
  // Path relative to the repo root, as required by `git show <hash>:<path>`.
  const repoPath = join("src", "content", "writing", postId);

  try {
    // Oldest-first list of commits that added or removed "draft: false".
    // For most posts this is a single commit — the publish commit.
    const log = execSync(
      `git log --follow --reverse --format="%H %cI" -S "draft: false" -- "${filePath}"`,
      { encoding: "utf-8", stdio: ["pipe", "pipe", "pipe"] }
    ).trim();

    if (!log) throw new Error("no publish commits found");

    for (const line of log.split("\n").filter(Boolean)) {
      const space = line.indexOf(" ");
      const hash = line.slice(0, space);
      const isoDate = line.slice(space + 1);

      // Confirm the snapshot at this commit actually has draft: false
      // (vs. a removal commit where the pickaxe fires in reverse).
      const content = execSync(
        `git show "${hash}:${repoPath}"`,
        { encoding: "utf-8", stdio: ["pipe", "pipe", "pipe"] }
      );

      const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (!fmMatch) continue;

      const draftLine = fmMatch[1].match(/^draft:\s*(.+)$/m);
      const isDraft = draftLine ? draftLine[1].trim().toLowerCase() === "true" : false;

      if (!isDraft) return new Date(isoDate);
    }
  } catch {
    // git unavailable, no commits, or draft was never set to false
  }

  try {
    return statSync(filePath).mtime;
  } catch {
    // truly nothing we can do — happy new year 1970
    return new Date(0);
  }
}

/** Returns the post date: explicit frontmatter wins, otherwise the date of
 *  the first commit in which the post had draft=false (the publication date).
 *  Typo fixes and other edits made after publication do not affect this date.
 *  Falls back to mtime if git is unavailable. */
export function resolveDate(post: {
  id: string;
  data: { date?: Date };
}): Date {
  return post.data.date ?? getPublishDate(post.id);
}

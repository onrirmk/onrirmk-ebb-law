import { existsSync } from "node:fs";
import path from "node:path";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const PHOTO_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp"] as const;

export function getMemberPhotoSrc(slug: string): string | undefined {
  for (const ext of PHOTO_EXTENSIONS) {
    const relative = `/images/team/${slug}${ext}`;
    if (existsSync(path.join(PUBLIC_DIR, relative))) {
      return relative;
    }
  }
  return undefined;
}

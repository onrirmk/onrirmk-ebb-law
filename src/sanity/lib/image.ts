import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

export type SanityImage = {
  _type?: "image";
  asset?: {
    _id?: string;
    metadata?: {
      dimensions?: { width: number; height: number; aspectRatio: number };
    };
  };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
};

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}

export function imageSrc(
  image: SanityImage | null | undefined,
  width?: number,
): string | null {
  if (!image?.asset?._id) return null;
  const b = urlFor(image).auto("format");
  return (width ? b.width(width) : b).url();
}

export function imageDimensions(image: SanityImage | null | undefined) {
  return image?.asset?.metadata?.dimensions ?? null;
}

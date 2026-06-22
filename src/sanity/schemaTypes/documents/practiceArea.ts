import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const practiceArea = defineType({
  name: "practiceArea",
  title: "Practice Area",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      description: "Shown on the grid card.",
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      options: { hotspot: true },
      description:
        "Used in two places. (1) Practice areas grid card: cropped to 4:3 — keep the subject centered. (2) Detail page top band: full-bleed at 360 px tall (480 px on desktop) — title + breadcrumb sit on the BOTTOM-LEFT, so keep that corner uncluttered. Recommended: 2400×1800 px JPG (< 600 KB). Use the focal hotspot to mark what must stay visible.",
    }),
    defineField({
      name: "paragraphs",
      title: "Body paragraphs",
      type: "array",
      of: [{ type: "text", rows: 4 }],
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      description: "Lower numbers appear first. Use 10, 20, 30 to leave room.",
    }),
  ],
  orderings: [
    {
      title: "Manual order",
      name: "manualOrder",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current", media: "heroImage" },
  },
});
